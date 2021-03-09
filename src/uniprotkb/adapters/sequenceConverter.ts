import { groupBy } from 'lodash-es';
import { FeatureData } from '../components/protein-data-views/UniProtKBFeaturesView';
import {
  getKeywordsForCategories,
  KeywordUIModel,
} from '../utils/KeywordsUtil';
import KeywordCategory from '../types/keywordCategory';
import FeatureType from '../types/featureType';
import {
  getXrefsForSection,
  XrefUIModel,
  getJoinedXrefs,
} from '../utils/xrefUtils';
import EntrySection from '../types/entrySection';
import { SequenceData } from '../../shared/components/entry/SequenceView';
import {
  CommentType,
  AlternativeProductsComment,
  SequenceCautionComment,
  MassSpectrometryComment,
  FreeTextComment,
  RNAEditingComment,
} from '../types/commentTypes';
import { UniProtkbAPIModel } from './uniProtkbConverter';

export enum Flag {
  PRECURSOR = 'Precursor',
  FRAGMENT = 'Fragment',
  FRAGMENTS = 'Fragments',
  FRAGMENT_PRECURSOR = 'Fragment,Precursor',
  FRAGMENTS_PRECURSOR = 'Fragments,Precursor',
}

export type EntryAudit = {
  firstPublicDate: string;
  lastAnnotationUpdateDate: string;
  lastSequenceUpdateDate: string;
  entryVersion: number;
  sequenceVersion: number;
};

export type IsoformNotes = { [key: string]: FreeTextComment[] };

export type SequenceUIModel = {
  sequence: SequenceData;
  flag?: Flag;
  status?: string;
  processing?: string;
  keywordData?: KeywordUIModel[];
  alternativeProducts?: AlternativeProductsComment;
  sequenceCaution?: SequenceCautionComment[];
  massSpectrometry?: MassSpectrometryComment[];
  polymorphysm?: FreeTextComment[];
  rnaEditing?: RNAEditingComment[];
  featuresData?: FeatureData;
  xrefData?: XrefUIModel[];
  lastUpdateDate?: string;
  entryAudit?: EntryAudit;
  molWeight?: number;
  isoformNotes?: IsoformNotes;
};

const keywordsCategories = [
  KeywordCategory.CODING_SEQUENCE_DIVERSITY,
  KeywordCategory.TECHNICAL_TERM,
];

const featuresCategories = [
  FeatureType.COMPBIAS,
  FeatureType.NON_STD,
  FeatureType.UNSURE,
  FeatureType.CONFLICT,
  FeatureType.NON_CONS,
  FeatureType.NON_TER,
  FeatureType.VAR_SEQ,
];

export const convertSequence = (data: UniProtkbAPIModel) => {
  const sequenceData: SequenceUIModel = {
    sequence: data.sequence,
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };

  if (data.sequence) {
    sequenceData.molWeight = data.sequence.molWeight;
  }

  // Deal with flags
  if (data.proteinDescription && data.proteinDescription.flag) {
    sequenceData.flag = data.proteinDescription.flag;

    sequenceData.status = [
      Flag.FRAGMENT,
      Flag.FRAGMENTS,
      Flag.FRAGMENTS_PRECURSOR,
      Flag.FRAGMENT_PRECURSOR,
    ].includes(data.proteinDescription.flag)
      ? data.proteinDescription.flag
      : 'Complete';

    sequenceData.processing = [
      Flag.PRECURSOR,
      Flag.FRAGMENTS_PRECURSOR,
      Flag.FRAGMENT_PRECURSOR,
    ].includes(data.proteinDescription.flag)
      ? 'The displayed sequence is further processed into a mature form.'
      : undefined;
  }

  // Add the last update
  if (data.entryAudit) {
    sequenceData.lastUpdateDate = `${data.entryAudit.lastSequenceUpdateDate} v${data.entryAudit.sequenceVersion}`;
    sequenceData.entryAudit = data.entryAudit;
  }

  // Trembl entries only have a canonical sequence
  if (data.comments) {
    const alternativeProducts = data.comments.find(
      (comment) => comment.commentType === CommentType.ALTERNATIVE_PRODUCTS
    );
    sequenceData.alternativeProducts = alternativeProducts as AlternativeProductsComment;
    const sequenceCaution = data.comments.filter(
      (comment) => comment.commentType === CommentType.SEQUENCE_CAUTION
    );
    sequenceData.sequenceCaution = sequenceCaution as SequenceCautionComment[];
    const massSpec = data.comments.filter(
      (comment) => comment.commentType === CommentType.MASS_SPECTROMETRY
    );
    sequenceData.massSpectrometry = massSpec as MassSpectrometryComment[];
    const polymorphysm = data.comments.filter(
      (comment) => comment.commentType === CommentType.POLYMORPHISM
    );
    sequenceData.polymorphysm = polymorphysm as FreeTextComment[];
    const rnaEditing = data.comments.filter(
      (comment) => comment.commentType === CommentType.RNA_EDITING
    );
    sequenceData.rnaEditing = rnaEditing as RNAEditingComment[];

    // Retrieve notes for isoforms
    const notes = data.comments.filter(
      (comment) =>
        comment.commentType === CommentType.MISCELLANEOUS &&
        (comment as FreeTextComment).molecule
    ) as FreeTextComment[];
    sequenceData.isoformNotes = groupBy(notes, (note) => note.molecule);
  }

  if (data.keywords) {
    const categoryKeywords = getKeywordsForCategories(
      data.keywords,
      keywordsCategories
    );
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      sequenceData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter((feature) =>
      featuresCategories.includes(feature.type)
    );
    sequenceData.featuresData = features;
    // Add VAR_SEQ to corresponding isoforms
    if (features && sequenceData.alternativeProducts) {
      const varSeqs = features.filter(
        (feature) => feature.type === FeatureType.VAR_SEQ
      );
      sequenceData.alternativeProducts.isoforms = sequenceData.alternativeProducts.isoforms.map(
        (isoform) => {
          const varSeqsToAdd: FeatureData = [];
          if (isoform.sequenceIds && varSeqs.length !== 0) {
            isoform.sequenceIds.forEach((sequenceId) => {
              const varSeqToAdd = varSeqs.find(
                (varSeq) => varSeq.featureId === sequenceId
              );
              if (varSeqToAdd) {
                varSeqsToAdd.push(varSeqToAdd);
              }
            });
          }
          return { ...isoform, varSeqs: varSeqsToAdd };
        }
      );
    }
  }
  if (data.uniProtKBCrossReferences) {
    // Some EMBL xrefs need to be merged
    const joined = getJoinedXrefs(
      data.uniProtKBCrossReferences.filter((xref) => xref.database === 'EMBL')
    );
    const newXrefs = [
      ...data.uniProtKBCrossReferences.filter(
        (xref) => xref.database !== 'EMBL'
      ),
      ...joined,
    ];
    const xrefs = getXrefsForSection(
      newXrefs,
      EntrySection.Sequence,
      data.genes
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      sequenceData.xrefData = xrefs;
    }
  }
  return sequenceData;
};
