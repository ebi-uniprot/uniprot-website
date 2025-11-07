export type UniProtKBProtNLMAPIModel = {
  annotationScore: number;
  comments?: Comment[];
  entryAudit: EntryAudit;
  entryType: EntryType;
  extraAttributes?: ExtraAttributes;
  keywords?: Keyword[];
  primaryAccession: string;
  proteinDescription: ProteinDescription;
  proteinExistence: ProteinExistence;
  references: Reference[];
  uniProtKBCrossReferences?: UniProtKBCrossReference[];
  uniProtkbId: string;
};

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

type Evidence = {
  evidenceCode: EvidenceCode;
  id: Evidenceid;
  properties: Property[];
  source: Source;
};

type EvidenceCode = 'ECO:0008006';

type Evidenceid = 'ProtNLM2';

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

type Source = 'Google';

type EntryAudit = {
  entryVersion: number;
  firstPublicDate: Date;
  lastAnnotationUpdateDate: Date;
  lastSequenceUpdateDate: Date;
  sequenceVersion: number;
};

type EntryType = 'UniProtKB unreviewed (TrEMBL)';

type ExtraAttributes = {
  countByCommentType: CountByCommentType;
};

type CountByCommentType = {
  FUNCTION?: number;
  'SUBCELLULAR LOCATION'?: number;
};

type Keyword = {
  category: Category;
  evidences: Evidence[];
  id: string;
  name: string;
};

type Category = 'Unknown';

type ProteinDescription = {
  recommendedName?: Name;
  submissionNames?: Name[];
};

type Name = {
  fullName: FullName;
};

type ProteinExistence = '5: Uncertain';

type Reference = {
  citation: Citation;
  referenceNumber: number;
  referencePositions: ReferencePosition[];
};

type Citation = {
  citationType: CitationType;
  id: Citationid;
};

type CitationType = 'unpublished observations';

type Citationid = 'CI-FC84BSHK1H4IL';

type ReferencePosition = 'required field';

type UniProtKBCrossReference = {
  database: Database;
  evidences: Evidence[];
  id: string;
  properties: Property[];
};

type Database = 'GO' | 'Pfam';
