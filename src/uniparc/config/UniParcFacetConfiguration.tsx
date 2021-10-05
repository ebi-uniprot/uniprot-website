export enum FacetsEnum {
  OrganismName = 'organism_name',
  Database = 'database_facet',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.Database];
