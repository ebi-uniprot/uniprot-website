import { Lineage, Xref, Citation } from '../../shared/types/apiModel';
import { OrganismData } from '../../uniprotkb/adapters/namesAndTaxonomyConverter';

export type GenomeAnnotation = {
  source: string;
  url?: string;
};

export type Component = {
  name: string;
  description: string;
  genomeAnnotation: GenomeAnnotation;
  proteomeCrossReferences: Xref[];
  proteinCount: number; // used in the entry for each component TODO: eventually will be supported by backend in 2021_02 - 2021_03
};

enum CpdStatus {
  CLOSE_TO_STANDARD = 'Close to Standard',
  STANDARD = 'Standard',
  OUTLIER = 'Outlier',
  UNKNOWN = 'Unknown',
}

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
  cpdReport: CpdReport;
  buscoReport?: BuscoReport;
};

export type GenomeAssembly = {
  source: string;
  assemblyId: string;
  genomeAssemblyUrl: string;
  level: string; // Genome representation (RefSeq)
};

export type RedundantProteome = {
  id: string;
  similarity: number;
};

export enum ProteomeType {
  REFERENCE_AND_REPRESENTATIVE = 'Reference and representative proteome',
  REFERENCE = 'Reference proteome',
  REPRESENTATIVE = 'Representative proteome',
  REDUNDANT = 'Redundant proteome',
  OTHER = 'Other proteome',
  EXCLUDED = 'Excluded',
}

export type ProteomesAPIModel = {
  id: string;
  taxonomy: OrganismData;
  modified: string;
  proteomeType: ProteomeType;
  components: Component[];
  citations: Citation[];
  annotationScore: number;
  superkingdom: string;
  proteomeCompletenessReport: ProteomeCompletenessReport;
  genomeAssembly: GenomeAssembly;
  geneCount: number;
  genomeAnnotation: GenomeAnnotation;
  taxonLineage: Lineage[];
  strain: string;
  panproteome: string;
  description: string;
  redundantProteomes: RedundantProteome[];
  proteinCount: number; // use this in the results table - calculated sum of the components proteinCount: components.reduce((total, { proteinCount }) => proteinCount + total, 0)  TODO: eventually will be supported by backend in in 2021_02 - 2021_03
};

export type ProteomesUIModel = ProteomesAPIModel & {
  // any addition/change by the converter
};

const proteomesConverter = (data: ProteomesAPIModel): ProteomesUIModel => ({
  ...data,
});

export default proteomesConverter;
