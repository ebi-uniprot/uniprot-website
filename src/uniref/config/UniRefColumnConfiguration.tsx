/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
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
      <>
        {organismIds?.map((organismId) => (
          <>
            <Link to={`/taxonomy/${organismId}`} key={organismId}>
              {organismId}
            </Link>
            <br />
          </>
        ))}
      </>
    );
  },
});

UniRefColumnConfiguration.set(UniRefColumn.organism, {
  label: 'Organisms',
  render: ({ organisms }) => {
    return organisms?.join(', ');
  },
});

// TODO where is this??
// ColumnConfiguration.set(UniRefColumn.identity, {
//   label: 'Identity',
//   render: (data) => {
//     return <></>;
//   },
// });

UniRefColumnConfiguration.set(UniRefColumn.length, {
  label: 'Length',
  render: ({ sequenceLength }) => sequenceLength,
});

// TODO looks like representativeMember is not present in results
UniRefColumnConfiguration.set(UniRefColumn.sequence, {
  label: 'Reference sequence',
  render: ({ sequence }) => {
    return sequence;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.types, {
  label: 'Types',
  render: ({ entryType }) => {
    // Note: not sure this is the right one
    return entryType;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.members, {
  label: 'Members',
  render: ({ members }) => {
    return (
      <>
        {members?.map((member) => (
          <>
            <Link to={`/uniprotkb/${member}`} key={member}>
              {member}
            </Link>
            <br />
          </>
        ))}
      </>
    );
  },
});

UniRefColumnConfiguration.set(UniRefColumn.count, {
  label: 'Size',
  render: ({ memberCount }) => {
    return memberCount;
  },
});

UniRefColumnConfiguration.set(UniRefColumn.created, {
  label: 'Date of creation',
  render: ({ updated }) => {
    // Note this is actually an update , not creation
    return updated;
  },
});

export default UniRefColumnConfiguration;
