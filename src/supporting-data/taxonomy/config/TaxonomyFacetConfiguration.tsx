// No known facet (for now at least?)
export enum FacetsEnum {
  Reference = 'reference',
  Reviewed = 'reviewed',
  Proteome = 'proteome',
  Annotated = 'annotated',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [
  FacetsEnum.Reference,
  FacetsEnum.Reviewed,
  FacetsEnum.Proteome,
  FacetsEnum.Annotated,
];
