import { Link } from 'react-router-dom';
import { Button, LongNumber, Sequence } from 'franklin-sites';

import EntryTypeIcon from '../../shared/components/entry/EntryTypeIcon';
import AccessionView from '../../shared/components/results/AccessionView';
import TaxonomyView from '../../shared/components/entry/TaxonomyView';

import { getEntryPath } from '../../app/config/urls';
import parseDate from '../../shared/utils/parseDate';
import { pluralise } from '../../shared/utils/utils';

import { fromColumnConfig } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';

import { Namespace } from '../../shared/types/namespaces';
import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';

export enum UniRefColumn {
  id = 'id',
  name = 'name',
  commonTaxon = 'common_taxon',
  commonTaxonId = 'common_taxonid',
  organismId = 'organism_id',
  organism = 'organism',
  identity = 'identity',
  length = 'length',
  sequence = 'sequence',
  types = 'types',
  members = 'members',
  count = 'count',
  created = 'created',
  from = 'from',
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

export const primaryKeyColumns = [UniRefColumn.id];

export const UniRefColumnConfiguration: ColumnConfiguration<
  UniRefColumn,
  Partial<UniRefLiteAPIModel>
> = new Map();

const CUT_OFF = 5;

UniRefColumnConfiguration.set(UniRefColumn.id, {
  label: 'Cluster ID',
  render: ({ id }) =>
    id && <AccessionView id={id} namespace={Namespace.uniref} />,
});

UniRefColumnConfiguration.set(UniRefColumn.name, {
  label: 'Cluster name',
  render: ({ name }) => name,
});

UniRefColumnConfiguration.set(UniRefColumn.commonTaxon, {
  label: 'Common taxon',
  render: ({ commonTaxon }) =>
    commonTaxon && <TaxonomyView data={commonTaxon} />,
});

UniRefColumnConfiguration.set(UniRefColumn.commonTaxonId, {
  label: 'Common taxon ID',
  render: ({ commonTaxon }) =>
    commonTaxon && <TaxonomyView data={commonTaxon} displayOnlyID />,
});

UniRefColumnConfiguration.set(UniRefColumn.organismId, {
  label: 'Organism IDs',
  render: ({ organisms, id }) =>
    organisms &&
    id && (
      <ul className="no-bullet">
        {organisms.slice(0, CUT_OFF).map((organism) => (
          <li key={organism.taxonId}>
            <TaxonomyView data={organism} displayOnlyID />
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
  render: ({ organisms, id }) =>
    organisms &&
    id && (
      <ul className="no-bullet">
        {organisms.slice(0, CUT_OFF).map((organism) => (
          <li key={organism.taxonId}>
            <TaxonomyView data={organism} />
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
  // Do not use `sequenceLength` here as the `length` field filter removes it
  render: ({ representativeMember }) =>
    representativeMember?.sequence?.length ? (
      <LongNumber>{representativeMember.sequence.length}</LongNumber>
    ) : null,
});

UniRefColumnConfiguration.set(UniRefColumn.sequence, {
  label: 'Reference sequence',
  render: ({ representativeMember }) =>
    representativeMember?.sequence?.value ? (
      <Sequence
        sequence={representativeMember.sequence.value}
        showActionBar={false}
      />
    ) : null,
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
  render: ({ members, memberCount, id }) =>
    members &&
    memberCount &&
    id && (
      <ul className="no-bullet">
        {members.slice(0, CUT_OFF).map((member) => (
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
            {memberCount - CUT_OFF} more{' '}
            {pluralise('member', memberCount - CUT_OFF)}
          </Button>
        )}
      </ul>
    ),
});

UniRefColumnConfiguration.set(UniRefColumn.count, {
  label: 'Size',
  render: ({ memberCount }) =>
    memberCount && (
      <>
        {memberCount} {pluralise('member', memberCount)}
      </>
    ),
});

UniRefColumnConfiguration.set(UniRefColumn.created, {
  label: 'Last updated',
  render: ({ updated }) =>
    updated && (
      <time dateTime={parseDate(updated)?.toISOString()}>{updated}</time>
    ),
});

UniRefColumnConfiguration.set(UniRefColumn.from, fromColumnConfig);

export default UniRefColumnConfiguration;
