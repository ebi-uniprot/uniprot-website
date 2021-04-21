export enum FacetsEnum {
  Superkingdom = 'superkingdom',
  TaxonomiesWith = 'taxonomies_with',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [
  FacetsEnum.Superkingdom,
  FacetsEnum.TaxonomiesWith,
];
