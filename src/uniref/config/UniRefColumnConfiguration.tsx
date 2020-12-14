/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';

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

export const primaryKeyColumn = UniRefColumn.id;

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
  render: ({ id }) => <Link to={`/uniref/${id}`}>{id}</Link>,
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
  render: ({ commonTaxonId }) => (
    <Link to={`/taxonomy/${commonTaxonId}`}>{commonTaxonId}</Link>
  ),
});

UniRefColumnConfiguration.set(UniRefColumn.organismId, {
  label: 'Organism IDs',
  render: ({ organismIds }) => (
    <ul className="no-bullet">
      {organismIds?.map((organismId) => (
        <li key={organismId}>
          <Link to={`/taxonomy/${organismId}`}>{organismId}</Link>
        </li>
      ))}
    </ul>
  ),
});

UniRefColumnConfiguration.set(UniRefColumn.organism, {
  label: 'Organisms',
  render: ({ organisms }) => (
    <ul className="no-bullet">
      {organisms?.map((organism) => (
        <li key={organism}>{organism}</li>
      ))}
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
  render: ({ members }) => (
    <ul className="no-bullet">
      {members?.map((member) => (
        <li key={member}>
          <Link to={`/uniprotkb/${member}`}>{member}</Link>
        </li>
      ))}
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
  render: ({ updated }) => updated,
});

export default UniRefColumnConfiguration;
