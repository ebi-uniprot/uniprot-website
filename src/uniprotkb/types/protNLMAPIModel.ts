import {
  type UniProtkbAPIModel,
  type UniProtKBXref,
} from '../adapters/uniProtkbConverter';
import { type Keyword as SharedKeyword } from '../utils/KeywordsUtil';
import {
  type FreeTextComment,
  type SubcellularLocationComment,
} from './commentTypes';
import { type Evidence as SharedEvidence } from './modelTypes';

export const aiEvidenceCode = 'ECO:0008006';
export const protNLM2Id = 'ProtNLM2';
export const protNLM2Evidence = `IEA:${protNLM2Id}`;

type EvidenceKey =
  | 'model_score'
  | 'phmmer_accession'
  | 'phmmer_score'
  | 'string_match_text'
  | 'string_match_location'
  | 'string_match_type' // possible values should be: substring/hydrated substring/exact
  | 'tmalign_accession'
  | 'tmalign_score_chain_1'
  | 'tmalign_score_chain_2';

export type EvidenceProperty = {
  key: EvidenceKey;
  value: null | string;
};

// Intersection with the shared Evidence keeps ProtNlmEvidence structurally
// assignable to it — no `as unknown` casts needed when merging into shared
// arrays in protnlmConverter.
export type ProtNlmEvidence = SharedEvidence & {
  evidenceCode: typeof aiEvidenceCode;
  id: typeof protNLM2Id;
  properties: EvidenceProperty[];
  source: 'Google';
};

type FullName = {
  evidences?: ProtNlmEvidence[];
  value: string;
};

export type ProtNlmFunctionComment = FreeTextComment & {
  commentType: 'FUNCTION';
  texts?: FullName[];
};

export type ProtNlmSubcellularLocationComment = SubcellularLocationComment & {
  subcellularLocations?: Array<{ location: FullName }>;
};

export type ProtNlmComment =
  | ProtNlmFunctionComment
  | ProtNlmSubcellularLocationComment;

type Category =
  | 'Biological process'
  | 'Cellular component'
  | 'Coding sequence diversity'
  | 'Domain'
  | 'Ligand'
  | 'Molecular function'
  | 'PTM'
  | 'Technical term';

export type ProtNlmKeyword = SharedKeyword & {
  category: Category;
  evidences?: ProtNlmEvidence[];
  id: string;
  name: string;
};

type Database = 'GO' | 'Pfam';

type UniProtKBCrossReferenceProperty = {
  key: 'EntryName' | 'GoEvidenceType' | 'GoTerm' | 'MatchStatus';
  value: null | string;
};

export type ProtNlmCrossReference = Omit<
  UniProtKBXref,
  'database' | 'evidences' | 'id' | 'properties'
> & {
  database: Database;
  evidences?: ProtNlmEvidence[];
  id: string;
  properties: UniProtKBCrossReferenceProperty[];
};

type EntryAudit = {
  entryVersion: 1;
  firstPublicDate: '1111-11-10';
  lastAnnotationUpdateDate: '1111-11-10';
  lastSequenceUpdateDate: '1111-11-10';
  sequenceVersion: 1;
};

type ExtraAttributes = {
  countByCommentType: {
    FUNCTION?: number;
    'SUBCELLULAR LOCATION'?: number;
  };
};

type Name = {
  fullName: FullName;
};

type ProteinDescription = {
  recommendedName?: Name;
  submissionNames?: Name[];
};

type Reference = {
  citation: {
    citationType: 'unpublished observations';
    id: 'CI-FC84BSHK1H4IL';
  };
  referenceNumber: 1;
  referencePositions: 'required field'[];
};

// `Omit<UniProtkbAPIModel, …> & { … }` rather than `extends` so the
// narrower fields *replace* the broad parent fields instead of trying to
// covariantly narrow them — `interface … extends` would force the casts
// in protnlmConverter.ts because the locally narrower property types
// aren't valid overrides of the broad shared ones.
export type UniProtKBProtNLMAPIModel = Omit<
  UniProtkbAPIModel,
  | 'annotationScore'
  | 'comments'
  | 'entryAudit'
  | 'entryType'
  | 'extraAttributes'
  | 'keywords'
  | 'proteinDescription'
  | 'proteinExistence'
  | 'references'
  | 'uniProtKBCrossReferences'
> & {
  annotationScore: 0;
  comments?: ProtNlmComment[];
  entryAudit: EntryAudit;
  entryType: 'UniProtKB unreviewed (TrEMBL)';
  extraAttributes?: ExtraAttributes;
  keywords?: ProtNlmKeyword[];
  proteinDescription: ProteinDescription;
  proteinExistence: '5: Uncertain';
  references: Reference[];
  uniProtKBCrossReferences?: ProtNlmCrossReference[];
};
