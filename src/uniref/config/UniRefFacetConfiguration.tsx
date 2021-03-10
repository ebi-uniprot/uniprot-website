export enum FacetsEnum {
  Identity = 'identity',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.Identity];
