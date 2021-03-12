export enum FacetsEnum {
  Superkingdom = 'superkingdom',
  ProteomeType = 'proteome_type',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.ProteomeType, FacetsEnum.Superkingdom];
