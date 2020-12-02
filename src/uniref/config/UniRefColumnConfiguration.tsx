import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import EntryTypeIcon from '../../shared/components/entry/EntryTypeIcon';

import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';

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

export const mustHave = [UniRefColumn.id];

export const UniRefColumnConfiguration = new Map<
  UniRefColumn,
  {
    label: string;
    render: (
      data: UniRefLiteAPIModel
    ) => JSX.Element | string | number | undefined;
  }
>();

UniRefColumnConfiguration.set(UniRefColumn.id, {
  label: 'Cluster ID',
  render: ({ id }) => {
    return <Link to={`/uniref/${id}`}>{id}</Link>;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.name, {
  label: 'Cluster name',
  render: ({ name }) => {
    return name;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.commonTaxon, {
  label: 'Common taxon',
  render: ({ commonTaxon }) => {
    return commonTaxon;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.commonTaxonid, {
  label: 'Common taxon ID',
  render: ({ commonTaxonId }) => {
    return <Link to={`/taxonomy/${commonTaxonId}`}>{commonTaxonId}</Link>;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.organismId, {
  label: 'Organism IDs',
  render: ({ organismIds }) => {
    return (
      <ExpandableList descriptionString="organims" displayNumberOfHiddenItems>
        {organismIds?.map((organismId) => (
          <Link key={organismId} to={`/taxonomy/${organismId}`}>
            {organismId}
          </Link>
        ))}
      </ExpandableList>
    );
  },
});

UniRefColumnConfiguration.set(UniRefColumn.organism, {
  label: 'Organisms',
  render: ({ organisms }) => {
    return (
      <ExpandableList descriptionString="organisms" displayNumberOfHiddenItems>
        {organisms?.map((organism) => (
          <Fragment key={organism}>{organism}</Fragment>
        ))}
      </ExpandableList>
    );
  },
});

UniRefColumnConfiguration.set(UniRefColumn.identity, {
  label: 'Identity',
  render: ({ entryType }) => {
    return <>{entryType}</>;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.length, {
  label: 'Length',
  render: ({ sequenceLength }) => sequenceLength,
});

UniRefColumnConfiguration.set(UniRefColumn.sequence, {
  label: 'Reference sequence',
  render: ({ sequence }) => {
    return <span className="break-anywhere">{sequence}</span>;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.types, {
  label: 'Types',
  render: ({ memberIdTypes }) => {
    return (
      <>
        {memberIdTypes?.map((memberType) => (
          <EntryTypeIcon entryType={memberType} key={memberType} />
        ))}
      </>
    );
  },
});

UniRefColumnConfiguration.set(UniRefColumn.members, {
  label: 'Members',
  render: ({ members }) => {
    return (
      <ExpandableList descriptionString="members" displayNumberOfHiddenItems>
        {members?.map((member) => (
          <Link key={member} to={`/uniprotkb/${member}`}>
            {member}
          </Link>
        ))}
      </ExpandableList>
    );
  },
});

UniRefColumnConfiguration.set(UniRefColumn.count, {
  label: 'Size',
  render: ({ memberCount }) => {
    return (
      <>
        {memberCount} member{memberCount > 1 && 's'}
      </>
    );
  },
});

UniRefColumnConfiguration.set(UniRefColumn.created, {
  label: 'Last updated',
  render: ({ updated }) => {
    return updated;
  },
});

export default UniRefColumnConfiguration;
