import { DatabaseAPIModel } from '../adapters/databaseConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';

export enum DatabaseColumn {
  abbrev = 'abbrev',
  category = 'category',
  dbUrl = 'dbUrl',
  doiId = 'doi_id',
  id = 'id',
  linkType = 'link_type',
  name = 'name',
  pubmedId = 'pubmed_id',
  reviewedProteinCount = 'reviewed_protein_count',
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

export const CitationsColumnConfiguration: ColumnConfiguration<
  DatabaseColumn,
  Partial<DatabaseAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
// CitationsColumnConfiguration.set(DatabaseColumn.id, {
//   label: 'Cross-reference ID',
//   render: ({ id }) => id,
// });

export default CitationsColumnConfiguration;
