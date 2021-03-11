export enum FacetsEnum {
  Structure3D = 'structure_3d',
  ProteinsWith = 'proteins_with',
  Fragment = 'fragment',
  Existence = 'existence',
  Length = 'length',
  Reviewed = 'reviewed',
  AnnotationScore = 'annotation_score',
  ModelOrganism = 'model_organism',
  OtherOrganism = 'other_organism',
  Proteome = 'proteome',
}

export type Facets = `${FacetsEnum}`;

export const defaultFacets = [
  FacetsEnum.Reviewed,
  FacetsEnum.ModelOrganism,
  FacetsEnum.ProteinsWith,
  FacetsEnum.Existence,
  FacetsEnum.AnnotationScore,
  FacetsEnum.Length,
];
