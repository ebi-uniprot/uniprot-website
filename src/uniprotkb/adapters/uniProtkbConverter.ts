import convertStructure from './structureConverter';
import convertExternalLinks from './externalLinksConverter';
import convertInteraction from './interactionConverter';
import convertFamilyAndDomains from './familyAndDomainsConverter';
import convertProteinProcessing from './proteinProcessingConverter';
import convertExpression from './expressionConverter';
import convertSubcellularLocation from './subcellularLocationConverter';
import convertFunction from './functionConverter';
import convertDiseaseAndDrugs from './diseaseAndDrugs';
import {
  convertNamesAndTaxonomy,
  NamesAndTaxonomyUIModel,
  ProteinNamesData,
  GeneNamesData,
} from './namesAndTaxonomyConverter';
import {
  convertSequence,
  SequenceUIModel,
  EntryAudit,
} from './sequenceConverter';
import extractIsoforms from './extractIsoformsConverter';

import EntrySection from '../types/entrySection';
import FeatureType from '../types/featureType';

import Comment, { CommentType } from '../types/commentTypes';
import { FeatureData } from '../components/protein-data-views/UniProtKBFeaturesView';
import { Lineage, Xref } from '../../shared/types/apiModel';
import { SequenceData } from '../../shared/components/entry/SequenceView';
import {
  EntryType,
  getEntryTypeFromString,
} from '../../shared/components/entry/EntryTypeIcon';
import { Keyword } from '../utils/KeywordsUtil';
import { UIModel } from './sectionConverter';
import { transfromProperties } from '../utils';
import { Property } from '../types/modelTypes';
import { GeneLocation } from '../types/geneLocationType';
import { InternalSectionType } from '../types/internalSectionType';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  Citation,
  Reference,
} from '../../supporting-data/citations/adapters/citationsConverter';
import { DatabaseInfoMaps } from '../utils/database';
import { PeptideSearchMatch } from '../../tools/peptide-search/components/PeptideSearchMatches';
import { AnnotationScoreValue } from '../components/protein-data-views/AnnotationScoreDoughnutChart';

// 🤷🏽
type UniProtKBReference = Omit<Reference, 'citationId'> & {
  citation: Citation;
};

// Specific to the API, will be transformed by the adaptor into something usable
type UniProtKBXref = Omit<Xref, 'properties'> & {
  properties?: Array<{ key: string; value: string }>;
};

export type UniProtKBSimplifiedTaxonomy = Omit<TaxonomyDatum, 'lineage'> & {
  lineage: string[];
};

export type UniProtkbAPIModel = {
  proteinDescription?: ProteinNamesData;
  genes?: GeneNamesData;
  organism?: UniProtKBSimplifiedTaxonomy;
  organismHosts?: TaxonomyDatum[];
  primaryAccession: string;
  secondaryAccessions?: string[];
  uniProtkbId: string;
  proteinExistence: string;
  entryType: string;
  inactiveReason?: InactiveEntryReason;
  comments?: Comment[];
  keywords?: Keyword[];
  geneLocations?: GeneLocation[];
  features?: FeatureData;
  uniProtKBCrossReferences?: UniProtKBXref[];
  sequence: SequenceData;
  internalSection?: InternalSectionType;
  annotationScore: AnnotationScoreValue;
  entryAudit?: EntryAudit;
  references?: UniProtKBReference[];
  // not there by default, even on an entry request
  lineages?: Lineage[];
  extraAttributes?: {
    countByCommentType?: Partial<Record<CommentType, number | undefined>>;
    countByFeatureType?: Partial<Record<FeatureType, number | undefined>>;
    uniParcId?: string;
  };
  from?: string; // ID Mapping results
  peptideSearchMatches?: PeptideSearchMatch[]; // Peptide Search
};

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtkbId: string;
  proteinExistence: string;
  entryType?: EntryType;
  inactiveReason?: InactiveEntryReason;
  annotationScore: AnnotationScoreValue;
  uniProtKBCrossReferences?: Xref[];
  lineages?: Lineage[];
  [EntrySection.Function]: UIModel;
  [EntrySection.NamesAndTaxonomy]: NamesAndTaxonomyUIModel;
  [EntrySection.SubCellularLocation]: UIModel;
  [EntrySection.DiseaseVariants]: UIModel;
  [EntrySection.PhenotypesVariants]: UIModel;
  [EntrySection.ProteinProcessing]: UIModel;
  [EntrySection.Expression]: UIModel;
  [EntrySection.Sequence]: SequenceUIModel;
  [EntrySection.Interaction]: UIModel;
  [EntrySection.Structure]: UIModel;
  [EntrySection.FamilyAndDomains]: UIModel;
  [EntrySection.ExternalLinks]: UIModel;
  [EntrySection.SimilarProteins]: string[];
  references?: UniProtKBReference[];
  extraAttributes: UniProtkbAPIModel['extraAttributes'];
  from?: string; // ID Mapping
  peptideSearchMatches?: PeptideSearchMatch[]; // Peptide Search
};

export type InactiveReasonType =
  | 'MERGED' // We will never see this as this is followed by a 303 redirect
  | 'DEMERGED'
  | 'DELETED';

export type InactiveEntryReason = {
  inactiveReasonType: InactiveReasonType;
  mergeDemergeTo?: string[];
};

export const convertXrefProperties = (
  xrefs?: UniProtKBXref[]
): Xref[] | undefined =>
  xrefs?.map((xref) => ({
    ...xref,
    properties: xref.properties
      ? transfromProperties(xref.properties as unknown as Property[])
      : {},
  }));

const uniProtKbConverter = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps
): UniProtkbUIModel => {
  const { ...dataCopy } = data;

  const uniProtKBCrossReferences = convertXrefProperties(
    dataCopy.uniProtKBCrossReferences
  );

  return {
    primaryAccession: dataCopy.primaryAccession,
    uniProtkbId: dataCopy.uniProtkbId,
    proteinExistence: dataCopy.proteinExistence,
    entryType: getEntryTypeFromString(dataCopy.entryType),
    annotationScore: dataCopy.annotationScore,
    inactiveReason: dataCopy.inactiveReason,
    uniProtKBCrossReferences,
    lineages: dataCopy.lineages,
    [EntrySection.Function]: convertFunction(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.NamesAndTaxonomy]: convertNamesAndTaxonomy(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.SubCellularLocation]: convertSubcellularLocation(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.DiseaseVariants]: convertDiseaseAndDrugs(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.PhenotypesVariants]: convertDiseaseAndDrugs(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.ProteinProcessing]: convertProteinProcessing(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.Expression]: convertExpression(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.Interaction]: convertInteraction(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.Structure]: convertStructure(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.Sequence]: convertSequence(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.FamilyAndDomains]: convertFamilyAndDomains(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.ExternalLinks]: convertExternalLinks(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
    [EntrySection.SimilarProteins]: extractIsoforms(dataCopy),
    references: dataCopy.references || [],
    extraAttributes: data.extraAttributes,
    from: dataCopy.from,
    peptideSearchMatches: dataCopy.peptideSearchMatches,
  };
};

export default uniProtKbConverter;

// TODO this needs to be removed once added
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   'Technical term',
// ]);
