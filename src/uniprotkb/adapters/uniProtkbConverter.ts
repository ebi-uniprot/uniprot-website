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
import { XrefUIModel } from '../utils/xrefUtils';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  Citation,
  Reference,
} from '../../supporting-data/citations/adapters/citationsConverter';

// 🤷🏽
type UniProtKBReference = Omit<Reference, 'citationId'> & {
  citation: Citation;
};

export type UniProtkbAPIModel = {
  proteinDescription?: ProteinNamesData;
  genes?: GeneNamesData;
  organism?: TaxonomyDatum;
  virusHosts?: TaxonomyDatum[];
  primaryAccession: string;
  secondaryAccessions?: string[];
  uniProtkbId: string;
  proteinExistence: string;
  entryType: string;
  inactiveReason?: InactiveEntryReason;
  comments?: Comment[];
  keywords?: Keyword[];
  features?: FeatureData;
  uniProtKBCrossReferences?: Xref[];
  sequence: SequenceData;
  annotationScore: number;
  entryAudit?: EntryAudit;
  references?: UniProtKBReference[];
  lineages?: Lineage[];
  extraAttributes?: {
    countByCommentType?: {
      [key in CommentType]?: number;
    };
    countByFeatureType?: {
      [key in FeatureType]?: number;
    };
    uniParcId?: string;
  };
  from?: string; // ID Mapping results
};

export type UniProtkbUIModel = {
  primaryAccession: string;
  uniProtkbId: string;
  proteinExistence: string;
  entryType?: EntryType;
  inactiveReason?: InactiveEntryReason;
  annotationScore: number;
  [EntrySection.Function]: UIModel;
  [EntrySection.NamesAndTaxonomy]: NamesAndTaxonomyUIModel;
  [EntrySection.SubCellularLocation]: UIModel;
  [EntrySection.DiseaseAndDrugs]: UIModel;
  [EntrySection.Phenotypes]: UIModel;
  [EntrySection.ProteinProcessing]: UIModel;
  [EntrySection.Expression]: UIModel;
  [EntrySection.Sequence]: SequenceUIModel;
  [EntrySection.Interaction]: UIModel;
  [EntrySection.Structure]: UIModel;
  [EntrySection.FamilyAndDomains]: UIModel;
  [EntrySection.ExternalLinks]: UIModel;
  [EntrySection.SimilarProteins]: {
    isoforms: string[];
    xrefData?: XrefUIModel[]; // Dummy, not used
  };
  references?: UniProtKBReference[];
  extraAttributes: UniProtkbAPIModel['extraAttributes'];
};

export enum InactiveReasonType {
  MERGED = 'MERGED', // We will never see this as this is followed by a 303 redirect
  DEMERGED = 'DEMERGED',
  DELETED = 'DELETED',
}

export type InactiveEntryReason = {
  inactiveReasonType: InactiveReasonType;
  mergeDemergeTo?: string[];
};

export const convertXrefProperties = (xrefs: Xref[]) =>
  xrefs.map((xref) => ({
    ...xref,
    properties: xref.properties
      ? transfromProperties((xref.properties as unknown) as Property[])
      : {},
  }));

const uniProtKbConverter = (data: UniProtkbAPIModel): UniProtkbUIModel => {
  const dataCopy = { ...data };
  if (dataCopy.uniProtKBCrossReferences) {
    dataCopy.uniProtKBCrossReferences = convertXrefProperties(
      dataCopy.uniProtKBCrossReferences
    );
  }

  return {
    primaryAccession: dataCopy.primaryAccession,
    uniProtkbId: dataCopy.uniProtkbId,
    proteinExistence: dataCopy.proteinExistence,
    entryType: getEntryTypeFromString(dataCopy.entryType),
    annotationScore: dataCopy.annotationScore,
    inactiveReason: dataCopy.inactiveReason,
    [EntrySection.Function]: convertFunction(dataCopy),
    [EntrySection.NamesAndTaxonomy]: convertNamesAndTaxonomy(dataCopy),
    [EntrySection.SubCellularLocation]: convertSubcellularLocation(dataCopy),
    [EntrySection.DiseaseAndDrugs]: convertDiseaseAndDrugs(dataCopy),
    [EntrySection.Phenotypes]: convertDiseaseAndDrugs(dataCopy),
    [EntrySection.ProteinProcessing]: convertProteinProcessing(dataCopy),
    [EntrySection.Expression]: convertExpression(dataCopy),
    [EntrySection.Interaction]: convertInteraction(dataCopy),
    [EntrySection.Structure]: convertStructure(dataCopy),
    [EntrySection.Sequence]: convertSequence(dataCopy),
    [EntrySection.FamilyAndDomains]: convertFamilyAndDomains(dataCopy),
    [EntrySection.ExternalLinks]: convertExternalLinks(dataCopy),
    [EntrySection.SimilarProteins]: extractIsoforms(dataCopy),
    references: dataCopy.references || [],
    extraAttributes: data.extraAttributes,
  };
};

export default uniProtKbConverter;

// TODO this needs to be removed once added
// entrySectionToKeywordCategories.set(EntrySection.Miscellaneous, [
//   KeywordCategory.TECHNICAL_TERM,
// ]);
