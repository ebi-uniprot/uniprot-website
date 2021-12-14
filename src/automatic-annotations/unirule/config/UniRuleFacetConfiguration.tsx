export enum FacetsEnum {
  Superkingdom = 'superkingdom',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.Superkingdom];
