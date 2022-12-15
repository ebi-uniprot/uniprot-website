import { groupBy, mergeWith } from 'lodash-es';
import {
  CommentType,
  AbsorptionComment,
  KineticsComment,
  pHDependenceComment,
  RedoxPotentialComment,
  TemperatureDependenceComment,
  TextWithEvidence,
} from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import { FunctionFeatures } from '../types/featureType';
import EntrySection from '../types/entrySection';
import { convertSection, UIModel } from './sectionConverter';
import {
  UniProtkbAPIModel,
  UniProtKBSimplifiedTaxonomy,
} from './uniProtkbConverter';
import { Evidence, GoEvidenceType } from '../types/modelTypes';
import { Xref } from '../../shared/types/apiModel';

import { UniProtKBColumn } from '../types/columnTypes';
import { GeneNamesData } from './namesAndTaxonomyConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { DatabaseInfoMaps } from '../utils/database';

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
  kinetics?: KineticParameters;
  pHDependence?: TextWithEvidence[];
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

  {
    id: 'GO:0005575',
    name: 'cellular_component',
    label: 'Cellular Component',
    short: 'C',
  },
];

export const getAspect = (term: GOAspectName | GOAspectShort) =>
  goAspects.find(
    (aspectInfo) => aspectInfo.name === term || aspectInfo.short === term
  );

export const functionFeaturesToColumns: Readonly<
  Record<FunctionFeatures, UniProtKBColumn>
> = {
  Domain: UniProtKBColumn.ftDomain,
  Repeat: UniProtKBColumn.ftRepeat,
  'Zinc finger': UniProtKBColumn.ftZnFing,
  'DNA binding': UniProtKBColumn.ftDnaBind,
  Region: UniProtKBColumn.ftRegion,
  'Active site': UniProtKBColumn.ftActSite,
  'Coiled coil': UniProtKBColumn.ftCoiled,
  Motif: UniProtKBColumn.ftMotif,
  'Binding site': UniProtKBColumn.ftBinding,
  Site: UniProtKBColumn.ftSite,
};

export const featureCategories = Object.keys(
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

export const getAspectGroupedGoTerms = (
  uniProtKBCrossReferences?: Xref[]
): GroupedGoTerms => {
  const goTerms = (uniProtKBCrossReferences || [])
    .filter(
      (xref: Xref | GoTerm): xref is GoTerm =>
        xref.database === 'GO' && Boolean(xref.properties)
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
    bpcProperties.forEach((bpcProperty) => {
      if ((bpcProperty as AbsorptionComment).absorption) {
        convertedSection.bioPhysicoChemicalProperties.absorption = (
          bpcProperty as AbsorptionComment
        ).absorption;
      }
      if ((bpcProperty as KineticsComment).kineticParameters) {
        const existingData =
          convertedSection.bioPhysicoChemicalProperties.kinetics;
        const newData = (bpcProperty as KineticsComment).kineticParameters;
        const toBeMerged = [existingData, newData];
        const result = mergeWith(
          {},
          ...toBeMerged,
          (obj: keyof KineticParameters, src: keyof KineticParameters) =>
            (obj || []).concat(src)
        );
        convertedSection.bioPhysicoChemicalProperties.kinetics = { ...result };
      }
      if ((bpcProperty as pHDependenceComment).phDependence) {
        convertedSection.bioPhysicoChemicalProperties.pHDependence = (
          bpcProperty as pHDependenceComment
        ).phDependence.texts;
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
    });
  }
  convertedSection.commentsData.delete('BIOPHYSICOCHEMICAL PROPERTIES');

  convertedSection.geneNamesData = data?.genes;
  convertedSection.organismData = data?.organism;

  const aspectGroupedGoTerms = getAspectGroupedGoTerms(
    uniProtKBCrossReferences
  );
  if (aspectGroupedGoTerms?.size) {
    convertedSection.goTerms = aspectGroupedGoTerms;
  }
  return convertedSection;
};

export default convertFunction;
