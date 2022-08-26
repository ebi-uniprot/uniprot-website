import { groupBy } from 'lodash-es';
import { FeatureDatum } from '../components/protein-data-views/UniProtKBFeaturesView';
import {
  getKeywordsForCategories,
  KeywordUIModel,
} from '../utils/KeywordsUtil';
import KeywordCategory from '../types/keywordCategory';
import FeatureType, { SequenceFeatures } from '../types/featureType';
import {
  getXrefsForSection,
  XrefUIModel,
  getJoinedXrefs,
} from '../utils/xrefUtils';
import EntrySection from '../types/entrySection';
import { SequenceData } from '../../shared/components/entry/SequenceView';
import {
  AlternativeProductsComment,
  SequenceCautionComment,
  MassSpectrometryComment,
  FreeTextComment,
  RNAEditingComment,
} from '../types/commentTypes';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { DatabaseInfoMaps } from '../utils/database';

export type Flag =
  | 'Precursor'
  | 'Fragment'
  | 'Fragments'
  | 'Fragment,Precursor'
  | 'Fragments,Precursor';

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
  polymorphism?: FreeTextComment[];
  rnaEditing?: RNAEditingComment[];
  featuresData?: FeatureDatum[];
  xrefData?: XrefUIModel[];
  lastUpdateDate?: string;
  entryAudit?: EntryAudit;
  molWeight?: number;
  isoformNotes?: IsoformNotes;
};

const keywordsCategories: KeywordCategory[] = [
  'Coding sequence diversity',
  'Technical term',
];

export const sequenceFeaturesToColumns: Readonly<
  Record<SequenceFeatures, UniProtKBColumn>
> = {
  'Compositional bias': UniProtKBColumn.ftCompbias,
  'Non-standard residue': UniProtKBColumn.ftNonStd,
  'Sequence uncertainty': UniProtKBColumn.ftUnsure,
  'Sequence conflict': UniProtKBColumn.ftConflict,
  'Non-adjacent residues': UniProtKBColumn.ftNonCons,
  'Non-terminal residue': UniProtKBColumn.ftNonTer,
  'Alternative sequence': UniProtKBColumn.ftVarSeq,
};

export const featuresCategories = Object.keys(
  sequenceFeaturesToColumns
) as FeatureType[];

export const fragmentFlags = new Set<Flag>([
  'Fragment',
  'Fragments',
  'Fragment,Precursor',
  'Fragments,Precursor',
]);
const precursorFlags = new Set<Flag>([
  'Precursor',
  'Fragment,Precursor',
  'Fragments,Precursor',
]);

export const convertSequence = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
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

    sequenceData.status = fragmentFlags.has(data.proteinDescription.flag)
      ? data.proteinDescription.flag
      : 'Complete';

    sequenceData.processing = precursorFlags.has(data.proteinDescription.flag)
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
      (comment) => comment.commentType === 'ALTERNATIVE PRODUCTS'
    );
    sequenceData.alternativeProducts =
      alternativeProducts as AlternativeProductsComment;
    const sequenceCaution = data.comments.filter(
      (comment) => comment.commentType === 'SEQUENCE CAUTION'
    );
    sequenceData.sequenceCaution = sequenceCaution as SequenceCautionComment[];
    const massSpec = data.comments.filter(
      (comment) => comment.commentType === 'MASS SPECTROMETRY'
    );
    sequenceData.massSpectrometry = massSpec as MassSpectrometryComment[];
    const polymorphism = data.comments.filter(
      (comment) => comment.commentType === 'POLYMORPHISM'
    );
    sequenceData.polymorphism = polymorphism as FreeTextComment[];
    const rnaEditing = data.comments.filter(
      (comment) => comment.commentType === 'RNA EDITING'
    );
    sequenceData.rnaEditing = rnaEditing as RNAEditingComment[];

    // Retrieve notes for isoforms
    const notes = data.comments.filter(
      (comment) =>
        comment.commentType === 'MISCELLANEOUS' &&
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
        (feature) => feature.type === 'Alternative sequence'
      );
      sequenceData.alternativeProducts.isoforms =
        sequenceData.alternativeProducts.isoforms.map((isoform) => {
          const varSeqsToAdd: FeatureDatum[] = [];
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
        });
    }
  }
  if (uniProtKBCrossReferences) {
    // Some EMBL xrefs need to be merged
    const joined = getJoinedXrefs(
      uniProtKBCrossReferences.filter((xref) => xref.database === 'EMBL')
    );
    const newXrefs = [
      ...uniProtKBCrossReferences.filter((xref) => xref.database !== 'EMBL'),
      ...joined,
    ];
    const xrefs = getXrefsForSection(
      databaseInfoMaps,
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
