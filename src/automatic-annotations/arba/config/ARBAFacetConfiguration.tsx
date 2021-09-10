export enum FacetsEnum {
  Taxonomy = 'taxonomy',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.Taxonomy];
