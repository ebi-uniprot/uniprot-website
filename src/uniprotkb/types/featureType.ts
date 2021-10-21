type OtherType =
  | 'Calcium binding'
  | 'Zinc finger'
  | 'DNA binding'
  | 'Nucleotide binding'
  | 'Coiled coil'
  | 'Active site'
  | 'Metal binding'
  | 'Binding site'
  | 'Site'
  | 'Natural variant'
  | 'Other'; // For anything else

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
  | 'Calcium binding'
  | 'Zinc finger'
  | 'DNA binding'
  | 'Nucleotide binding'
  | 'Region'
  | 'Coiled coil'
  | 'Motif'
  | 'Active site'
  | 'Metal binding'
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
  | 'Compositional bias';

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
