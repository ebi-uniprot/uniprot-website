export enum FacetsEnum {
  CategoryExact = 'category_exact',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.CategoryExact];
