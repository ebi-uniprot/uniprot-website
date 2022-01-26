import { ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Location, LocationToPath } from '../../app/config/urls';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';

const UniProtKBColumnHeaders: Record<UniProtKBColumn, ReactNode> = {
  [UniProtKBColumn.id]: (
    <>
      Mnemonic identifier of a UniProtKB entry{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'entry_name',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.keyword]: (
    <>
      List of UniProtKB keywords (controlled vocabulary){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'keywords',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.kinetics]: (
    <>
      Description of kinetic data, including the Michaelis-Menten constant (KM)
      and maximal velocity (Vmax){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'biophysicochemical_properties',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.phDependence]: (
    <>
      Optimum pH for protein activity, effect of pH variation and pH stability
      of the protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'biophysicochemical_properties',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.proteinName]: (
    <>
      Name(s) and synonym(s) of the protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'protein_names',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.redoxPotential]: (
    <>
      Value of the standard (midpoint) oxido-reduction potential(s) for electron
      transport proteins{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'biophysicochemical_properties',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.structure3D]: (
    <>
      Experimental method(s) used to obtain 3D structure(s), when available
      (number of PDB cross-references)
    </>
  ),
  [UniProtKBColumn.tempDependence]: (
    <>
      Optimum temperature for enzyme activity and/or effect of temperature
      variation on activity{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'biophysicochemical_properties',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.tools]: (
    <>Links to sequence analysis tools, including Blast, PeptideCutter, etc.</>
  ),
  [UniProtKBColumn.uniparcId]: <>UniParc identifier</>,
  [UniProtKBColumn.proteome]: <>Unique proteome identifier and component</>,
  [UniProtKBColumn.proteomeComponent]: (
    <>Unique proteome identifier(s) and component(s)</>
  ),
  [UniProtKBColumn.absorption]: (
    <>
      Indicates the wavelength at which photoreactive protein shows maximal
      light absorption{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'biophysicochemical_properties',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.annotationScore]: <>Annotation score</>,
  [UniProtKBColumn.fragment]: (
    <>Indicates if the protein sequence is a fragment</>
  ),
  [UniProtKBColumn.ftActSite]: (
    <>
      Amino acid(s) directly involved in the activity of the enzyme{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'act_site',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftBinding]: (
    <>
      Binding site for any chemical group (co-enzyme, prosthetic group, etc.){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'binding',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftCarbohyd]: (
    <>
      Position and description of a covalently attached glycan group(s){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'carbohyd',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftChain]: (
    <>
      Description of the mature polypeptide following processing{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'chain',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftCoiled]: (
    <>
      Positions of region of coiled coil{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'coiled',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftCompbias]: (
    <>
      Region of compositional bias within the protein and description of the
      particular amino acids that are over-represented within this regions{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'compbias',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftConflict]: (
    <>
      Description of sequence discrepancies of unknown origin{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'conflict',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftCrosslnk]: (
    <>
      Residues participating in covalent linkage(s) between proteins{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'crosslnk',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftDisulfid]: (
    <>
      Cysteine residues participating in disulfide bonds{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'disulfid',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftDnaBind]: (
    <>
      Description of the position and type of each DNA-binding domain present
      within the protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'dna_bind',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftDomain]: (
    <>
      Position and type of each modular protein domain{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'domain',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftHelix]: (
    <>
      Positions of the experimentally determined helical region(s){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'helix',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftInitMet]: (
    <>
      Indicates if the initiator methionine is cleaved in the mature protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'init_met',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftIntramem]: (
    <>
      Extent of a region in a membrane, which does not cross it{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'intramem',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftLipid]: (
    <>
      Position and description of a covalently attached lipid group(s){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'lipid',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftMetal]: (
    <>
      Binding site for a metal ion{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'metal',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftModRes]: (
    <>
      Position and description of a post-translational modification (PTM)
      excluding lipids, glycans and protein cross-links{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'mod_res',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftMotif]: (
    <>
      Short (up to 20 amino acids) sequence motif of biological interest{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'motif',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftMutagen]: (
    <>
      Position of the site which has been experimentally altered by mutagenesis
      and description of the associated phenotype{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'mutagen',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftNonCons]: (
    <>
      Indicates that two residues in the sequence are not consecutive{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'non_cons',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftNonStd]: (
    <>
      Occurence of non-standard amino acid (selenocysteine or pyrrolysine) in
      the protein sequence{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'non_std',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftNonTer]: (
    <>
      Indicates that the residue is not terminal as the protein is not complete{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'non_ter',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftPeptide]: (
    <>
      Position and length of the active peptide in the mature protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'peptide',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftPropep]: (
    <>
      Part of the protein that is cleaved during maturation or activation{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'propep',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftRegion]: (
    <>
      Region of interest in the sequence{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'region',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftRepeat]: (
    <>
      Positions and types of repeated sequence motifs or repeated domains within
      the protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'repeat',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftSignal]: (
    <>
      Extent of the sequence targeting proteins to the secretory pathway or
      periplasmic space{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'signal',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftSignal]: (
    <>
      Interesting single amino acid site on the sequence{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'site',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftStrand]: (
    <>
      Positions of the experimentally determined beta strand region(s){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'strand',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftTopoDom]: (
    <>
      Description of the subcellular compartment where each non-membrane region
      of a membrane-spanning protein is found{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'topo_dom',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftTransit]: (
    <>
      Extent of a transit peptide for organelle targeting{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'transit',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftTransmem]: (
    <>
      Description of the extent of a membrane-spanning region of the protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'transmem',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftTurn]: (
    <>
      Positions of the experimentally determined 'Turn' region(s){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'turn',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftUnsure]: (
    <>
      Regions of uncertainty in the sequence{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'unsure',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftVarSeq]: (
    <>
      Amino acid change(s) due to alternative splicing (or other events)
      producing alternate protein isoforms{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'var_seq',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftVariant]: (
    <>
      Description of a natural variant of the protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'variant',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ftZnFing]: (
    <>
      Position(s) and type(s) of zinc fingers within the protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'zn_fing',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccAllergen]: (
    <>
      Information relevant to allergenic proteins{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'allergenic_properties',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccAlternativeProducts]: (
    <>
      Information on the different isoforms encoded by the same gene{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'alternative_products',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccBiotechnology]: (
    <>
      Use of a protein in a biotechnological process{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'biotechnological_use',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccCaution]: (
    <>
      Warning about possible errors and/or grounds for confusion{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'caution',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccDevelopmentalStage]: (
    <>
      Description of expression during the stage of cell, tissue or organism
      development{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'developmental_stage',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccDisease]: (
    <>
      Description of the disease(s) associated with the defect in a protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'involvement_in_disease',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccDisruptionPhenotype]: (
    <>
      Description of the phenotype(s) associated with the experimental
      disruption of the gene{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'disruption_phenotype',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccFunction]: (
    <>
      General description of a protein's function(s){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'function',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccInduction]: (
    <>
      Description of the regulation of gene expression by environmental factors{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'induction',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccMassSpectrometry]: (
    <>
      Information derived from mass spectrometry experiments{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'mass_spectrometry',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccPathway]: (
    <>
      Pathway in which the protein is involved{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'pathway',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccPharmaceutical]: (
    <>
      Use of a protein as a pharmaceutical drug{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'pharmaceutical_use',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccPolymorphism]: (
    <>
      Sequence position-independent description of amino acid polymorphism(s){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'polymorphism',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccPtm]: (
    <>
      Sequence position-independent description of post-translational
      modifications{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'post-translational_modification',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccRnaEditing]: (
    <>
      Description of RNA editing events{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'rna_editing',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccSequenceCaution]: (
    <>
      Warning about possible errors related to a protein sequence{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'sequence_caution',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccSubcellularLocation]: (
    <>
      Description of the subcellular location(s) of the mature protein{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'subcellular_location',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccSubunit]: (
    <>
      Description of protein interaction and quaternary structure{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'subunit_structure',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccTissueSpecificity]: (
    <>
      Description of the expression of a gene in tissues (at the protein and/or
      RNA level){' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'tissue_specificity',
        })}
      >
        more...
      </Link>
    </>
  ),
  [UniProtKBColumn.ccToxicDose]: (
    <>
      Lethal, paralytic, or effect dose, or lethal concentration of a toxin{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'toxic_dose',
        })}
      >
        more...
      </Link>
    </>
  ),
};

export default UniProtKBColumnHeaders;
