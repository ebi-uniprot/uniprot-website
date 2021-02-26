import { TaxonomyAPIModel } from '../adapters/taxonomyConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';

export enum TaxonomyColumn {
  commonName = 'common_name',
  host = 'host',
  id = 'id',
  lineage = 'lineage',
  links = 'links',
  mnemonic = 'mnemonic',
  otherNames = 'other_names',
  parent = 'parent',
  rank = 'rank',
  reviewed = 'reviewed',
  scientificName = 'scientific_name',
  statistics = 'statistics',
  strain = 'strain',
  synonym = 'synonym',
}

// TODO: review
export const defaultColumns = [
  TaxonomyColumn.id,
  TaxonomyColumn.commonName,
  TaxonomyColumn.scientificName,
  TaxonomyColumn.lineage,
];

export const primaryKeyColumn = TaxonomyColumn.id;

export const TaxonomyColumnConfiguration: ColumnConfiguration<
  TaxonomyColumn,
  Partial<TaxonomyAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
// TaxonomyColumnConfiguration.set(TaxonomyColumn.id, {
//   label: 'Taxon',
//   render: ({ taxonId }) => taxonId,
// });

export default TaxonomyColumnConfiguration;
