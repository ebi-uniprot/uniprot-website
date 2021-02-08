enum FeatureType {
  INIT_MET = 'Initiator methionine',
  SIGNAL = 'Signal',
  PROPEP = 'Propeptide',
  TRANSIT = 'Transit peptide',
  CHAIN = 'Chain',
  PEPTIDE = 'Peptide',
  TOPO_DOM = 'Topological domain',
  TRANSMEM = 'Transmembrane',
  INTRAMEM = 'Intramembrane',
  DOMAIN = 'Domain',
  REPEAT = 'Repeat',
  CA_BIND = 'Calcium binding',
  ZN_FING = 'Zinc finger',
  DNA_BIND = 'DNA binding',
  NP_BINDL = 'Nucleotide binding',
  REGION = 'Region',
  COILED = 'Coiled coil',
  MOTIF = 'Motif',
  COMPBIAS = 'Compositional bias',
  ACT_SITE = 'Active site',
  METAL = 'Metal binding',
  BINDING = 'Binding site',
  SITE = 'Site',
  NON_STD = 'Non-standard residue',
  MOD_RES = 'Modified residue',
  LIPID = 'Lipidation',
  CARBOHYD = 'Glycosylation',
  DISULFID = 'Disulfide bond',
  CROSSLNK = 'Cross-link',
  VAR_SEQ = 'Alternative sequence',
  VARIANT = 'Natural variant',
  MUTAGEN = 'Mutagenesis',
  UNSURE = 'Sequence uncertainty',
  CONFLICT = 'Sequence conflict',
  NON_CONS = 'Non-adjacent residues',
  NON_TER = 'Non-terminal residue',
  HELIX = 'Helix',
  TURN = 'Turn',
  STRAND = 'Beta strand',
}

export default FeatureType;
