import FeatureType from '../../uniprotkb/types/featureType';

const FeatureTypeHelpMappings: Omit<Record<FeatureType, string>, 'Other'> = {
  'Compositional bias': 'compbias',
  'Non-standard residue': 'non_std',
  'Sequence uncertainty': 'unsure',
  'Sequence conflict': 'conflict',
  'Non-adjacent residues': 'non_cons',
  'Non-terminal residue': 'non_ter',
  'Alternative sequence': 'var_seq',
  Mutagenesis: 'mutagen',
  Domain: 'domain',
  Repeat: 'repeat',
  'Zinc finger': 'zn_fing',
  'DNA binding': 'dna_bind',
  Region: 'region',
  'Coiled coil': 'coiled',
  Motif: 'motif',
  'Active site': 'act_site',
  'Binding site': 'binding',
  Site: 'site',
  Intramembrane: 'intramem',
  'Topological domain': 'topo_dom',
  Transmembrane: 'transmem',
  'Initiator methionine': 'init_met',
  Signal: 'signal',
  'Transit peptide': 'transit',
  Propeptide: 'propep',
  Chain: 'chain',
  Peptide: 'peptide',
  'Modified residue': 'mod_res',
  'Modified residue (large scale)': 'mod_res_large_scale', // TODO: confirm help page
  Lipidation: 'lipid',
  Glycosylation: 'carbohyd',
  'Disulfide bond': 'disulfid',
  'Cross-link': 'crosslnk',
  Helix: 'helix',
  'Beta strand': 'strand',
  Turn: 'turn',
  'Natural variant': 'variant',
};

export default FeatureTypeHelpMappings;
