type OtherType =
  | 'Initiator methionine'
  | 'Signal'
  | 'Propeptide'
  | 'Transit peptide'
  | 'Chain'
  | 'Peptide'
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
  | 'Site'
  | 'Modified residue'
  | 'Lipidation'
  | 'Glycosylation'
  | 'Disulfide bond'
  | 'Cross-link'
  | 'Natural variant'
  | 'Helix'
  | 'Turn'
  | 'Beta strand'
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

type FeatureType =
  | OtherType
  | FunctionFeatures
  | SequenceFeatures
  | DiseaseAndDrugsFeatures
  | SubcellularLocationFeatures;

export default FeatureType;
