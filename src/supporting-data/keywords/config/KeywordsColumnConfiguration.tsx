import { KeywordsAPIModel } from '../adapters/keywordsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';

export enum KeywordsColumn {
  category = 'category',
  children = 'children',
  description = 'description',
  geneOntology = 'gene_ontology',
  id = 'id',
  name = 'name',
  parent = 'parent',
  sites = 'sites',
  statistics = 'statistics',
  synonym = 'synonym',
}

// TODO: review
export const defaultColumns = [
  KeywordsColumn.id,
  KeywordsColumn.description,
  KeywordsColumn.category,
  KeywordsColumn.statistics,
];

export const primaryKeyColumn = KeywordsColumn.id;

export const KeywordsColumnConfiguration: ColumnConfiguration<
  KeywordsColumn,
  Partial<KeywordsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
KeywordsColumnConfiguration.set(KeywordsColumn.id, {
  label: 'Keyword ID',
  render: ({ id }) => id,
});

export default KeywordsColumnConfiguration;
