export type SequenceFeatures =
  | 'Compositional bias'
  | 'Non-standard residue'
  | 'Sequence uncertainty'
  | 'Sequence conflict'
  | 'Non-adjacent residues'
  | 'Non-terminal residue'
  | 'Alternative sequence';

export type DiseaseAndDrugsFeatures = 'Mutagenesis';

export type FunctionFeatures =
  | 'Domain'
  | 'Repeat'
  | 'Zinc finger'
  | 'DNA binding'
  | 'Region'
  | 'Coiled coil'
  | 'Motif'
  | 'Active site'
  | 'Binding site'
  | 'Site';

export type SubcellularLocationFeatures =
  | 'Intramembrane'
  | 'Topological domain'
  | 'Transmembrane';

export type ProteinProcessingFeatures =
  | 'Initiator methionine'
  | 'Signal'
  | 'Transit peptide'
  | 'Propeptide'
  | 'Chain'
  | 'Peptide'
  | 'Modified residue'
  | 'Modified residue (large scale)'
  | 'Lipidation'
  | 'Glycosylation'
  | 'Disulfide bond'
  | 'Cross-link';

export type StructureFeatures = 'Helix' | 'Beta strand' | 'Turn';

export type FamilyAndDomainsFeatures =
  | 'Domain'
  | 'Region'
  | 'Repeat'
  | 'Motif'
  | 'Compositional bias';

type OtherType = 'Natural variant' | 'Other'; // For anything else

type FeatureType =
  | OtherType
  | FunctionFeatures
  | SequenceFeatures
  | DiseaseAndDrugsFeatures
  | SubcellularLocationFeatures
  | ProteinProcessingFeatures
  | StructureFeatures
  | FamilyAndDomainsFeatures;

export default FeatureType;
