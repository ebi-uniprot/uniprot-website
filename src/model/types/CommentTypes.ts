import { Evidence } from './modelTypes';
import {
  Absorption,
  KineticParameters,
  CofactorComment,
} from '../uniprotkb/sections/FunctionConverter';
import { FeatureData } from '../../view/uniprotkb/components/FeaturesView';
import { Interactant } from '../uniprotkb/sections/InteractionConverter';

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
  WEB_RESOURCE = 'WEB RESOURCE',
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

export type TextWithEvidence = {
  value: string;
  evidences?: Evidence[];
  id: string;
};

export type FreeTextComment = {
  commentType: FreeTextType;
  texts?: TextWithEvidence[];
  molecule?: string;
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
    reactionCrossReferences?: { database: string; id: string }[];
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
  reactionCrossReference: { database: string; id: string };
  evidences: Evidence[];
};

export type Xref = {
  database?: string;
  id?: string;
  properties?: { [key: string]: string };
  additionalIds?: string[];
  isoformId?: string;
  implicit?: true;
};

export type DiseaseType = {
  diseaseId?: string;
  diseaseAccession?: string;
  acronym?: string;
  description?: string;
  diseaseCrossReference?: Xref;
  evidences?: Evidence[];
};

export type DiseaseComment = {
  commentType: CommentType.DISEASE;
  disease?: DiseaseType;
  note?: { texts?: { value?: string }[] };
};

export enum InteractionType {
  SELF = 'SELF',
  XENO = 'XENO',
  BINARY = 'BINARY',
  // Are there others?
}

export type Interaction = {
  numberOfExperiments: number;
  type: InteractionType;
  interactantOne: Interactant;
  interactantTwo: Interactant;
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
  varSeqs: FeatureData;
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
  molecule?: string;
  method?: string;
  note?: string;
  molWeight: number;
  molWeightError: number;
  evidences: Evidence[];
};

export type RNAEditingComment = {
  commentType: CommentType.RNA_EDITING;
  locationType?: string;
  positions: { position: number; evidences: Evidence[] }[];
  note?: { texts: TextWithEvidence[] };
};

export type SubcellularLocationComment = {
  commentType: CommentType.SUBCELLULAR_LOCATION;
  molecule?: string;
  note?: { texts: TextWithEvidence[] };
  subcellularLocations?: {
    location: TextWithEvidence;
    topology?: TextWithEvidence;
    orientation?: TextWithEvidence;
  }[];
};

export type WebResourceComment = {
  commentType: CommentType.WEB_RESOURCE;
  note?: string;
  resourceName: string;
  resourceUrl: string;
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
  | CofactorComment
  | pHDependenceComment
  | RedoxPotentialComment
  | TemperatureDependenceComment
  | SubcellularLocationComment
  | WebResourceComment;

export default Comment;
