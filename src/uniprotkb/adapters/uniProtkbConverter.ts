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
  OrganismData,
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
import { FeatureData } from '../components/protein-data-views/FeaturesView';
import { Lineage, Xref } from '../../shared/types/apiModel';
import { SequenceData } from '../../shared/components/entry/SequenceView';
import { Keyword } from '../utils/KeywordsUtil';
import { UIModel } from './sectionConverter';
import { transfromProperties } from '../utils';
import { Property } from '../types/modelTypes';
import { Reference } from '../types/literatureTypes';
import { XrefUIModel } from '../utils/xrefUtils';

export enum EntryType {
  REVIEWED,
  UNREVIEWED,
  INACTIVE,
  UNIPARC,
  REFERENCE_PROTEOME,
  COMMUNITY_ANNOTATION,
}

export const getEntryTypeFromString = (entryTypeString?: string) => {
  if (!entryTypeString) {
    return undefined;
  }
  if (entryTypeString.match(/Inactive/gi)) {
    return EntryType.INACTIVE;
  }
  if (entryTypeString.match(/UniParc/i)) {
    return EntryType.UNIPARC;
  }
  if (entryTypeString.match(/TrEMBL|unreviewed|^tr\|$|^tr$/gi)) {
    return EntryType.UNREVIEWED;
  }
  if (entryTypeString.match(/Swiss-Prot|reviewed|^sp\|$|^sp$/gi)) {
    return EntryType.REVIEWED;
  }
  if (entryTypeString.match(/ORCID$/gi)) {
    return EntryType.COMMUNITY_ANNOTATION;
  }
  if (entryTypeString.match(/Reference|Representative/gi)) {
    return EntryType.REFERENCE_PROTEOME;
  }
  return undefined;
};

export type UniProtkbAPIModel = {
  proteinDescription?: ProteinNamesData;
  genes?: GeneNamesData;
  organism?: OrganismData;
  virusHosts?: OrganismData[];
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
  references?: Reference[];
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
  references?: Reference[];
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
