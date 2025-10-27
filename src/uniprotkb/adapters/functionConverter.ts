import { groupBy } from 'lodash-es';

import {
  EntryType,
  getEntryTypeFromString,
} from '../../shared/config/entryTypeIcon';
import { Xref } from '../../shared/types/apiModel';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { UniProtKBColumn } from '../types/columnTypes';
import {
  AbsorptionComment,
  CommentType,
  KineticsComment,
  pHDependenceComment,
  RedoxPotentialComment,
  TemperatureDependenceComment,
  TextWithEvidence,
} from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { FunctionFeatures } from '../types/featureType';
import KeywordCategory from '../types/keywordCategory';
import { Evidence, GoEvidenceType } from '../types/modelTypes';
import { DatabaseInfoMaps } from '../utils/database';
import { XrefsGoupedByDatabase } from '../utils/xrefUtils';
import { GeneNamesData } from './namesAndTaxonomyConverter';
import { convertSection, UIModel } from './sectionConverter';
import {
  UniProtkbAPIModel,
  UniProtKBSimplifiedTaxonomy,
} from './uniProtkbConverter';

export type Absorption = {
  max: number;
  approximate: boolean;
  note?: {
    texts: TextWithEvidence[];
  };
  evidences?: Evidence[];
};

export type KineticParameters = {
  michaelisConstants?: {
    constant: number;
    unit: string;
    substrate: string;
    evidences?: Evidence[];
  }[];
  maximumVelocities?: {
    velocity: number;
    unit: string;
    enzyme: string;
    evidences: Evidence[];
  }[];
  note?: {
    texts: TextWithEvidence[];
  };
};

export type BioPhysicoChemicalProperties = {
  absorption?: Absorption;
  kinetics?: { [isoform: string]: KineticParameters };
  pHDependence?: { [isoform: string]: TextWithEvidence[] };
  redoxPotential?: TextWithEvidence[];
  temperatureDependence?: TextWithEvidence[];
};

export type GOAspectLabel =
  | 'Biological Process'
  | 'Molecular Function'
  | 'Cellular Component';

export type GOAspectName =
  | 'cellular_component'
  | 'molecular_function'
  | 'biological_process';

type GOAspectShort = 'C' | 'F' | 'P';

export type GOTermID = `GO:${number}${string}`;

export type GoTerm = {
  id: GOTermID;
  database: 'GO';
  aspect?: GOAspectLabel;
  termDescription?: string;
  evidences?: Evidence[];
  properties?: {
    GoEvidenceType: GoEvidenceType;
    [key: string]: string;
  };
} & Omit<Xref, 'id' | 'properties'>;

export type GroupedGoTerms = Map<GOAspectLabel, GoTerm[]>;

export type FunctionUIModel = {
  bioPhysicoChemicalProperties: BioPhysicoChemicalProperties;
  goTerms?: GroupedGoTerms;
  geneNamesData?: GeneNamesData;
  organismData?: TaxonomyDatum | UniProtKBSimplifiedTaxonomy;
  entryType?: EntryType;
  panGoXrefs?: XrefsGoupedByDatabase[];
} & UIModel;

const keywordsCategories: KeywordCategory[] = [
  'Molecular function',
  'Biological process',
  'Ligand',
];

export const goAspects: {
  id: GOTermID;
  name: GOAspectName;
  label: GOAspectLabel;
  short: GOAspectShort;
}[] = [
  {
    id: 'GO:0003674',
    name: 'molecular_function',
    label: 'Molecular Function',
    short: 'F',
  },
  {
    id: 'GO:0008150',
    name: 'biological_process',
    label: 'Biological Process',
    short: 'P',
  },
  // We don't have the Cellular Component aspect because this is used to
  // populate the Function section and not the Subcellular Location section
];

const getAspect = (term: GOAspectName | GOAspectShort) =>
  goAspects.find(
    (aspectInfo) => aspectInfo.name === term || aspectInfo.short === term
  );

export const functionFeaturesToColumns: Readonly<
  Record<FunctionFeatures, UniProtKBColumn>
> = {
  'DNA binding': UniProtKBColumn.ftDnaBind,
  'Active site': UniProtKBColumn.ftActSite,
  'Binding site': UniProtKBColumn.ftBinding,
  Site: UniProtKBColumn.ftSite,
};

const featureCategories = Object.keys(
  functionFeaturesToColumns
) as FunctionFeatures[];

const commentsCategories: CommentType[] = [
  'FUNCTION',
  'CATALYTIC ACTIVITY',
  'COFACTOR',
  'ACTIVITY REGULATION',
  'BIOPHYSICOCHEMICAL PROPERTIES',
  'PATHWAY',
  'CAUTION',
  'MISCELLANEOUS',
  'BIOTECHNOLOGY',
];

export const getAspectGroupedGoTermsWithoutCellComp = (
  uniProtKBCrossReferences?: Xref[]
): GroupedGoTerms => {
  const goTerms = (uniProtKBCrossReferences || [])
    .filter(
      (xref: Xref | GoTerm): xref is GoTerm =>
        xref.database === 'GO' &&
        Boolean(xref.properties) &&
        // Remove the ones that are "Cellular Component" for Function section
        !xref.properties?.GoTerm?.startsWith('C')
    )
    .map((term) => {
      const goTermProperty = term.properties && term.properties.GoTerm;
      const aspect =
        goTermProperty && (goTermProperty.substring(0, 1) as GOAspectShort);
      const termDescription = goTermProperty && goTermProperty.substring(2);
      return {
        ...term,
        aspect: aspect ? getAspect(aspect)?.label : undefined,
        termDescription,
      };
    });
  return new Map(
    Object.entries(groupBy(goTerms, (term) => term.aspect))
  ) as GroupedGoTerms;
};

const convertFunction = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const convertedSection = convertSection(
    data,
    databaseInfoMaps,
    commentsCategories,
    keywordsCategories,
    featureCategories,
    EntrySection.Function,
    uniProtKBCrossReferences
  ) as FunctionUIModel;
  const bpcProperties = convertedSection.commentsData.get(
    'BIOPHYSICOCHEMICAL PROPERTIES'
  );
  convertedSection.bioPhysicoChemicalProperties = {};
  if (bpcProperties) {
    for (const bpcProperty of bpcProperties) {
      if ((bpcProperty as AbsorptionComment).absorption) {
        convertedSection.bioPhysicoChemicalProperties.absorption = (
          bpcProperty as AbsorptionComment
        ).absorption;
      }
      if ((bpcProperty as KineticsComment).kineticParameters) {
        const existingData =
          convertedSection.bioPhysicoChemicalProperties.kinetics;
        const isoform = bpcProperty.molecule || 'canonical';
        convertedSection.bioPhysicoChemicalProperties.kinetics = {
          ...existingData,
          [isoform]: (bpcProperty as KineticsComment).kineticParameters || {},
        };
      }
      if ((bpcProperty as pHDependenceComment).phDependence) {
        const existingData =
          convertedSection.bioPhysicoChemicalProperties.pHDependence;
        const isoform = bpcProperty.molecule || 'canonical';
        convertedSection.bioPhysicoChemicalProperties.pHDependence = {
          ...existingData,
          [isoform]: (bpcProperty as pHDependenceComment).phDependence.texts,
        };
      }
      if ((bpcProperty as RedoxPotentialComment).redoxPotential) {
        convertedSection.bioPhysicoChemicalProperties.redoxPotential = (
          bpcProperty as RedoxPotentialComment
        ).redoxPotential.texts;
      }
      if ((bpcProperty as TemperatureDependenceComment).temperatureDependence) {
        convertedSection.bioPhysicoChemicalProperties.temperatureDependence = (
          bpcProperty as TemperatureDependenceComment
        ).temperatureDependence.texts;
      }
    }
  }
  convertedSection.commentsData.delete('BIOPHYSICOCHEMICAL PROPERTIES');

  convertedSection.geneNamesData = data?.genes;
  convertedSection.organismData = data?.organism;
  convertedSection.entryType = getEntryTypeFromString(data?.entryType);
  const panGoXrefs = uniProtKBCrossReferences?.filter(
    (xref) => xref.database === 'PAN-GO'
  );
  convertedSection.panGoXrefs = panGoXrefs?.length
    ? [
        {
          database: 'PAN-GO',
          xrefs: panGoXrefs,
        },
      ]
    : undefined;

  const aspectGroupedGoTerms = getAspectGroupedGoTermsWithoutCellComp(
    uniProtKBCrossReferences
  );
  if (aspectGroupedGoTerms?.size) {
    convertedSection.goTerms = aspectGroupedGoTerms;
  }
  return convertedSection;
};

export default convertFunction;
