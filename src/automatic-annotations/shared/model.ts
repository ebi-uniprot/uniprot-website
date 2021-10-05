import { Statistics } from '../../shared/types/apiModel';

export type Information = {
  duplicates?: string[];
  internal?: string;
  comment?: string;
  version?: string;
  related?: string[];
  // uniProtAccessions?: Array<{
  //   validAccession?: boolean;
  //   value: string;
  // }>;
  uniProtAccessions?: string[];
  plasmaIds?: string[];
  // dataClass?: 'PROTEIN' | 'DOMAIN';
  dataClass?: 'Protein' | 'Domain';
  fusion?: {
    cters?: string[];
    nters?: string[];
  };
  oldRuleNum?: string;
  // NOTE: What is this? Nowhere to be found in data, duplicated with uniProAccessions?
  uniProtIds?: string[];
  names?: string[];
};

export type Evidence = {
  evidenceCode?: `ECO_${string}`;
  evidenceCrossReference?: {
    database?: {
      name?: string;
      evidenceDatabaseDetail?: {
        name?: string;
        displayName?: string;
        category?: 'I' | 'C' | 'A';
        uriLink?: string;
      };
      reference?: boolean;
    };
    properties?: Array<{
      key?: string;
      value?: string;
    }>;
    id?: string;
  };
  value?: string;
};

type Name = {
  valid?: boolean;
  value?: string;
  evidences?: Evidence[];
};

type EC = {
  valid?: boolean;
  value?: string;
  evidences?: Evidence[];
};

type ProteinName = {
  shortNames?: Name[];
  ecNumbers?: EC[];
  fullName?: Name;
  valid?: boolean;
};

type ProteinSection = {
  recommendedName?: ProteinName;
  alternativeNames?: ProteinName[];
  allergenName?: Name;
  biotechName?: Name;
  cdAntigenNames?: Name[];
  innNames?: Name[];
};

export type Annotation = {
  dbReference?: {
    isoformId?: string;
    // database?: {
    //   uniProtDatabaseDetail?: {
    //     name?: string;
    //     displayName?: string;
    //     category?:
    //       | 'SEQUENCE_DATABASES'
    //       | 'D3_STRUCTURE_DATABASES'
    //       | 'PROTEIN_PROTEIN_INTERACTION_DATABASES'
    //       | 'CHEMISTRY'
    //       | 'PROTEIN_FAMILY_GROUP_DATABASES'
    //       | 'PTM_DATABASES'
    //       | 'POLYMORPHISM_AND_MUTATION_DATABASES'
    //       | 'D2_GEL_DATABASES'
    //       | 'PROTEOMIC_DATABASES'
    //       | 'PROTOCOLS_AND_MATERIALS_DATABASES'
    //       | 'GENOME_ANNOTATION_DATABASES'
    //       | 'ORGANISM_SPECIFIC_DATABASES'
    //       | 'PHYLOGENOMIC_DATABASES'
    //       | 'ENZYME_AND_PATHWAY_DATABASES'
    //       | 'OTHER'
    //       | 'GENE_EXPRESSION_DATABASES'
    //       | 'FAMILY_AND_DOMAIN_DATABASES'
    //       | 'GENE_ONTOLOGY_DATABASES'
    //       | 'PROTEOMES_DATABASES'
    //       | 'UNKNOWN';
    //     uriLink?: string;
    //     attributes?: Array<{
    //       name?: string;
    //       xmlTag?: string;
    //       uriLink?: string;
    //     }>;
    //     implicit?: boolean;
    //     linkedReason?: string;
    //     idMappingName?: string;
    //   };
    //   name?: string;
    // };
    database?: string;
    properties?: Array<{
      key?: string;
      value?: string;
    }>;
    id?: string;
    evidences?: Array<Evidence>;
  };
  gene?: {
    geneName?: {
      value?: string;
      evidences?: Evidence[];
    };
    synonyms?: Array<{
      value?: string;
      evidences?: Evidence[];
    }>;
    orderedLocusNames?: Array<{
      value?: string;
      evidences?: Evidence[];
    }>;
    orfNames?: Array<{
      value?: string;
      evidences?: Evidence[];
    }>;
  };
  proteinDescription?: {
    recommendedName?: ProteinName;
    alternativeNames?: ProteinName[];
    allergenName?: Name;
    biotechName?: Name;
    cdAntigenNames?: Name[];
    innNames?: Name[];
    submissionNames?: Array<{
      ecNumbers?: EC[];
      fullName?: Name;
      valid?: boolean;
    }>;
    contains?: ProteinSection[];
    flag?: {
      type?:
        | 'PRECURSOR'
        | 'FRAGMENT'
        | 'FRAGMENTS'
        | 'FRAGMENT_PRECURSOR'
        | 'FRAGMENTS_PRECURSOR';
    };
    includes?: ProteinSection[];
  };
  comment?: {
    // commentType?:
    //   | 'FUNCTION'
    //   | 'CATALYTIC_ACTIVITY'
    //   | 'COFACTOR'
    //   | 'ACTIVITY_REGULATION'
    //   | 'BIOPHYSICOCHEMICAL_PROPERTIES'
    //   | 'PATHWAY'
    //   | 'SUBUNIT'
    //   | 'INTERACTION'
    //   | 'SUBCELLULAR_LOCATION'
    //   | 'ALTERNATIVE_PRODUCTS'
    //   | 'TISSUE_SPECIFICITY'
    //   | 'DEVELOPMENTAL_STAGE'
    //   | 'INDUCTION'
    //   | 'DOMAIN'
    //   | 'PTM'
    //   | 'RNA_EDITING'
    //   | 'MASS_SPECTROMETRY'
    //   | 'POLYMORPHISM'
    //   | 'DISEASE'
    //   | 'DISRUPTION_PHENOTYPE'
    //   | 'ALLERGEN'
    //   | 'TOXIC_DOSE'
    //   | 'BIOTECHNOLOGY'
    //   | 'PHARMACEUTICAL'
    //   | 'MISCELLANEOUS'
    //   | 'SIMILARITY'
    //   | 'CAUTION'
    //   | 'SEQUENCE_CAUTION'
    //   | 'WEBRESOURCE'
    //   | 'UNKNOWN';
    commentType?: string;
    texts?: Array<{ value: string }>;
    // NOTE: below, added
    proteinDescription?: ProteinSection;
    // NOTE: below, added
    subcellularLocations?: Array<{
      location?: { value: string };
      topology?: { value: string };
    }>;
  };
  keyword?: {
    // category?:
    //   | 'BIOLOGICAL_PROCESS'
    //   | 'CELLULAR_COMPONENT'
    //   | 'CODING_SEQUENCE_DIVERSITY'
    //   | 'DEVELOPMENTAL_STAGE'
    //   | 'DISEASE'
    //   | 'DOMAIN'
    //   | 'LIGAND'
    //   | 'MOLECULAR_FUNCTION'
    //   | 'PTM'
    //   | 'TECHNICAL_TERM'
    //   | 'UNKNOWN';
    category?: string;
    name?: string;
    id?: string;
    evidences?: Evidence[];
  };
  annotationType?: 'ANNOTATION' | 'POSITIONAL_FEATURE';
};

type Position = {
  value?: number;
  modifier?: 'EXACT' | 'OUTSIDE' | 'UNKNOWN' | 'UNSURE';
};

export type Range = {
  start?: Position;
  end?: Position;
};

export type Condition = {
  conditionValues?: Array<{
    cvId?: string;
    value?: string;
  }>;
  type?: string;
  range?: Range;
  tag?: {
    pattern?: string;
    value?: string;
  };
  // negative?: boolean;
  isNegative?: boolean;
};

export type ConditionSet = {
  conditions?: Condition[];
};

export type RuleException = {
  // accessions?: Array<{
  //   validAccession?: boolean;
  //   value?: string;
  // }>;
  accessions?: string[];
  note?: string;
  category?: string;
  annotation?: {
    annotationType?: 'ANNOTATION' | 'POSITIONAL_FEATURE';
    // NOTE: below, added
    proteinDescription?: ProteinSection;
  };
};

export type Rule = {
  annotations?: Annotation[];
  conditionSets?: ConditionSet[];
  ruleExceptions?: RuleException[];
};

export type CaseRule = {
  overallStatsExempted?: boolean;
  annotations?: Annotation[];
  conditionSets?: ConditionSet[];
  ruleExceptions?: RuleException[];
};

export type SAMFeatureSet = {
  samTrigger?: {
    // samTriggerType?: 'TRANSMEMBRANE' | 'SIGNAL' | 'COILED_COIL';
    samTriggerType?: string;
    expectedHits?: Range;
  };
  annotations?: Annotation[];
  conditions?: Condition[];
};

export type PositionFeatureSet = {
  positionalFeatures?: Array<{
    inGroup?: boolean;
    value?: string;
    type?: string;
    pattern?: string;
    position?: Range;
    annotationType?: 'ANNOTATION' | 'POSITIONAL_FEATURE';
  }>;
  uniProtKBAccession?: {
    validAccession?: boolean;
    value?: string;
  };
  alignmentSignature?: string;
  annotations?: Annotation[];
  ruleExceptions?: RuleException[];
  conditions?: Condition[];
  tag?: string;
};

export type AAModel = {
  // id: string; // ID field is different for UniRule and ARBA
  information: Information;
  mainRule: Rule;
  otherRules?: CaseRule[];
  samFeatureSets?: SAMFeatureSet[];
  positionFeatureSets?: PositionFeatureSet[];
  statistics: Statistics;
  createdDate: string; // YYYY-MM-DD
  modifiedDate: string; // YYYY-MM-DD
};
