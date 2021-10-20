import { groupBy } from 'lodash-es';
import {
  CommentType,
  AbsorptionComment,
  KineticsComment,
  pHDependenceComment,
  RedoxPotentialComment,
  TemperatureDependenceComment,
  TextWithEvidence,
  FreeTextComment,
} from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import FeatureType, { FunctionType } from '../types/featureType';
import EntrySection from '../types/entrySection';
import { convertSection, UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Evidence } from '../types/modelTypes';
import { Xref } from '../../shared/types/apiModel';

import { UniProtKBColumn } from '../types/columnTypes';

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

export enum GoAspect {
  P = 'Biological Process',
  F = 'Molecular Function',
  C = 'Cellular Component',
}

export type GoTerm = {
  aspect?: GoAspect;
  termDescription?: string;
  evidences?: Evidence[];
} & Xref;

export type GroupedGoTerms = Map<GoAspect, GoTerm[]>;

export type FunctionUIModel = {
  bioPhysicoChemicalProperties: BioPhysicoChemicalProperties;
  goTerms?: GroupedGoTerms;
} & UIModel;

const keywordsCategories: KeywordCategory[] = [
  'Molecular function',
  'Biological process',
  'Ligand',
];

// const featuresCategories: FunctionType[] = [
//   'Domain',
//   'Repeat',
//   'Calcium binding',
//   'Zinc finger',
//   'DNA binding',
//   'Nucleotide binding',
//   'Region',
//   'Coiled coil',
//   'Motif',
//   'Active site',
//   'Metal binding',
//   'Binding site',
//   'Site',
// ];

export const featuresCategoriesToColumns = new Map<
  FunctionType,
  UniProtKBColumn
>([
  ['Domain', UniProtKBColumn.ftDomain],
  ['Repeat', UniProtKBColumn.ftRepeat],
  ['Calcium binding', UniProtKBColumn.ftCaBind],
  ['Zinc finger', UniProtKBColumn.ftZnFing],
  ['DNA binding', UniProtKBColumn.ftDnaBind],
  ['Nucleotide binding', UniProtKBColumn.ftNpBind],
  ['Region', UniProtKBColumn.ftRegion],
  ['Active site', UniProtKBColumn.ftActSite],
  ['Coiled coil', UniProtKBColumn.ftCoiled],
  ['Motif', UniProtKBColumn.ftMotif],
  ['Active site', UniProtKBColumn.ftActSite],
  ['Metal binding', UniProtKBColumn.ftMetal],
  ['Binding site', UniProtKBColumn.ftBinding],
  ['Site', UniProtKBColumn.ftSite],
]);

export const featureCategories = Array.from(featuresCategoriesToColumns.keys());

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

const convertFunction = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) => {
  const convertedSection = convertSection(
    data,
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
        convertedSection.bioPhysicoChemicalProperties.kinetics = (
          bpcProperty as KineticsComment
        ).kineticParameters;
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

  // Remove isoform MISCELLANEOUS comments as they go in the Sequence section
  const miscellaneousComments = convertedSection.commentsData
    ?.get('MISCELLANEOUS')
    ?.filter((comment) => !(comment as FreeTextComment).molecule);

  convertedSection.commentsData.set(
    'MISCELLANEOUS',
    miscellaneousComments || []
  );

  if (uniProtKBCrossReferences) {
    const goTerms = (
      uniProtKBCrossReferences.filter(
        (xref) => xref.database === 'GO' && xref.properties
      ) as GoTerm[]
    ).map((term) => {
      const goTermProperty = term.properties && term.properties.GoTerm;
      const aspect = goTermProperty && goTermProperty.substring(0, 1);
      const termDescription = goTermProperty && goTermProperty.substring(2);
      return {
        ...term,
        aspect: GoAspect[aspect as keyof typeof GoAspect],
        termDescription,
      };
    });
    convertedSection.goTerms = new Map(
      Object.entries(groupBy(goTerms, (term) => term.aspect))
    ) as GroupedGoTerms;
  }
  return convertedSection;
};

export default convertFunction;
