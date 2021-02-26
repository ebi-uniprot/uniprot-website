import { DiseasesAPIModel } from '../adapters/diseasesConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';

export enum DiseasesSymbol {
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
  DiseasesSymbol.id,
  DiseasesSymbol.name,
  DiseasesSymbol.definition,
  DiseasesSymbol.reviewedProteinCount,
  DiseasesSymbol.unreviewedProteinCount,
];

export const primaryKeyColumn = DiseasesSymbol.id;

export const CitationsColumnConfiguration: ColumnConfiguration<
  DiseasesSymbol,
  Partial<DiseasesAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
CitationsColumnConfiguration.set(DiseasesSymbol.id, {
  label: 'Disease ID',
  render: ({ id }) => id,
});

export default CitationsColumnConfiguration;
