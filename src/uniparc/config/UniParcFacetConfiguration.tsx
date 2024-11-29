export enum FacetsEnum {
  Database = 'database_facet',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.Database];
