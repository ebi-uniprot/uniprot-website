import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import ExternalLink from '../../shared/components/ExternalLink';
import Timeline from '../components/entry/Timeline';
import EntryTypeIcon, {
  EntryType,
} from '../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../shared/components/entry/TaxonomyView';
import BasketStatus from '../../basket/BasketStatus';
import EvidenceLink from '../../uniprotkb/components/protein-data-views/EvidenceLink';

import { getEntryPath } from '../../app/config/urls';

import parseDate from '../../shared/utils/parseDate';
import * as logging from '../../shared/utils/logging';

import { Namespace } from '../../shared/types/namespaces';
import {
  databaseToEntryType,
  UniParcXRef,
  XRefsInternalDatabasesEnum,
} from '../adapters/uniParcConverter';
import { ColumnDescriptor } from '../../shared/hooks/useColumns';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';
import { TabLocation } from '../../uniprotkb/types/entry';

export enum UniParcXRefsColumn {
  // Names & taxonomy
  database = 'database',
  accession = 'accession',
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
  UniParcXRefsColumn.version,
  UniParcXRefsColumn.organism,
  UniParcXRefsColumn.firstSeen,
  UniParcXRefsColumn.lastSeen,
  UniParcXRefsColumn.active,
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

const getAccessionColumn =
  (templateMap: Map<string, string> = new Map()) =>
  (xref: UniParcXRef) => {
    if (!xref.id) {
      return null;
    }
    let cell: ReactNode = xref.id;
    if (
      (xref.database === XRefsInternalDatabasesEnum.REVIEWED ||
        xref.database === XRefsInternalDatabasesEnum.UNREVIEWED ||
        xref.database === 'UniProtKB/Swiss-Prot protein isoforms') &&
      (!xref.database.includes('isoforms') || xref.active)
    ) {
      // internal link
      cell = (
        <>
          <Link
            to={getEntryPath(
              Namespace.uniprotkb,
              xref.id,
              xref.active ? TabLocation.Entry : TabLocation.History
            )}
          >
            {xref.id}
          </Link>
          {xref.active && <BasketStatus id={xref.id} />}
        </>
      );
    } else {
      const template = xref.database && templateMap.get(xref.database);
      if (template) {
        let { id } = xref;
        // NOTE: exception for FusionGDB we need to remove the underscore number
        if (xref.database === 'FusionGDB') {
          id = id.replace(/_\d+$/, '');
        }
        cell = (
          <ExternalLink url={template.replace('%id', id)}>
            {xref.id}
            {xref.chain && ` (chain ${xref.chain})`}
          </ExternalLink>
        );
      }
    }
    return (
      <span className={xref.active ? undefined : 'xref-inactive'}>{cell}</span>
    );
  };

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.accession, {
  label: 'Identifier',
  render: getAccessionColumn(),
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
    xref.proteomeId && (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        <Link to={getEntryPath(Namespace.proteomes, xref.proteomeId)}>
          {xref.proteomeId}
        </Link>
        {xref.component ? ` (${xref.component})` : undefined}
      </span>
    ),
});

UniParcXRefsColumnConfiguration.set(UniParcXRefsColumn.active, {
  label: 'Active',
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
  (firstSeen?: string, lastSeen?: string) => (xref: UniParcXRef) =>
    (
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
    // In case of accession column, replace with the current template map
    if (name === UniParcXRefsColumn.accession) {
      return {
        name,
        label: descriptor?.label,
        render: getAccessionColumn(templateMap),
      };
    }
    // In case of timeline column, replace with the current template map
    if (name === UniParcXRefsColumn.timeline) {
      return {
        name,
        label: descriptor?.label,
        render: getTimelineColumn(firstSeen, lastSeen),
      };
    }
    return {
      name,
      ...descriptor,
    };
  });
