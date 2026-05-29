export enum FacetsEnum {
  Superkingdom = 'superkingdom',
  ProteomeType = 'proteome_type',
}

export enum ProteomeFacetValue {
  REFERENCE = 'REFERENCE',
  NON_REFERENCE = 'NON_REFERENCE',
  EXCLUDED = 'EXCLUDED',
}

export const proteomeFacetValueToLabel: Record<ProteomeFacetValue, string> = {
  [ProteomeFacetValue.REFERENCE]: 'Reference proteomes',
  [ProteomeFacetValue.NON_REFERENCE]: 'Non-reference proteomes',
  [ProteomeFacetValue.EXCLUDED]: 'Excluded proteomes',
};

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.ProteomeType, FacetsEnum.Superkingdom];
