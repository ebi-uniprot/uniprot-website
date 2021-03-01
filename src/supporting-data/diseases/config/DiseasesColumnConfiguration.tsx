import { DiseasesAPIModel } from '../adapters/diseasesConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';

export enum DiseasesColumn {
  acronym = 'acronym',
  alternativeNames = 'alternative_names',
  crossReferences = 'cross_references',
  definition = 'definition',
  id = 'id',
  keywords = 'keywords',
  name = 'name',
  reviewedProteinCount = 'reviewed_protein_count',
  unreviewedProteinCount = 'unreviewed_protein_count',
}

// TODO: review
export const defaultColumns = [
  DiseasesColumn.id,
  DiseasesColumn.name,
  DiseasesColumn.definition,
  DiseasesColumn.reviewedProteinCount,
  DiseasesColumn.unreviewedProteinCount,
];

export const primaryKeyColumn = DiseasesColumn.id;

export const DiseasesColumnConfiguration: ColumnConfiguration<
  DiseasesColumn,
  Partial<DiseasesAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
// DiseasesColumnConfiguration.set(DiseasesColumn.id, {
//   label: 'Disease ID',
//   render: ({ id }) => id,
// });

export default DiseasesColumnConfiguration;
