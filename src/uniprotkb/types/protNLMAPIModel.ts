import { type UniProtkbAPIModel } from '../adapters/uniProtkbConverter';

export interface UniProtKBProtNLMAPIModel extends UniProtkbAPIModel {
  annotationScore: 0;
  comments?: Comment[];
  entryAudit: EntryAudit;
  entryType: 'UniProtKB unreviewed (TrEMBL)';
  extraAttributes?: ExtraAttributes;
  keywords?: Keyword[];
  primaryAccession: string;
  proteinDescription: ProteinDescription;
  proteinExistence: '5: Uncertain';
  references: Reference[];
  uniProtKBCrossReferences?: UniProtKBCrossReference[];
  uniProtkbId: string;
}

type Comment = {
  commentType: CommentType;
  subcellularLocations?: SubcellularLocation[];
  texts?: FullName[];
};

type CommentType = 'FUNCTION' | 'SUBCELLULAR LOCATION';

type SubcellularLocation = {
  location: FullName;
};

type FullName = {
  evidences?: Evidence[];
  value: string;
};

export const AiEvidenceCode = 'ECO:0008006';

type Evidence = {
  evidenceCode: typeof AiEvidenceCode;
  id: 'ProtNLM2';
  properties: Property[];
  source: 'Google';
};

type Property = {
  key: Key;
  value: null | string;
};

type Key =
  | 'model_score'
  | 'phmmer_accession'
  | 'phmmer_score'
  | 'exact_match_sanitized_to_all_2023_04'
  | 'exact_match_sanitized_to_all_2025_01'
  | 'tmalign_accession'
  | 'tmalign_score_chain_1'
  | 'tmalign_score_chain_2'
  | 'substring_match_sanitized_to_all_2023_04'
  | 'substring_match_sanitized_to_all_2025_01'
  | 'hydrated_substring_match_sanitized_to_all_2023_04'
  | 'hydrated_substring_match_sanitized_to_all_2025_01'
  | 'hydrated_substring_match_sanitized_interpro96'
  | 'GoTerm'
  | 'GoEvidenceType'
  | 'EntryName'
  | 'MatchStatus';

type EntryAudit = {
  entryVersion: 1;
  firstPublicDate: '1111-11-10';
  lastAnnotationUpdateDate: '1111-11-10';
  lastSequenceUpdateDate: '1111-11-10';
  sequenceVersion: 1;
};

type ExtraAttributes = {
  countByCommentType: CountByCommentType;
};

type CountByCommentType = {
  FUNCTION?: number;
  'SUBCELLULAR LOCATION'?: number;
};

type Keyword = {
  category: 'Unknown';
  evidences: Evidence[];
  id: 'ProtNLM2';
  name: string;
};

type ProteinDescription = {
  recommendedName?: Name;
  submissionNames?: Name[];
};

type Name = {
  fullName: FullName;
};

type Reference = {
  citation: Citation;
  referenceNumber: 1;
  referencePositions: 'required field'[];
};

type Citation = {
  citationType: 'unpublished observations';
  id: 'ProtNLM2';
};

type UniProtKBCrossReference = {
  database: Database;
  evidences: Evidence[];
  id: 'ProtNLM2';
  properties: Property[];
};

type Database = 'GO' | 'Pfam';
