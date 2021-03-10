export enum FacetsEnum {
  OrganismName = 'organism_name',
  Database = 'database',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [FacetsEnum.Database];
