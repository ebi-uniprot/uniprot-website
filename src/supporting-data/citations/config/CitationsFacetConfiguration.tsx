export enum FacetsEnum {
  IsComputationallyMapped = 'is_computationally_mapped',
  IsCommunityMapped = 'is_community_mapped',
  IsUniProtKBMapped = 'is_uniprotkb_mapped',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [
  FacetsEnum.IsComputationallyMapped,
  FacetsEnum.IsCommunityMapped,
  FacetsEnum.IsUniProtKBMapped,
];
