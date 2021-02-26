import { LocationsAPIModel } from '../adapters/locationsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';

export enum LocationsColumn {
  category = 'category',
  content = 'content',
  definition = 'definition',
  geneOntologies = 'gene_ontologies',
  id = 'id',
  isA = 'is_a',
  keyword = 'keyword',
  links = 'links',
  name = 'name',
  note = 'note',
  partOf = 'part_of',
  references = 'references',
  statistics = 'statistics',
  synonyms = 'synonyms',
}

// TODO: review
export const defaultColumns = [
  LocationsColumn.id,
  LocationsColumn.name,
  LocationsColumn.definition,
  LocationsColumn.category,
];

export const primaryKeyColumn = LocationsColumn.id;

export const LocationsColumnConfiguration: ColumnConfiguration<
  LocationsColumn,
  Partial<LocationsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
// LocationsColumnConfiguration.set(LocationsColumn.id, {
//   label: 'Pubmed ID',
//   render: ({ id }) => id,
// });

export default LocationsColumnConfiguration;
