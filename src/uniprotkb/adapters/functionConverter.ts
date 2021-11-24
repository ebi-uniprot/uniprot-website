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
import { FunctionFeatures } from '../types/featureType';
import EntrySection from '../types/entrySection';
import { convertSection, UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Evidence } from '../types/modelTypes';
import { Xref } from '../../shared/types/apiModel';

import { UniProtKBColumn } from '../types/columnTypes';
import { GeneNamesData } from './namesAndTaxonomyConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';

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
  aspect?: GOAspectLabel;
  termDescription?: string;
  evidences?: Evidence[];
} & Omit<Xref, 'id'>;

export type GroupedGoTerms = Map<GOAspectLabel, GoTerm[]>;

export type FunctionUIModel = {
  bioPhysicoChemicalProperties: BioPhysicoChemicalProperties;
  goTerms?: GroupedGoTerms;
  geneNamesData?: GeneNamesData;
  organismData?: TaxonomyDatum;
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
  'Calcium binding': UniProtKBColumn.ftCaBind,
  'Zinc finger': UniProtKBColumn.ftZnFing,
  'DNA binding': UniProtKBColumn.ftDnaBind,
  'Nucleotide binding': UniProtKBColumn.ftNpBind,
  Region: UniProtKBColumn.ftRegion,
  'Active site': UniProtKBColumn.ftActSite,
  'Coiled coil': UniProtKBColumn.ftCoiled,
  Motif: UniProtKBColumn.ftMotif,
  'Metal binding': UniProtKBColumn.ftMetal,
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

  convertedSection.geneNamesData = data?.genes;
  convertedSection.organismData = data?.organism;

  if (uniProtKBCrossReferences) {
    const goTerms = (
      uniProtKBCrossReferences.filter(
        (xref) => xref.database === 'GO' && xref.properties
      ) as GoTerm[]
    ).map((term) => {
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
    if (goTerms.length) {
      convertedSection.goTerms = new Map(
        Object.entries(groupBy(goTerms, (term) => term.aspect))
      ) as GroupedGoTerms;
    }
  }
  return convertedSection;
};

export default convertFunction;
