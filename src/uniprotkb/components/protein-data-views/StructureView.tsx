import cn from 'classnames';
import { DownloadIcon, Loader, Message } from 'franklin-sites';
import {
  type ProcessedStructureData,
  type ProtvistaUniprotStructure,
} from 'protvista-uniprot';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import TableFromData, {
  type TableFromDataColumn,
} from '../../../shared/components/table/TableFromData';
import useCustomElement from '../../../shared/hooks/useCustomElement';
import helper from '../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../shared/types/namespaces';
import { type IsoformSequences } from '../../adapters/structureConverter';
import { TabLocation } from '../../types/entry';
import { AFDBOutOfSync } from './AFDBOutOfSync';
import styles from './styles/structure-view.module.scss';

type StructureRow = ProcessedStructureData & { rowKey: string };

const PDB_SOURCE = 'PDB';
const ALPHAFOLD_SOURCE = 'AlphaFold DB';

const parseResolution = (resolution?: string): number | undefined => {
  const match = resolution?.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : undefined;
};

const RESOLUTION_THRESHOLDS = [2.5, 4, 6, 10] as const;

const structureTabs = [
  {
    id: 'pdb',
    title: 'PDB',
    description:
      'Experimentally determined structures from the Protein Data Bank (PDB).',
    belongs: (row: StructureRow) => row.source === PDB_SOURCE,
    hiddenColumns: ['source', 'isoform', 'oligomeric_state'],
  },
  {
    id: 'alphafolddb',
    title: 'AlphaFoldDB',
    description: 'Computationally predicted structures from AlphaFold DB.',
    belongs: (row: StructureRow) => row.source === ALPHAFOLD_SOURCE,
    hiddenColumns: ['source', 'method', 'resolution'],
  },
  {
    id: 'others',
    title: 'Others',
    description: 'Structures and models from other sources.',
    belongs: (row: StructureRow) =>
      row.source !== PDB_SOURCE && row.source !== ALPHAFOLD_SOURCE,
    hiddenColumns: ['isoform', 'method', 'resolution', 'oligomeric_state'],
  },
] as const;

const StructureView = ({
  primaryAccession,
  sequence,
  isoforms,
  checksum,
  viewerOnly = false,
  isUniProtKBAccession = true,
}: {
  primaryAccession?: string;
  checksum?: string;
  sequence?: string;
  isoforms?: IsoformSequences;
  viewerOnly?: boolean;
  isUniProtKBAccession?: boolean;
}) => {
  const structureElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'
      ).then((module) => ({ default: module.ProtvistaUniprotStructure })),
    'protvista-uniprot-structure'
  );

  const [structureEl, setStructureEl] =
    useState<ProtvistaUniprotStructure | null>(null);
  const [structures, setStructures] = useState<StructureRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (structureEl && isoforms?.length) {
      structureEl.isoforms = isoforms;
    }
  }, [structureEl, isoforms]);

  useEffect(() => {
    if (!structureEl) {
      return;
    }
    const apply = (data: ReadonlyArray<ProcessedStructureData>) => {
      setStructures(
        data.map((row, i) => ({ ...row, rowKey: `${row.id}:${i}` }))
      );
      const current = structureEl.selectedId;
      const next =
        current && data.some((r) => r.id === current) ? current : data[0]?.id;
      if (next && next !== current) {
        structureEl.selectedId = next;
      }
      setSelectedId(next);
      setLoading(false);
    };
    // Catch up in case the event fired before this listener was attached.
    if (structureEl.data?.length) {
      apply(structureEl.data);
    }
    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<
        ReadonlyArray<ProcessedStructureData>
      >;
      apply(detail);
    };
    structureEl.addEventListener('structures-loaded', handler);
    return () => structureEl.removeEventListener('structures-loaded', handler);
  }, [structureEl]);

  const handleRowClick = useCallback(
    (row: ProcessedStructureData) => {
      setSelectedId(row.id);
      if (structureEl) {
        structureEl.selectedId = row.id;
      }
    },
    [structureEl]
  );

  // Group the loaded structures into the visible tabs, dropping any tab with no
  // structures to show.
  const visibleTabs = useMemo(
    () =>
      structureTabs
        .map((tab) => ({ ...tab, rows: structures.filter(tab.belongs) }))
        .filter((tab) => tab.rows.length > 0),
    [structures]
  );

  const selectedStructure = structures.find((row) => row.id === selectedId);
  const activeTab =
    visibleTabs.find(
      (tab) => selectedStructure && tab.belongs(selectedStructure)
    ) ?? visibleTabs[0];

  // Switching tabs selects that tab's first structure, which both highlights
  // the row and drives the shared viewer.
  const handleTabClick = useCallback(
    (rows: StructureRow[]) => {
      const [first] = rows;
      if (first) {
        handleRowClick(first);
      }
    },
    [handleRowClick]
  );

  const columns = useMemo((): TableFromDataColumn<ProcessedStructureData>[] => {
    const cols: TableFromDataColumn<ProcessedStructureData>[] = [
      {
        id: 'id',
        label: 'Identifier',
        render: (row) => {
          if (row.source === 'AlphaFold DB') {
            return (
              <ExternalLink url={`https://alphafold.ebi.ac.uk/entry/${row.id}`}>
                {row.id}
              </ExternalLink>
            );
          }
          if (row.sourceDBLink) {
            return <ExternalLink url={row.sourceDBLink}>{row.id}</ExternalLink>;
          }
          return row.id;
        },
      },
      {
        id: 'source',
        label: 'Source',
        render: (row) => <strong>{row.source}</strong>,
        getValue: (row) => row.source,
      },
    ];

    if (isoforms?.length) {
      cols.push({
        id: 'isoform',
        label: 'Isoform',
        render: (row) => {
          if (!row.isoformId) {
            return null;
          }
          return (
            <Link
              to={getEntryPath(
                Namespace.uniprotkb,
                row.isoformId,
                TabLocation.Entry
              )}
            >
              {row.isoformId}
              {row.isoformIsCanonical && ' (Canonical)'}
            </Link>
          );
        },
      });
    }

    cols.push(
      {
        id: 'method',
        label: 'Method',
        render: (row) => row.method ?? null,
        getValue: (row) => row.method,
      },
      {
        id: 'resolution',
        label: 'Resolution',
        render: (row) => row.resolution?.replace(/ A\b/g, ' Å') ?? null,
        filterOptions: RESOLUTION_THRESHOLDS.map((threshold) => ({
          label: `Below ${threshold} Å`,
          predicate: (row) => {
            const resolution = parseResolution(row.resolution);
            return resolution !== undefined && resolution < threshold;
          },
        })),
      },
      {
        id: 'chain',
        label: 'Chain',
        render: (row) => row.chain ?? null,
      },
      {
        id: 'positions',
        label: 'Positions',
        render: (row) => row.positions ?? null,
      },
      {
        id: 'oligomeric_state',
        label: 'Oligomeric State',
        render: (row) => row.oligomericState ?? null,
        getValue: (row) => row.oligomericState,
      },
      {
        id: 'links',
        label: 'Links',
        render: (row) => {
          const downloadLink = row.downloadUrl ? (
            <a href={row.downloadUrl} target="_blank" rel="noopener noreferrer">
              <DownloadIcon width="1em" />
            </a>
          ) : null;
          if (
            row.source === 'PDB' ||
            (row.source === 'AlphaFold DB' && row.isoformIsCanonical === true)
          ) {
            const accession = row.source === 'PDB' ? row.id : primaryAccession;
            const foldseekSource =
              row.source === PDB_SOURCE ? 'PDB' : 'AlphaFoldDB';
            return (
              <span className={helper['no-wrap']}>
                {downloadLink}
                {' · '}
                <ExternalLink
                  url={`https://search.foldseek.com/search?accession=${accession}&source=${foldseekSource}`}
                >
                  Foldseek
                </ExternalLink>
              </span>
            );
          }
          return downloadLink;
        },
      }
    );

    return cols;
  }, [isoforms, primaryAccession]);

  if (!structureElement.defined && !structureElement.errored) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {primaryAccession && isUniProtKBAccession && (
        <>
          <Message level="info">
            View UniProt features on this structure in the{' '}
            <Link
              to={{
                pathname: getEntryPath(
                  Namespace.uniprotkb,
                  primaryAccession,
                  TabLocation.FeatureViewer
                ),
                hash: 'structure',
              }}
            >
              Feature Viewer
            </Link>
            .
          </Message>
          <AFDBOutOfSync modal />
        </>
      )}
      <div className="tabs">
        {!viewerOnly && !loading && structures.length > 0 && activeTab && (
          <>
            <div className="tabs__header" role="tablist">
              {visibleTabs.map((tab) => (
                <div
                  key={tab.id}
                  id={tab.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={tab.id === activeTab.id}
                  className={cn(
                    'tabs__header__item',
                    'tabs__header__item--bordered',
                    {
                      'tabs__header__item--active': tab.id === activeTab.id,
                    }
                  )}
                  onClick={() => handleTabClick(tab.rows)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleTabClick(tab.rows);
                    }
                  }}
                >
                  {tab.title}
                </div>
              ))}
            </div>
            <p>{activeTab.description}</p>
          </>
        )}
        <protvista-uniprot-structure
          ref={setStructureEl}
          accession={primaryAccession}
          checksum={checksum}
          sequence={sequence}
          noTable
        />
        {!viewerOnly && loading && <Loader />}
        {!viewerOnly && !loading && structures.length === 0 && (
          <Message level="info">
            No structure information available
            {primaryAccession ? ` for ${primaryAccession}` : ''}.
          </Message>
        )}
        {!viewerOnly && !loading && structures.length > 0 && activeTab && (
          <TableFromData
            data={activeTab.rows}
            columns={columns.filter(
              (col) =>
                !(activeTab.hiddenColumns as readonly string[]).includes(col.id)
            )}
            getRowId={(row) => row.rowKey}
            onRowClick={handleRowClick}
            markBackground={(row) => row.id === selectedId}
          />
        )}
      </div>
    </div>
  );
};

export default StructureView;
