import { Lineage, Xref } from '../../shared/types/apiModel';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { Citation } from '../../supporting-data/citations/adapters/citationsConverter';

export type GenomeAnnotation = {
  source: string;
  url?: string;
};

export type Component = {
  name: string;
  description: string;
  genomeAnnotation: GenomeAnnotation;
  proteomeCrossReferences?: Xref[];
  proteinCount: number; // used in the entry for each component TODO: eventually will be supported by backend in 2021_02 - 2021_03
};

export type CpdStatus =
  | 'Close to Standard'
  | 'Standard'
  | 'Outlier'
  | 'Unknown';

export type CpdReport = {
  proteomeCount: number;
  stdCdss: number;
  averageCdss: number;
  confidence: number;
  status: CpdStatus;
};

export type BuscoReport = {
  complete: number;
  completeSingle: number;
  completeDuplicated: number;
  fragmented: number;
  missing: number;
  total: number;
  lineageDb: string;
  score: number;
};

export type ProteomeCompletenessReport = {
  cpdReport?: CpdReport;
  buscoReport?: BuscoReport;
};

export type GenomeAssembly = {
  source: string;
  assemblyId: string;
  genomeAssemblyUrl?: string;
  level: string; // Genome representation
};

export type RedundantProteome = {
  id: string;
  similarity: number;
};

export type ProteomeType =
  | 'Reference and representative proteome'
  | 'Reference proteome'
  | 'Representative proteome'
  | 'Redundant proteome'
  | 'Other proteome'
  | 'Excluded';

export type ProteomesAPIModel = {
  id: string;
  taxonomy: TaxonomyDatum;
  modified: string;
  proteomeType: ProteomeType;
  components?: Component[];
  citations: Citation[];
  annotationScore: number;
  superkingdom: string;
  proteomeCompletenessReport: ProteomeCompletenessReport;
  genomeAssembly?: GenomeAssembly;
  geneCount: number;
  genomeAnnotation: GenomeAnnotation;
  taxonLineage: Lineage[];
  strain?: string;
  isolate?: string;
  panproteome?: string;
  description: string;
  redundantProteomes?: RedundantProteome[];
  redundantTo?: string;
  proteinCount: number; // use this in the results table - calculated sum of the components proteinCount: components.reduce((total, { proteinCount }) => proteinCount + total, 0)  TODO: eventually will be supported by backend in in 2021_02 - 2021_03
};

export type ProteomesUIModel = ProteomesAPIModel & {
  // any addition/change by the converter
};

const proteomesConverter = (data: ProteomesAPIModel): ProteomesUIModel => ({
  ...data,
});

export default proteomesConverter;
