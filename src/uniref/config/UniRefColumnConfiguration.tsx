import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'franklin-sites';

import EntryTypeIcon from '../../shared/components/entry/EntryTypeIcon';

import { getEntryPath } from '../../app/config/urls';

import { Namespace } from '../../shared/types/namespaces';
import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';
import { OrganismDataView } from '../../shared/components/views/OrganismDataView';

export enum UniRefColumn {
  id = 'id',
  name = 'name',
  commonTaxon = 'common_taxon',
  commonTaxonid = 'common_taxonid',
  organismId = 'organism_id',
  organism = 'organism',
  identity = 'identity',
  length = 'length',
  sequence = 'sequence',
  types = 'types',
  members = 'members',
  count = 'count',
  created = 'created',
}

export const defaultColumns = [
  UniRefColumn.id,
  UniRefColumn.name,
  UniRefColumn.types,
  UniRefColumn.count,
  UniRefColumn.organism,
  UniRefColumn.length,
  UniRefColumn.identity,
];

export const primaryKeyColumn = UniRefColumn.id;

export const UniRefColumnConfiguration = new Map<
  UniRefColumn,
  {
    label: ReactNode;
    render: (data: UniRefLiteAPIModel) => ReactNode;
  }
>();

const CUT_OFF = 5;

UniRefColumnConfiguration.set(UniRefColumn.id, {
  label: 'Cluster ID',
  render: ({ id }) => <Link to={getEntryPath(Namespace.uniref, id)}>{id}</Link>,
});

UniRefColumnConfiguration.set(UniRefColumn.name, {
  label: 'Cluster name',
  render: ({ name }) => name,
});

UniRefColumnConfiguration.set(UniRefColumn.commonTaxon, {
  label: 'Common taxon',
  render: ({ commonTaxon }) => commonTaxon,
});

UniRefColumnConfiguration.set(UniRefColumn.commonTaxonid, {
  label: 'Common taxon ID',
  render: ({ commonTaxon }) =>
    commonTaxon.taxonId && (
      <Link to={getEntryPath(Namespace.taxonomy, commonTaxon.taxonId)}>
        {commonTaxon.taxonId}
      </Link>
    ),
});

UniRefColumnConfiguration.set(UniRefColumn.organismId, {
  label: 'Organism IDs',
  render: ({ organisms, id }) => (
    <ul className="no-bullet">
      {organisms?.slice(0, CUT_OFF).map((organism) => (
        <li key={organism.taxonId}>
          <OrganismDataView organism={organism} />
        </li>
      ))}
      {organisms.length > CUT_OFF && (
        <Button
          element={Link}
          variant="tertiary"
          to={getEntryPath(Namespace.uniref, id)}
        >
          More organisms
        </Button>
      )}
    </ul>
  ),
});

UniRefColumnConfiguration.set(UniRefColumn.organism, {
  label: 'Organisms',
  render: ({ organisms, id }) => (
    <ul className="no-bullet">
      {organisms?.slice(0, CUT_OFF).map((organism) => (
        <li key={organism.taxonId}>
          <OrganismDataView organism={organism} />
        </li>
      ))}
      {organisms.length > CUT_OFF && (
        <Button
          element={Link}
          variant="tertiary"
          to={getEntryPath(Namespace.uniref, id)}
        >
          More organisms
        </Button>
      )}
    </ul>
  ),
});

UniRefColumnConfiguration.set(UniRefColumn.identity, {
  label: 'Identity',
  render: ({ entryType }) => <>{entryType}</>,
});

UniRefColumnConfiguration.set(UniRefColumn.length, {
  label: 'Length',
  render: ({ sequenceLength }) => sequenceLength,
});

UniRefColumnConfiguration.set(UniRefColumn.sequence, {
  label: 'Reference sequence',
  // NOTE: not consistent with the way it's represented in UniProtKB column
  render: ({ sequence }) => <span className="break-anywhere">{sequence}</span>,
});

UniRefColumnConfiguration.set(UniRefColumn.types, {
  label: 'Types',
  render: ({ memberIdTypes }) => (
    <>
      {memberIdTypes?.map((memberType) => (
        <EntryTypeIcon entryType={memberType} key={memberType} />
      ))}
    </>
  ),
});

UniRefColumnConfiguration.set(UniRefColumn.members, {
  label: 'Members',
  render: ({ members, memberCount, id }) => (
    <ul className="no-bullet">
      {members?.slice(0, CUT_OFF).map((member) => (
        <li key={member}>
          <Link
            to={getEntryPath(
              member.startsWith('UPI')
                ? Namespace.uniparc
                : Namespace.uniprotkb,
              member
            )}
          >
            {member}
          </Link>
        </li>
      ))}
      {members.length > CUT_OFF && (
        <Button
          element={Link}
          variant="tertiary"
          to={getEntryPath(Namespace.uniref, id)}
        >
          {memberCount - CUT_OFF} more member
          {memberCount - CUT_OFF === 1 ? '' : 's'}
        </Button>
      )}
    </ul>
  ),
});

UniRefColumnConfiguration.set(UniRefColumn.count, {
  label: 'Size',
  render: ({ memberCount }) => (
    <>
      {memberCount} member{memberCount > 1 && 's'}
    </>
  ),
});

UniRefColumnConfiguration.set(UniRefColumn.created, {
  label: 'Last updated',
  render: ({ updated }) => (
    <time dateTime={new Date(updated).toISOString()}>{updated}</time>
  ),
});

export default UniRefColumnConfiguration;
