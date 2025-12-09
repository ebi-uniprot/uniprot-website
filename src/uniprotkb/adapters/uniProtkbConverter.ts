import { PeptideSearchMatch } from '../../jobs/peptide-search/components/PeptideSearchMatches';
import {
  EntryType,
  getEntryTypeFromString,
} from '../../shared/components/entry/EntryTypeIcon';
import { SequenceData } from '../../shared/components/entry/SequenceView';
import { Lineage, Xref } from '../../shared/types/apiModel';
import {
  Citation,
  Reference,
} from '../../supporting-data/citations/adapters/citationsConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { FeatureDatum } from '../components/protein-data-views/UniProtKBFeaturesView';
import Comment, { CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import FeatureType from '../types/featureType';
import { GeneLocation } from '../types/geneLocationType';
import { InternalSectionType } from '../types/internalSectionType';
import { Property } from '../types/modelTypes';
import { transfromProperties } from '../utils';
import { DatabaseInfoMaps } from '../utils/database';
import { Keyword } from '../utils/KeywordsUtil';
import { XrefUIModel } from '../utils/xrefUtils';
import convertDiseaseAndDrugs from './diseaseAndDrugs';
import convertExpression from './expressionConverter';
import convertExternalLinks from './externalLinksConverter';
import convertFamilyAndDomains from './familyAndDomainsConverter';
import convertFunction from './functionConverter';
import convertInteraction from './interactionConverter';
import {
  convertNamesAndTaxonomy,
  GeneNamesData,
  NamesAndTaxonomyUIModel,
  ProteinNamesData,
} from './namesAndTaxonomyConverter';
import convertProteinProcessing from './proteinProcessingConverter';
import { UIModel } from './sectionConverter';
import {
  convertSequence,
  EntryAudit,
  SequenceUIModel,
} from './sequenceConverter';
import convertSimilarProteins from './similarProteinsConverter';
import convertStructure from './structureConverter';
import convertSubcellularLocation from './subcellularLocationConverter';

// 🤷🏽
export type UniProtKBReference = Omit<Reference, 'citationId'> & {
  citation: Citation;
};

// Specific to the API, will be transformed by the adaptor into something usable
export type UniProtKBXref = Omit<Xref, 'properties'> & {
  properties?: Array<{ key: string; value: string | null }>;
};

export type AnnotationScoreValue = 0 | 1 | 2 | 3 | 4 | 5;
// 0 usually not used, just added for the ProtNLM usecase but if you see this
// comment later re-assess if it's still needed.

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
  entryType:
    | 'UniProtKB reviewed (Swiss-Prot)'
    | 'UniProtKB unreviewed (TrEMBL)';
  inactiveReason?: InactiveEntryReason;
  comments?: Comment[];
  keywords?: Keyword[];
  geneLocations?: GeneLocation[];
  features?: FeatureDatum[];
  uniProtKBCrossReferences?: UniProtKBXref[];
  sequence?: SequenceData;
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
  features?: FeatureDatum[];
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
  [EntrySection.SimilarProteins]: {
    canonical: string;
    isoforms: string[];
    xrefs: XrefUIModel[];
  };
  references?: UniProtKBReference[];
  extraAttributes: UniProtkbAPIModel['extraAttributes'];
  from?: string; // ID Mapping
  peptideSearchMatches?: PeptideSearchMatch[]; // Peptide Search
};

export type InactiveReasonType =
  // B4DII8
  | 'MERGED' // We will never see this as this is followed by a 303 redirect
  // P29358
  | 'DEMERGED'
  | 'DELETED';

type Sources = 'EMBL' | 'TAIR' | 'SGD' | 'ENSEMBL' | 'PDB' | 'RefSeq';

export type DeletedReason =
  // A0A010P2C8
  // A0A044QJK7
  // A0A158RFS4
  // A0A1S2XA85
  | `Deleted from sequence source (${Sources})`
  // A0A6A5PVF7
  | 'Deleted from Swiss-Prot'
  // A0A009E3R0
  | 'Redundant sequence'
  // A0A008APQ8
  | 'Redundant proteome'
  // A0A009DWF5
  | 'Excluded proteome'
  // A0A679HE24
  | 'Over-represented sequence';

// And example for "Unknown": A0A1B0GE37 => not exposed to users
// And example for "Change of entry type": A0A076FL24 => not exposed to users

export type InactiveEntryReason = {
  inactiveReasonType: InactiveReasonType;
  deletedReason?: DeletedReason;
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
    features: dataCopy.features,
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
    [EntrySection.SimilarProteins]: convertSimilarProteins(
      dataCopy,
      databaseInfoMaps,
      uniProtKBCrossReferences
    ),
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
