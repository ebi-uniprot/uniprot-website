import { CitationsAPIModel } from '../adapters/citationsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';

export enum CitationsColumn {
  authoringGroup = 'authoring_group',
  doi = 'doi',
  firstPage = 'first_page',
  id = 'id', // Pubmed ID
  journal = 'journal',
  lastPage = 'last_page',
  litAbstract = 'lit_abstract',
  publicationDate = 'publication', // ⚠️ field doesn't contain the string "date"
  reference = 'reference',
  statistics = 'statistics',
  title = 'title',
  volume = 'volume',
}

// TODO: review
export const defaultColumns = [
  CitationsColumn.id,
  CitationsColumn.title,
  CitationsColumn.authoringGroup,
  CitationsColumn.publicationDate,
  CitationsColumn.journal,
  CitationsColumn.firstPage,
  CitationsColumn.lastPage,
];

export const primaryKeyColumn = CitationsColumn.id;

export const CitationsColumnConfiguration: ColumnConfiguration<
  CitationsColumn,
  Partial<CitationsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
CitationsColumnConfiguration.set(CitationsColumn.id, {
  label: 'Pubmed ID',
  render: ({ id }) => id,
});

export default CitationsColumnConfiguration;
