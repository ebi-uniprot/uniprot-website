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
  | 'string_match_text'
  | 'string_match_location'
  | 'string_match_type'
  | 'tmalign_accession'
  | 'tmalign_score_chain_1'
  | 'tmalign_score_chain_2'
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
  category: Category;
  evidences?: Evidence[];
  id: string;
  name: string;
};

type Category =
  | 'Domain'
  | 'Ligand'
  | 'Molecular function'
  | 'Cellular component'
  | 'Biological process'
  | 'PTM'
  | 'Technical term'
  | 'Coding sequence diversity';

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
  id: 'CI-FC84BSHK1H4IL';
};

type UniProtKBCrossReference = {
  database: Database;
  evidences?: Evidence[];
  id: string;
  properties: Property[];
};

type Database = 'GO' | 'Pfam';
