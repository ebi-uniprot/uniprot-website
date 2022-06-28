import getLabelAndTooltip from '../../shared/utils/getLabelAndTooltip';
import * as logging from '../../shared/utils/logging';

import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';

const featureColumnHeaders: Partial<
  Record<UniProtKBColumn, { tooltip: string; articleId: string }>
> = {
  [UniProtKBColumn.ftActSite]: {
    tooltip: 'Amino acid(s) directly involved in the activity of the enzyme',
    articleId: 'act_site',
  },

  [UniProtKBColumn.ftBinding]: {
    tooltip:
      'Binding site for any chemical group (co-enzyme, prosthetic group, etc.)',
    articleId: 'binding',
  },

  [UniProtKBColumn.ftCaBind]: {
    tooltip: 'The position(s) of calcium binding region(s) within the protein',
    articleId: 'ca_bind',
  },

  [UniProtKBColumn.ftCarbohyd]: {
    tooltip:
      'Position and description of a covalently attached glycan group(s)',
    articleId: 'carbohyd',
  },

  [UniProtKBColumn.ftChain]: {
    tooltip: 'Description of the mature polypeptide following processing',
    articleId: 'chain',
  },

  [UniProtKBColumn.ftCoiled]: {
    tooltip: 'Positions of region of coiled coil',
    articleId: 'coiled',
  },

  [UniProtKBColumn.ftCompbias]: {
    tooltip:
      'Region of compositional bias within the protein and description of the particular amino acids that are over-represented within this regions',
    articleId: 'compbias',
  },

  [UniProtKBColumn.ftConflict]: {
    tooltip: 'Description of sequence discrepancies of unknown origin',
    articleId: 'conflict',
  },

  [UniProtKBColumn.ftCrosslnk]: {
    tooltip: 'Residues participating in covalent linkage(s) between proteins',
    articleId: 'crosslink',
  },

  [UniProtKBColumn.ftDisulfid]: {
    tooltip: 'Cysteine residues participating in disulfide bonds',
    articleId: 'disulfid',
  },

  [UniProtKBColumn.ftDnaBind]: {
    tooltip:
      'Description of the position and type of each DNA-binding domain present within the protein',
    articleId: 'dna_bind',
  },

  [UniProtKBColumn.ftDomain]: {
    tooltip: 'Position and type of each modular protein domain',
    articleId: 'domain',
  },

  [UniProtKBColumn.ftHelix]: {
    tooltip: 'Positions of the experimentally determined helical region(s)',
    articleId: 'helix',
  },

  [UniProtKBColumn.ftInitMet]: {
    tooltip:
      'Indicates if the initiator methionine is cleaved in the mature protein',
    articleId: 'init_met',
  },

  [UniProtKBColumn.ftIntramem]: {
    tooltip: 'Extent of a region in a membrane, which does not cross it',
    articleId: 'intramem',
  },

  [UniProtKBColumn.ftLipid]: {
    tooltip: 'Position and description of a covalently attached lipid group(s)',
    articleId: 'lipid',
  },

  [UniProtKBColumn.ftMetal]: {
    tooltip: 'Binding site for a metal ion',
    articleId: 'metal',
  },

  [UniProtKBColumn.ftModRes]: {
    tooltip:
      'Position and description of a post-translational modification (PTM) excluding lipids, glycans and protein cross-links',
    articleId: 'mod_res',
  },

  [UniProtKBColumn.ftMotif]: {
    tooltip:
      'Short (up to 20 amino acids) sequence motif of biological interest',
    articleId: 'motif',
  },

  [UniProtKBColumn.ftMutagen]: {
    tooltip:
      'Position of the site which has been experimentally altered by mutagenesis and description of the associated phenotype',
    articleId: 'mutagen',
  },

  [UniProtKBColumn.ftNonCons]: {
    tooltip: 'Indicates that two residues in the sequence are not consecutive',
    articleId: 'non_cons',
  },

  [UniProtKBColumn.ftNpBind]: {
    tooltip: 'Region in the protein which binds nucleotide phosphates',
    articleId: 'np_bind',
  },

  [UniProtKBColumn.ftNonStd]: {
    tooltip:
      'Occurence of non-standard amino acid (selenocysteine or pyrrolysine) in the protein sequence',
    articleId: 'non_std',
  },

  [UniProtKBColumn.ftNonTer]: {
    tooltip:
      'Indicates that the residue is not terminal as the protein is not complete',
    articleId: 'non_ter',
  },

  [UniProtKBColumn.ftPeptide]: {
    tooltip: 'Position and length of the active peptide in the mature protein',
    articleId: 'peptide',
  },

  [UniProtKBColumn.ftPropep]: {
    tooltip:
      'Part of the protein that is cleaved during maturation or activation',
    articleId: 'propep',
  },

  [UniProtKBColumn.ftRegion]: {
    tooltip: 'Region of interest in the sequence',
    articleId: 'region',
  },

  [UniProtKBColumn.ftRepeat]: {
    tooltip:
      'Positions and types of repeated sequence motifs or repeated domains within the protein',
    articleId: 'repeat',
  },

  [UniProtKBColumn.ftSignal]: {
    tooltip:
      'Extent of the sequence targeting proteins to the secretory pathway or periplasmic space',
    articleId: 'signal',
  },

  [UniProtKBColumn.ftSite]: {
    tooltip: 'Interesting single amino acid site on the sequence',
    articleId: 'site',
  },

  [UniProtKBColumn.ftStrand]: {
    tooltip: 'Positions of the experimentally determined beta strand region(s)',
    articleId: 'strand',
  },

  [UniProtKBColumn.ftTopoDom]: {
    tooltip:
      'Description of the subcellular compartment where each non-membrane region of a membrane-spanning protein is found',
    articleId: 'topo_dom',
  },

  [UniProtKBColumn.ftTransit]: {
    tooltip: 'Extent of a transit peptide for organelle targeting',
    articleId: 'transit',
  },

  [UniProtKBColumn.ftTransmem]: {
    tooltip:
      'Description of the extent of a membrane-spanning region of the protein',
    articleId: 'transmem',
  },

  [UniProtKBColumn.ftTurn]: {
    tooltip:
      'Positions of the experimentally determined &apos;Turn&apos; region(s)',
    articleId: 'turn',
  },

  [UniProtKBColumn.ftUnsure]: {
    tooltip: 'Regions of uncertainty in the sequence',
    articleId: 'unsure',
  },

  [UniProtKBColumn.ftVarSeq]: {
    tooltip:
      'Amino acid change(s) due to alternative splicing (or other events) producing alternate protein isoforms',
    articleId: 'var_seq',
  },

  [UniProtKBColumn.ftVariant]: {
    tooltip: 'Description of a natural variant of the protein',
    articleId: 'variant',
  },

  [UniProtKBColumn.ftZnFing]: {
    tooltip: 'Position(s) and type(s) of zinc fingers within the protein',
    articleId: 'zn_fing',
  },
};

const getFeatureLabelAndTooltip = (
  label: string,
  featureColumn: UniProtKBColumn
) => {
  const header = featureColumnHeaders[featureColumn];
  if (header) {
    return getLabelAndTooltip(label, header.tooltip, header.articleId);
  }
  logging.warn(
    `No feature label information found for column: ${featureColumn}`
  );
  return { label };
};

export default getFeatureLabelAndTooltip;
