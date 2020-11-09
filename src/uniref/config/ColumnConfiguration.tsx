/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { UniRefUIModel } from '../adapters/uniRefConverter';

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

export const ColumnConfiguration = new Map<
  UniRefColumn,
  {
    label: string;
    render: (data: UniRefUIModel) => JSX.Element | string | number | undefined;
  }
>();

ColumnConfiguration.set(UniRefColumn.id, {
  label: 'Cluster ID',
  render: ({ id }) => {
    return id;
  },
});

ColumnConfiguration.set(UniRefColumn.name, {
  label: 'Cluster name',
  render: ({ name }) => {
    return name;
  },
});

ColumnConfiguration.set(UniRefColumn.commonTaxon, {
  label: 'Common taxon',
  render: ({ commonTaxon }) => {
    return commonTaxon;
  },
});

ColumnConfiguration.set(UniRefColumn.commonTaxonid, {
  label: 'Common taxon ID',
  render: ({ commonTaxonId }) => {
    return <Link to={`/taxonomy/${commonTaxonId}`}>{commonTaxonId}</Link>;
  },
});

ColumnConfiguration.set(UniRefColumn.organismId, {
  label: 'Organism IDs',
  render: ({ members }) => {
    return members
      ?.map((member) => (
        <Link to={`/taxonomy/${member.organismTaxId}`}>
          {member.organismTaxId}
        </Link>
      ))
      .join(', ');
  },
});

ColumnConfiguration.set(UniRefColumn.organism, {
  label: 'Organisms',
  render: ({ members }) => {
    return members?.map((member) => member.organismName).join(', ');
  },
});

// TODO where is this??
// ColumnConfiguration.set(UniRefColumn.identity, {
//   label: 'Identity',
//   render: (data) => {
//     return <></>;
//   },
// });

ColumnConfiguration.set(UniRefColumn.length, {
  label: 'Length',
  render: ({ Sequence }) => Sequence.sequence.length,
});

ColumnConfiguration.set(UniRefColumn.sequence, {
  label: 'Reference sequence',
  render: (data) => {
    return data.Sequence.sequence.value;
  },
});

ColumnConfiguration.set(UniRefColumn.types, {
  label: 'Types',
  render: ({ entryType }) => {
    // Note: not sure this is the right one
    return entryType;
  },
});

ColumnConfiguration.set(UniRefColumn.members, {
  label: 'Members',
  render: ({ members }) => {
    return members
      ?.map((member) =>
        member.accessions.map((accession) => (
          <Link to={`/uniprotkb/${accession}`}>{accession}</Link>
        ))
      )
      .join(', ');
  },
});

ColumnConfiguration.set(UniRefColumn.count, {
  label: 'Size',
  render: ({ memberCount }) => {
    return memberCount;
  },
});

ColumnConfiguration.set(UniRefColumn.created, {
  label: 'Date of creation',
  render: ({ updated }) => {
    // Note this is actually an update , not creation
    return updated;
  },
});

export default ColumnConfiguration;
