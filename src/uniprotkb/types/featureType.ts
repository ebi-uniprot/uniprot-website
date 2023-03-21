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
  | 'DNA binding'
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
  | 'Compositional bias'
  | 'Zinc finger'
  | 'Coiled coil';

type OtherType =
  | 'Natural variant'
  | 'Modified residue (large scale data)'
  | 'Other'; // For anything else

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
