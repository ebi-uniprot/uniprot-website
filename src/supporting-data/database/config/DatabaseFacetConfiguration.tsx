export enum FacetsEnum {
  CategoryFacet = 'category_facet',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.CategoryFacet];
