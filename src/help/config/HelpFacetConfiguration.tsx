export enum FacetsEnum {
  Category = 'category',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.Category];
