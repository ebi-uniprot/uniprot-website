export type Evidence = {
  evidenceCode: string; // TODO this needs to be an ECO instead of string
  source?: string;
  id?: string;
};

export type ValueWithEvidence = {
  value: string;
  evidences: Evidence[];
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

export type Property = {
  key?: PropertyKey;
  value?: string;
};
