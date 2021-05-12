import { Evidence } from './modelTypes';
import { Absorption, KineticParameters } from '../adapters/functionConverter';
import { FeatureData } from '../components/protein-data-views/UniProtKBFeaturesView';
import { Interactant } from '../adapters/interactionConverter';
import { Xref } from '../../shared/types/apiModel';

export type FreeTextType =
  | 'DISRUPTION PHENOTYPE'
  | 'DOMAIN'
  | 'FUNCTION'
  | 'INDUCTION'
  | 'MISCELLANEOUS'
  | 'PATHWAY'
  | 'PTM'
  | 'SIMILARITY'
  | 'SUBUNIT'
  | 'TISSUE SPECIFICITY'
  | 'POLYMORPHISM'
  | 'ACTIVITY REGULATION';

export type CommentType =
  | FreeTextType
  | 'ALLERGEN'
  | 'ALTERNATIVE PRODUCTS'
  | 'BIOPHYSICOCHEMICAL PROPERTIES'
  | 'BIOTECHNOLOGY'
  | 'CATALYTIC ACTIVITY'
  | 'CAUTION'
  | 'COFACTOR'
  | 'DEVELOPMENTAL STAGE'
  | 'DISEASE'
  | 'INTERACTION'
  | 'MASS SPECTROMETRY'
  | 'PHARMACEUTICAL'
  | 'RNA EDITING'
  | 'SEQUENCE CAUTION'
  | 'SUBCELLULAR LOCATION'
  | 'TOXIC DOSE'
  | 'UNKNOWN'
  | 'WEB RESOURCE';

export type TextWithEvidence = {
  value: string;
  evidences?: Evidence[];
  id?: string;
};

export interface GenericComment<T extends CommentType = CommentType> {
  commentType: T;
}

export interface FreeTextComment extends GenericComment<FreeTextType> {
  texts?: TextWithEvidence[];
  molecule?: string;
}

export interface AbsorptionComment
  extends GenericComment<'BIOPHYSICOCHEMICAL PROPERTIES'> {
  absorption?: Absorption;
}

export interface KineticsComment
  extends GenericComment<'BIOPHYSICOCHEMICAL PROPERTIES'> {
  kineticParameters?: KineticParameters;
}

export interface pHDependenceComment
  extends GenericComment<'BIOPHYSICOCHEMICAL PROPERTIES'> {
  phDependence: {
    texts: TextWithEvidence[];
  };
}

export interface RedoxPotentialComment
  extends GenericComment<'BIOPHYSICOCHEMICAL PROPERTIES'> {
  redoxPotential: {
    texts: TextWithEvidence[];
  };
}

export interface TemperatureDependenceComment
  extends GenericComment<'BIOPHYSICOCHEMICAL PROPERTIES'> {
  temperatureDependence: {
    texts: TextWithEvidence[];
  };
}

export enum PhysiologicalReactionDirection {
  LeftToRight = 'left-to-right',
  RightToLeft = 'right-to-left',
}

export type PhysiologicalReaction = {
  directionType: PhysiologicalReactionDirection;
  reactionCrossReference: { database: string; id: string };
  evidences: Evidence[];
};

export interface CatalyticActivityComment
  extends GenericComment<'CATALYTIC ACTIVITY'> {
  reaction?: {
    name: string;
    reactionCrossReferences?: { database: string; id: string }[];
    ecNumber: string;
    evidences?: Evidence[];
  };
  physiologicalReactions?: PhysiologicalReaction[];
}

export type DiseaseType = {
  diseaseId?: string;
  diseaseAccession?: string;
  acronym?: string;
  description?: string;
  diseaseCrossReference?: Xref;
  evidences?: Evidence[];
};

export interface DiseaseComment extends GenericComment<'DISEASE'> {
  disease?: DiseaseType;
  note?: { texts?: { value?: string }[] };
}

export enum InteractionType {
  SELF = 'SELF',
  XENO = 'XENO',
  BINARY = 'BINARY',
  // Are there others?
}

export type Interaction = {
  numberOfExperiments: number;
  type?: InteractionType;
  interactantOne: Interactant;
  interactantTwo: Interactant;
  organismDiffer: boolean;
};

export interface InteractionComment extends GenericComment<'INTERACTION'> {
  interactions: Interaction[];
}

export type Isoform = {
  name: { value: string };
  isoformSequenceStatus: string;
  isoformIds: string[];
  synonyms?: { value: string }[];
  note?: { texts: TextWithEvidence[] };
  sequenceIds?: string[];
  varSeqs?: FeatureData;
};

export interface AlternativeProductsComment
  extends GenericComment<'ALTERNATIVE PRODUCTS'> {
  isoforms: Isoform[];
  note?: { texts: TextWithEvidence[] };
  events: string[];
}

export interface SequenceCautionComment
  extends GenericComment<'SEQUENCE CAUTION'> {
  sequenceCautionType: string;
  sequence: string;
  note?: string;
  evidences?: Evidence[];
}

export interface MassSpectrometryComment
  extends GenericComment<'MASS SPECTROMETRY'> {
  molecule?: string;
  method?: string;
  note?: string;
  molWeight: number;
  molWeightError: number;
  evidences: Evidence[];
}

export interface RNAEditingComment extends GenericComment<'RNA EDITING'> {
  locationType?: string;
  positions: { position: number; evidences: Evidence[] }[];
  note?: { texts: TextWithEvidence[] };
}

export interface SubcellularLocationComment
  extends GenericComment<'SUBCELLULAR LOCATION'> {
  molecule?: string;
  note?: { texts: TextWithEvidence[] };
  subcellularLocations?: {
    location: TextWithEvidence;
    topology?: TextWithEvidence;
    orientation?: TextWithEvidence;
  }[];
}

export interface WebResourceComment extends GenericComment<'WEB RESOURCE'> {
  note?: string;
  resourceName: string;
  resourceUrl: string;
  ftp?: boolean;
}

export interface CofactorComment extends GenericComment<'COFACTOR'> {
  cofactors?: {
    name: string;
    evidences?: Evidence[];
    cofactorCrossReference?: Xref;
  }[];
  note: {
    texts: TextWithEvidence[];
  };
}

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
