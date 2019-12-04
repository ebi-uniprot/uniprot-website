import { Evidence, Property } from './modelTypes';
import {
  Absorption,
  KineticParameters,
} from '../uniprotkb/sections/FunctionConverter';

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
  | CommentType.TISSUE_SPECIFICITY
  | CommentType.POLYMORPHISM;

export type TextWithEvidence = { value: string; evidences: Evidence[] };

export type FreeTextComment = {
  commentType: FreeTextType;
  texts?: TextWithEvidence[];
};

export type AbsorptionComment = {
  commentType: CommentType.BIOPHYSICOCHEMICAL_PROPERTIES;
  absorption?: Absorption;
};

export type KineticsComment = {
  commentType: CommentType.BIOPHYSICOCHEMICAL_PROPERTIES;
  kineticParameters?: KineticParameters;
};

export type pHDependenceComment = {
  commentType: CommentType.BIOPHYSICOCHEMICAL_PROPERTIES;
  phDependence: {
    texts: TextWithEvidence[];
  };
};

export type RedoxPotentialComment = {
  commentType: CommentType.BIOPHYSICOCHEMICAL_PROPERTIES;
  redoxPotential: {
    texts: TextWithEvidence[];
  };
};

export type TemperatureDependenceComment = {
  commentType: CommentType.BIOPHYSICOCHEMICAL_PROPERTIES;
  temperatureDependence: {
    texts: TextWithEvidence[];
  };
};

export type CatalyticActivityComment = {
  commentType: CommentType.CATALYTIC_ACTIVITY;
  reaction?: {
    name: string;
    reactionReferences?: { databaseType: string; id: string }[];
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
  note?: { texts: TextWithEvidence[] };
  sequenceIds: string[];
};

export type AlternativeProductsComment = {
  commentType: CommentType.ALTERNATIVE_PRODUCTS;
  isoforms: Isoform[];
  note?: { texts: TextWithEvidence[] };
  events: string[];
};

export type SequenceCautionComment = {
  commentType: CommentType.SEQUENCE_CAUTION;
  sequenceCautionType: string;
  sequence: string;
  note?: string;
  evidences?: Evidence[];
};

export type MassSpectrometryComment = {
  commentType: CommentType.MASS_SPECTROMETRY;
  method?: string;
  note?: string;
  molWeight: number;
  molWeightError: number;
  ranges: Range[];
  evidences: Evidence[];
};

export type RNAEditingComment = {
  commentType: CommentType.RNA_EDITING;
  locationType?: string;
  positions: { position: number; evidences: Evidence[] }[];
  note?: {
    texts: {
      value: string;
      evidences?: Evidence[];
    }[];
  };
};

export type SubcellularLocationComment = {
  commentType: CommentType.SUBCELLULAR_LOCATION;
  locations: (
    | { location: TextWithEvidence }
    | { topology: TextWithEvidence }
  )[];
};

export type Range = {
  range: {
    start: {
      value: number;
      modifier?: string;
    };
    end: {
      value: number;
      modifier?: string;
    };
  };
};

type Comment =
  | FreeTextComment
  | CatalyticActivityComment
  | DiseaseComment
  | InteractionComment
  | AlternativeProductsComment
  | SequenceCautionComment
  | SubcellularLocationComment
  | MassSpectrometryComment
  | RNAEditingComment
  | AbsorptionComment
  | KineticsComment
  | pHDependenceComment
  | RedoxPotentialComment
  | TemperatureDependenceComment;

export default Comment;
