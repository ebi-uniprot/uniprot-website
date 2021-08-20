export type Evidence = {
  evidenceCode: `ECO:${number}`;
  source?: string;
  id?: string;
};

export type ValueWithEvidence = {
  value: string;
  evidences?: Evidence[];
};

export enum PropertyKey {
  AllergenName = 'AllergenName',
  Chains = 'Chains',
  Component = 'Component',
  Description = 'Description',
  Disease = 'Disease',
  EntryName = 'EntryName',
  ExpressionPatterns = 'ExpressionPatterns',
  FamilyName = 'FamilyName',
  Fingerprint = 'Fingerprint',
  GeneDesignation = 'GeneDesignation',
  GeneId = 'GeneId',
  GeneName = 'GeneName',
  GenericName = 'GenericName',
  GoEvidenceType = 'GoEvidenceType',
  GoTerm = 'GoTerm',
  Interactions = 'Interactions',
  MatchStatus = 'MatchStatus',
  Method = 'Method',
  MoleculeType = 'MoleculeType',
  NucleotideSequenceId = 'NucleotideSequenceId',
  OrganismId = 'OrganismId',
  OrganismName = 'OrganismName',
  PathwayName = 'PathwayName',
  Project = 'Project',
  ProteinId = 'ProteinId',
  RectionId = 'RectionId',
  Resolution = 'Resolution',
  Status = 'Status',
  ToxinName = 'ToxinName',
  ToxonomicScope = 'ToxonomicScope',
  Type = 'Type',
}

export type Property =
  | {
      key?: PropertyKey;
      value?: string;
    }
  | {
      key: PropertyKey.GoEvidenceType;
      value: GoEvidenceType;
    };

export type GoEvidenceType = `${GoEvidenceCodes}:${string}`; // eg IDA:ARUK-UCL, TAS:Reactome

// Source: https://github.com/ebi-uniprot/uniprot-core/blob/master/core-domain/src/main/java/org/uniprot/core/cv/go/GoEvidenceType.java
export type GoEvidenceCodes =
  | 'EXP' // Inferred from experiment
  | 'HDA' // high throughput direct assay evidence used in manual assertion
  | 'HEP' // high throughput expression pattern evidence used in manual assertion
  | 'HGI' // high throughput genetic interaction evidence used in manual assertion
  | 'HMP' // high throughput mutant phenotype evidence used in manual assertion
  | 'HTP' // high throughput evidence used in manual assertion
  | 'IBA' // inferred from Biological aspect of Ancestor
  | 'IBD' // inferred from Biological aspect of Descendant
  | 'IC' // inferred by curator
  | 'IDA' // inferred from direct assay
  | 'IEA' // inferred from electronic annotation
  | 'IEP' // inferred from expression pattern
  | 'IGC' // inferred from Genomic Context
  | 'IGI' // inferred from genetic interaction
  | 'IKR' // inferred from Key Residues
  | 'IMP' // inferred from mutant phenotype
  | 'IPI' // inferred from physical interaction
  | 'IRD' // inferred from Rapid Divergence
  | 'ISA' // inferred from Sequence Alignment
  | 'ISM' // inferred from Sequence Model
  | 'ISO' // inferred from Sequence Orthology
  | 'ISS' // inferred from sequence or structural similarity
  | 'NAS' // non-traceable author statement
  | 'ND' // no biological data available
  | 'RCA' // inferred from reviewed computational analysis
  | 'TAS'; // traceable author statement
