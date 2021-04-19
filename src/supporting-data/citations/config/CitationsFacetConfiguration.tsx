export enum FacetsEnum {
  CitationsWith = 'citations_with',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.CitationsWith];
