import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../app/config/urls';
import BasketStatus from '../../basket/BasketStatus';
import EntryTypeIcon, {
  EntryType,
} from '../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../shared/components/entry/TaxonomyView';
import ExternalLink from '../../shared/components/ExternalLink';
import { type ColumnDescriptor } from '../../shared/hooks/useColumns';
import { type ColumnConfiguration } from '../../shared/types/columnConfiguration';
import { Namespace } from '../../shared/types/namespaces';
import * as logging from '../../shared/utils/logging';
import parseDate from '../../shared/utils/parseDate';
import EvidenceLink from '../../uniprotkb/components/protein-data-views/EvidenceLink';
import { TabLocation } from '../../uniprotkb/types/entry';
import {
  databaseToEntryType,
  type UniParcXRef,
  XRefsInternalDatabasesEnum,
} from '../adapters/uniParcConverter';
import Timeline from '../components/entry/Timeline';
import { getSubEntryPath } from '../utils/subEntry';
import { getXrefId } from '../utils/uniparcXref';

export enum UniParcXRefsColumn {
  // Names & taxonomy
  database = 'database',
  accession = 'accession',
  links = 'links',
  gene = 'gene',
  ncbiGi = 'ncbiGi',
  organism = 'organism',
  organismId = 'organism_id',
  protein = 'protein',
  proteome = 'proteome',
  // Miscellaneous
  active = 'active',
  // Date of
  firstSeen = 'first_seen',
  lastSeen = 'last_seen',
  timeline = 'timeline',
  version = 'version',
  versionUniParc = 'version_uniparc',
}

export const defaultColumns = [
  UniParcXRefsColumn.database,
  UniParcXRefsColumn.accession,
  UniParcXRefsColumn.active,
  UniParcXRefsColumn.links,
  UniParcXRefsColumn.organism,
  UniParcXRefsColumn.proteome,
  UniParcXRefsColumn.version,
  UniParcXRefsColumn.firstSeen,
  UniParcXRefsColumn.lastSeen,
];

export const primaryKeyColumns = [
  UniParcXRefsColumn.database,
  UniParcXRefsColumn.accession,
];

const UniParcXRefsColumnConfiguration: ColumnConfiguration<
  UniParcXRefsColumn,
  UniParcXRef
> = new Map();

// COLUMN RENDERERS BELOW
UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.database, {
  label: 'Database',
  render: (xref) => {
    if (!xref.database) {
      return null;
    }
    let cell: ReactNode = xref.database;
    const entryType = databaseToEntryType.get(xref.database);
    if (entryType === EntryType.REVIEWED) {
      cell = (
        <>
          <EntryTypeIcon entryType={EntryType.REVIEWED} />
          UniProtKB reviewed
          {xref.database.includes('isoforms') ? ' protein isoforms' : ''}
        </>
      );
    } else if (entryType === EntryType.UNREVIEWED) {
      cell = (
        <>
          <EntryTypeIcon entryType={EntryType.UNREVIEWED} />
          UniProtKB unreviewed
        </>
      );
    }
    return (
      <span className={xref.active ? undefined : 'xref-inactive'}>{cell}</span>
    );
  },
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.accession, {
  label: 'Identifier',
  tooltip: 'The identifier as it appears in the source database.',
  render: (xref) =>
    xref.id && (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        {xref.id}
        {xref.chain && ` (chain ${xref.chain})`}
      </span>
    ),
});

// The identifier column above is just text now; this column spells out every
// page a cross-reference can be opened on, so each link's label says where it
// leads:
//   - active UniProtKB entries -> the UniProtKB entry (plus a basket control)
//   - obsolete reviewed entries, and obsolete TrEMBL with no organism -> the
//     UniProtKB history page (the record is gone, but its history remains)
//   - obsolete TrEMBL that still carries an organism, and active external
//     references -> the UniParc sub-entry ("sequence annotation") page
//   - obsolete external references -> back out to the source database
// Obsolete isoforms and databases with no URL template have nowhere to link.
const getLinksColumn =
  (uniparcAccession: string, templateMap: Map<string, string> = new Map()) =>
  (xref: UniParcXRef) => {
    if (!xref.id) {
      return null;
    }
    let cell: ReactNode = null;
    if (
      xref.database === XRefsInternalDatabasesEnum.REVIEWED ||
      xref.database === XRefsInternalDatabasesEnum.UNREVIEWED ||
      xref.database === 'UniProtKB/Swiss-Prot protein isoforms'
    ) {
      if (xref.active) {
        cell = (
          <>
            <Link
              to={getEntryPath(Namespace.uniprotkb, xref.id, TabLocation.Entry)}
            >
              UniProtKB entry
            </Link>
            <BasketStatus id={xref.id} />
          </>
        );
      } else if (xref.database === XRefsInternalDatabasesEnum.REVIEWED) {
        cell = (
          <Link
            to={getEntryPath(Namespace.uniprotkb, xref.id, TabLocation.History)}
          >
            History
          </Link>
        );
      } else if (xref.database === XRefsInternalDatabasesEnum.UNREVIEWED) {
        // Obsolete TrEMBL: the sub-entry page is only meaningful while the
        // cross-reference still carries an organism; otherwise fall back to the
        // UniProtKB history.
        cell = xref.organism ? (
          <Link
            to={getSubEntryPath(uniparcAccession, xref.id, TabLocation.Entry)}
          >
            Sequence annotation
          </Link>
        ) : (
          <Link
            to={getEntryPath(Namespace.uniprotkb, xref.id, TabLocation.History)}
          >
            History
          </Link>
        );
      }
      // Obsolete isoforms fall through with no link.
    } else {
      const template = xref.database && templateMap.get(xref.database);
      if (template) {
        if (xref.active) {
          cell = (
            <Link
              to={getSubEntryPath(
                uniparcAccession,
                `${xref.database}:${xref.id}`,
                TabLocation.Entry
              )}
            >
              Sequence annotation
            </Link>
          );
        } else {
          const id = getXrefId(xref.id, xref.database as string);
          cell = (
            <ExternalLink url={template.replace('%id', id)} rel="nofollow">
              Source database
            </ExternalLink>
          );
        }
      }
    }
    // Unlike the other columns, the Links cell is never given `.xref-inactive`,
    // so its links keep full colour/contrast on dimmed obsolete rows.
    return cell;
  };

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.links, {
  label: 'Go to',
  tooltip: 'Where this cross-reference can be opened.',
  render: getLinksColumn(''),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.gene, {
  label: 'Gene name',
  render: (xref) =>
    xref.geneName && (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        {xref.geneName}
      </span>
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.ncbiGi, {
  label: 'NCBI GI',
  render: (xref) =>
    xref.ncbiGi && (
      <EvidenceLink
        source="RefSeq"
        value={xref.ncbiGi}
        className={xref.active ? undefined : 'xref-inactive'}
      />
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.organism, {
  label: 'Organism',
  render: (xref) =>
    xref.organism && (
      <TaxonomyView
        data={xref.organism}
        className={xref.active ? undefined : 'xref-inactive'}
      />
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.organismId, {
  label: 'Organism ID',
  render: (xref) =>
    xref.organism && (
      <TaxonomyView
        data={xref.organism}
        displayOnlyID
        className={xref.active ? undefined : 'xref-inactive'}
      />
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.protein, {
  label: 'Protein name',
  render: (xref) =>
    xref.proteinName && (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        {xref.proteinName}
      </span>
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.proteome, {
  label: 'Proteome',
  render: (xref) =>
    xref.proteomes?.length
      ? xref.proteomes.map((proteome, i) => (
          <span
            key={`${proteome.id}-${proteome.component}`}
            className={`xref-proteome${xref.active ? '' : ' xref-inactive'}`}
          >
            <Link to={getEntryPath(Namespace.proteomes, proteome.id)}>
              {proteome.id}
            </Link>
            {proteome.component ? ` (${proteome.component})` : undefined}
            {i < (xref.proteomes?.length ?? 0) - 1 && <br />}
          </span>
        ))
      : null,
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.active, {
  label: 'Active',
  tooltip:
    'Whether this cross-reference is still present in the source database. Obsolete ones are shown on a tinted row and remain clickable.',
  render: (xref) => (
    <span className={xref.active ? undefined : 'xref-inactive'}>
      {xref.active ? 'Yes' : 'No'}
    </span>
  ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.firstSeen, {
  label: 'First seen',
  render: (xref) =>
    xref.created && (
      <time
        className={xref.active ? undefined : 'xref-inactive'}
        dateTime={parseDate(xref.created)?.toISOString()}
      >
        {xref.created}
      </time>
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.lastSeen, {
  label: 'Last seen',
  render: (xref) =>
    xref.lastUpdated && (
      <time
        className={xref.active ? undefined : 'xref-inactive'}
        dateTime={parseDate(xref.lastUpdated)?.toISOString()}
      >
        {xref.lastUpdated}
      </time>
    ),
});

const getTimelineColumn =
  (firstSeen?: string, lastSeen?: string) => (xref: UniParcXRef) => (
    <div className={xref.active ? undefined : 'xref-inactive'}>
      <Timeline
        first={firstSeen}
        last={lastSeen}
        start={xref.created}
        end={xref.lastUpdated}
      />
    </div>
  );

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.timeline, {
  label: 'Timeline',
  render: getTimelineColumn(),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.version, {
  label: 'Version',
  render: (xref) =>
    xref.version && (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        {xref.version}
      </span>
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.versionUniParc, {
  label: 'Version (UniParc)',
  render: (xref) => (
    <span className={xref.active ? undefined : 'xref-inactive'}>
      {xref.versionI}
    </span>
  ),
});

export default UniParcXRefsColumnConfiguration;

export const getUniParcXRefsColumns = (
  columns: UniParcXRefsColumn[],
  templateMap: Map<string, string>,
  uniparcAccession: string,
  firstSeen?: string,
  lastSeen?: string
): ColumnDescriptor<UniParcXRef>[] =>
  columns.map((name) => {
    const descriptor = UniParcXRefsColumnConfiguration.get(name);
    if (!descriptor) {
      return {
        label: name,
        name,
        render: () => {
          const message = `${name} has no config yet`;
          logging.warn(message);
          return <div className="warning">{message}</div>;
        },
      };
    }
    // The links column needs the current accession + template map to build its
    // per-row destinations.
    if (name === UniParcXRefsColumn.links) {
      return {
        name,
        label: descriptor?.label,
        tooltip: descriptor?.tooltip,
        render: getLinksColumn(uniparcAccession, templateMap),
      };
    }
    // In case of timeline column, replace with the current template map
    if (name === UniParcXRefsColumn.timeline) {
      return {
        name,
        label: descriptor?.label,
        tooltip: descriptor?.tooltip,
        render: getTimelineColumn(firstSeen, lastSeen),
      };
    }
    return {
      name,
      ...descriptor,
    };
  });
