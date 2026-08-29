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
import { type ObsoleteXRefStatus } from '../components/entry/hooks/useObsoleteXRefStatuses';
import Timeline from '../components/entry/Timeline';
import { getSubEntryPath } from '../utils/subEntry';
import { getXrefId } from '../utils/uniparcXref';

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
  UniParcXRefsColumn.active,
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

// Every link in this column is labelled by where it goes, so on a table with
// hundreds of rows the visible text alone would give them all the same
// accessible name and no way to tell which row is focused (WCAG 2.4.4). The
// identifier goes in an `aria-label` that still starts with the visible label,
// so the two agree (WCAG 2.5.3).
const uniProtKBEntryLink = (id: string) => (
  <>
    <Link
      to={getEntryPath(Namespace.uniprotkb, id, TabLocation.Entry)}
      aria-label={`UniProtKB entry ${id}`}
    >
      UniProtKB entry
    </Link>
    <BasketStatus id={id} />
  </>
);

const uniProtKBHistoryLink = (id: string) => (
  <Link
    to={getEntryPath(Namespace.uniprotkb, id, TabLocation.History)}
    aria-label={`History of ${id}`}
  >
    History
  </Link>
);

const subEntryLink = (
  uniparcAccession: string,
  xrefId: string,
  label: string,
  // What the link is *about*, when that isn't the sub-entry's own identifier
  subject: string = xrefId
) => (
  <Link
    to={getSubEntryPath(uniparcAccession, xrefId, TabLocation.Entry)}
    aria-label={`${label} for ${subject}`}
  >
    {label}
  </Link>
);

// The identifier column above is just text now; this column spells out every
// page a cross-reference can be opened on, so each link's label says where it
// leads:
//   - active UniProtKB entries -> the UniProtKB entry (plus a basket control)
//   - obsolete reviewed entries -> the UniProtKB history page (the record is
//     gone, but its history remains)
//   - obsolete TrEMBL -> wherever it actually ended up, which only UniProtKB can
//     say: see `useObsoleteXRefStatuses` and the comment in the branch below
//   - active external references -> the UniParc sub-entry ("sequence
//     annotation") page
//   - obsolete external references -> back out to the source database
// Obsolete isoforms and databases with no URL template have nowhere to link.
const getLinksColumn =
  (
    uniparcAccession: string,
    templateMap: Map<string, string> = new Map(),
    obsoleteStatuses: Map<string, ObsoleteXRefStatus> = new Map()
  ) =>
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
        cell = uniProtKBEntryLink(xref.id);
      } else if (xref.database === XRefsInternalDatabasesEnum.REVIEWED) {
        cell = uniProtKBHistoryLink(xref.id);
      } else if (xref.database === XRefsInternalDatabasesEnum.UNREVIEWED) {
        // Obsolete TrEMBL ends up in one of three places, and the xref row can't
        // tell them apart — it carries no merge information, and its `active`
        // flag can lag behind UniProtKB. Merged and still-active accessions get
        // linked straight to their destination, which also spares them the
        // sub-entry page's redirect.
        //
        // Until the lookup resolves — or if it can't, e.g. past its accession
        // limit — fall back to the sub-entry page with a label that doesn't
        // promise a specific page. That page routes correctly on its own, so the
        // destination is right either way; only the wording is less specific.
        const status = obsoleteStatuses.get(xref.id);
        if (status === 'active') {
          cell = uniProtKBEntryLink(xref.id);
        } else if (status === 'merged') {
          cell = uniProtKBHistoryLink(xref.id);
        } else {
          cell = subEntryLink(
            uniparcAccession,
            xref.id,
            status === 'deleted' ? 'Sequence annotation' : 'UniProtKB record'
          );
        }
      }
      // Obsolete isoforms fall through with no link.
    } else {
      const template = xref.database && templateMap.get(xref.database);
      if (template) {
        if (xref.active) {
          cell = subEntryLink(
            uniparcAccession,
            `${xref.database}:${xref.id}`,
            'Sequence annotation',
            xref.id
          );
        } else {
          const id = getXrefId(xref.id, xref.database as string);
          cell = (
            <ExternalLink
              url={template.replace('%id', id)}
              rel="nofollow"
              aria-label={`Source database entry ${id}`}
            >
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

// "Go to" is the one column here with no field behind it on the API's uniparc
// entry-result-fields, so — unlike every other column — it must never reach the
// stored column list: `fields=…,links` is rejected with a 400 by the download
// endpoints, and the Customise Table panel (which labels columns from that same
// endpoint) would silently drop it, leaving it impossible to re-add. It is
// injected into the rendered table instead, by `getUniParcXRefsColumns` below,
// which also guarantees it to users whose stored column list predates it.
// Typed as `string` rather than inferred, so it can be compared against a
// `UniParcXRefsColumn` — which no longer has a `links` member
const linksColumnName: string = 'links';
const linksColumnLabel = 'Go to';
const linksColumnTooltip = 'Where this cross-reference can be opened.';

/**
 * Drop columns that only exist on the client, so they never end up in a
 * `fields` parameter or the column-select panel. "Go to" was briefly a stored
 * column, so it can still come back out of localStorage.
 */
export const withoutClientOnlyColumns = (columns: UniParcXRefsColumn[]) =>
  columns.filter((name) => name !== linksColumnName);

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
    'Whether this cross-reference is still present in the source database. Obsolete ones are dimmed; where they can still be viewed, the "Go to" column links to it.',
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

// Where the injected "Go to" column lands, in order of preference: the default
// layout puts it straight after "Active", and if that has been customised away
// it sits next to the identifier it describes — which, being a primary key
// column, can't itself be removed. Leading the table is a fallback for stored
// column lists that hold neither.
const linksColumnAnchors = [
  UniParcXRefsColumn.active,
  UniParcXRefsColumn.accession,
];

const getLinksColumnIndex = (columns: UniParcXRefsColumn[]) => {
  for (const anchor of linksColumnAnchors) {
    const index = columns.indexOf(anchor);
    if (index !== -1) {
      return index + 1;
    }
  }
  return 0;
};

export const getUniParcXRefsColumns = (
  columns: UniParcXRefsColumn[],
  templateMap: Map<string, string>,
  uniparcAccession: string,
  firstSeen?: string,
  lastSeen?: string,
  obsoleteStatuses?: Map<string, ObsoleteXRefStatus>
): ColumnDescriptor<UniParcXRef>[] => {
  const storedColumns = withoutClientOnlyColumns(columns);
  const descriptors: ColumnDescriptor<UniParcXRef>[] = storedColumns.map(
    (name) => {
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
    }
  );
  // Always present, whatever the stored column list says, and built here
  // because it needs the current accession, template map and resolved
  // obsolete-entry statuses to work out its per-row destinations.
  descriptors.splice(getLinksColumnIndex(storedColumns), 0, {
    name: linksColumnName,
    label: linksColumnLabel,
    tooltip: linksColumnTooltip,
    render: getLinksColumn(uniparcAccession, templateMap, obsoleteStatuses),
  });
  return descriptors;
};
