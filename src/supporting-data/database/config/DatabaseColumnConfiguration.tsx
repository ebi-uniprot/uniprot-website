import { Link } from 'react-router-dom';
import { ExternalLink, LongNumber } from 'franklin-sites';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import { getEntryPathFor } from '../../../app/config/urls';

import { DatabaseAPIModel } from '../adapters/databaseConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { Namespace } from '../../../shared/types/namespaces';

export enum DatabaseColumn {
  abbrev = 'abbrev',
  category = 'category',
  // URL template for a specific entry within this database
  dbUrl = 'dbUrl',
  doiId = 'doi_id',
  id = 'id',
  linkType = 'link_type',
  name = 'name',
  pubmedId = 'pubmed_id',
  reviewedProteinCount = 'reviewed_protein_count',
  // URL of the home page of the database
  server = 'server',
  unreviewedProteinCount = 'unreviewed_protein_count',
}

// TODO: review
export const defaultColumns = [
  DatabaseColumn.id,
  DatabaseColumn.name,
  DatabaseColumn.abbrev,
  DatabaseColumn.reviewedProteinCount,
  DatabaseColumn.unreviewedProteinCount,
  DatabaseColumn.category,
];

export const primaryKeyColumn = DatabaseColumn.id;

const getEntryPath = getEntryPathFor(Namespace.database);

export const DatabaseColumnConfiguration: ColumnConfiguration<
  DatabaseColumn,
  Partial<DatabaseAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
DatabaseColumnConfiguration.set(DatabaseColumn.abbrev, {
  label: 'Abbreviation',
  render: ({ abbrev }) => abbrev,
});

DatabaseColumnConfiguration.set(DatabaseColumn.category, {
  label: 'Category',
  render: ({ category }) => category,
});

DatabaseColumnConfiguration.set(DatabaseColumn.dbUrl, {
  label: 'DB URL',
  render: ({ dbUrl }) => dbUrl,
});

DatabaseColumnConfiguration.set(DatabaseColumn.doiId, {
  label: 'DOI ID',
  render: ({ doiId }) => doiId,
});

DatabaseColumnConfiguration.set(DatabaseColumn.id, {
  label: 'ID',
  render: ({ id }) => id && <Link to={getEntryPath(id)}>{id}</Link>,
});

DatabaseColumnConfiguration.set(DatabaseColumn.linkType, {
  label: 'Link type',
  render: ({ linkType }) => linkType,
});

DatabaseColumnConfiguration.set(DatabaseColumn.name, {
  label: 'Name',
  render: ({ name }) => name,
});

DatabaseColumnConfiguration.set(DatabaseColumn.pubmedId, {
  label: 'PubMed ID',
  render: ({ pubMedId }) => pubMedId,
});

DatabaseColumnConfiguration.set(DatabaseColumn.reviewedProteinCount, {
  label: (
    <>
      <EntryTypeIcon entryType={EntryType.REVIEWED} />
      Mapped reviewed entries
    </>
  ),
  render: ({ reviewedProteinCount }) =>
    reviewedProteinCount !== undefined && (
      <LongNumber>{reviewedProteinCount}</LongNumber>
    ),
});

DatabaseColumnConfiguration.set(DatabaseColumn.server, {
  label: 'Server',
  render: ({ server }) =>
    server && <ExternalLink url={server}>{server}</ExternalLink>,
});

DatabaseColumnConfiguration.set(DatabaseColumn.unreviewedProteinCount, {
  label: (
    <>
      <EntryTypeIcon entryType={EntryType.UNREVIEWED} />
      Mapped unreviewed entries
    </>
  ),
  render: ({ unreviewedProteinCount }) =>
    unreviewedProteinCount !== undefined && (
      <LongNumber>{unreviewedProteinCount}</LongNumber>
    ),
});

export default DatabaseColumnConfiguration;
