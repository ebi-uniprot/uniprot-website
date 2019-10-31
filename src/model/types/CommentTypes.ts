import { Evidence, Property } from './modelTypes';

export enum CommentType {
  ACTIVITY_REGULATION = 'ACTIVITY REGULATION',
  ALLERGEN = 'ALLERGEN',
  ALTERNATIVE_PRODUCTS = 'ALTERNATIVE PRODUCTS',
  BIOPHYSICOCHEMICAL_PROPERTIES = 'BIOPHYSICOCHEMICAL PROPERTIES',
  BIOTECHNOLOGY = 'BIOTECHNOLOGY',
  CATALYTIC_ACTIVITY = 'CATALYTIC ACTIVITY',
  CAUTION = 'CAUTION',
  COFACTOR = 'COFACTOR',
  DEVELOPMENTAL_STAGE = 'DEVELOPMENTAL STAGE',
  DISEASE = 'DISEASE',
  DISRUPTION_PHENOTYPE = 'DISRUPTION PHENOTYPE',
  DOMAIN = 'DOMAIN',
  FUNCTION = 'FUNCTION',
  INDUCTION = 'INDUCTION',
  INTERACTION = 'INTERACTION',
  MASS_SPECTROMETRY = 'MASS SPECTROMETRY',
  MISCELLANEOUS = 'MISCELLANEOUS',
  PATHWAY = 'PATHWAY',
  PHARMACEUTICAL = 'PHARMACEUTICAL',
  POLYMORPHISM = 'POLYMORPHISM',
  PTM = 'PTM',
  RNA_EDITING = 'RNA EDITING',
  SEQUENCE_CAUTION = 'SEQUENCE CAUTION',
  SIMILARITY = 'SIMILARITY',
  SUBCELLULAR_LOCATION = 'SUBCELLULAR LOCATION',
  SUBUNIT = 'SUBUNIT',
  TISSUE_SPECIFICITY = 'TISSUE SPECIFICITY',
  TOXIC_DOSE = 'TOXIC DOSE',
  UNKNOWN = 'UNKNOWN',
  WEBRESOURCE = 'WEB RESOURCE',
}
export type FreeTextType =
  | CommentType.DISRUPTION_PHENOTYPE
  | CommentType.DOMAIN
  | CommentType.FUNCTION
  | CommentType.INDUCTION
  | CommentType.MISCELLANEOUS
  | CommentType.PATHWAY
  | CommentType.PTM
  | CommentType.SIMILARITY
  | CommentType.SUBUNIT
  | CommentType.TISSUE_SPECIFICITY;

export type FreeText = {
  commentType: FreeTextType;
  texts?: [{ value: string; evidences: Evidence[] }];
};

export type CatalyticActivity = {
  commentType: CommentType.CATALYTIC_ACTIVITY;
  reaction?: {
    name: string;
    reactionReferences: { databaseType: string; id: string }[];
    ecNumber: string;
    evidences?: Evidence[];
  };
  physiologicalReactions?: PhysiologicalReaction[];
};

export enum PhysiologicalReactionDirection {
  LeftToRight = 'left-to-right',
  RightToLeft = 'right-to-left',
}

export type PhysiologicalReaction = {
  directionType: PhysiologicalReactionDirection;
  reactionReference: { databaseType: string; id: string };
  evidences: Evidence[];
};

export type Xref = {
  databaseType?: string;
  id?: string;
  properties?: [Property];
  isoformId?: string;
};

export type DiseaseType = {
  diseaseId?: string;
  diseaseAccession?: string;
  acronym?: string;
  description?: string;
  reference?: Xref;
  evidences?: Evidence[];
};

export type DiseaseComment = {
  commentType: CommentType.DISEASE;
  disease?: DiseaseType;
  note?: { texts?: { value?: string }[] };
};

enum InteractionType {
  SELF = 'SELF',
  XENO = 'XENO',
  BINARY = 'BINARY',
  // Are there others?
}

export type Interaction = {
  firstInteractor: string;
  numberOfExperiments: number;
  secondInteractor: string;
  type: InteractionType;
  geneName?: string;
  uniProtAccession?: string;
};

export type InteractionComment = {
  commentType: CommentType.INTERACTION;
  interactions: Interaction[];
};

export type Isoform = {
  name: { value: string };
  isoformSequenceStatus: string;
  isoformIds: string[];
  synonyms: { value: string }[];
  note: { texts: { value: string }[] };
  sequenceIds: string[];
};

export type AlternativeProducts = {
  commentType: CommentType.ALTERNATIVE_PRODUCTS;
  isoforms: Isoform[];
  note: { texts: { value: string }[] };
  events: string[];
};

export type SequenceCaution = {
  commentType: CommentType.SEQUENCE_CAUTION;
  sequenceCautionType: string;
  sequence: string;
  note?: string;
  evidences?: Evidence[];
};

export type SubcellularLocation = {
  commentType: CommentType.SUBCELLULAR_LOCATION;
  locations: (
    | { location: { value: string; evidences: Evidence[] } }
    | { topology: { value: string; evidences: Evidence[] } })[];
};

type Comment =
  | FreeText
  | CatalyticActivity
  | DiseaseComment
  | InteractionComment
  | AlternativeProducts
  | SequenceCaution
  | SubcellularLocation;

export default Comment;
