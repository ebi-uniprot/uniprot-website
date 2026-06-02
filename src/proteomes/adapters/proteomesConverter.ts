import {
  type Lineage,
  type Statistics,
  type Xref,
} from '../../shared/types/apiModel';
import { type Citation } from '../../supporting-data/citations/adapters/citationsConverter';
import { type TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type AnnotationScoreValue } from '../../uniprotkb/adapters/uniProtkbConverter';

export type GenomeAnnotation = {
  source: string;
  url?: string;
};

export type Component = {
  name: string;
  description?: string;
  genomeAnnotation: GenomeAnnotation;
  proteomeCrossReferences?: Xref[];
  proteinCount: number;
};

export type CpdStatus =
  | 'Close to Standard'
  | 'Standard'
  | 'Outlier'
  | 'Outlier (high value)'
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

export type RelatedProteome = {
  proteomeId: string;
  similarity: number;
  taxonomy: Pick<TaxonomyDatum, 'taxonId'>;
};

export type PanproteomeTaxon = {
  taxonId: number;
};

export type EnrichedRelatedProteome = RelatedProteome & {
  scientificName?: string;
  proteomeType?: ProteomeType;
};

export type ProteomeType =
  | 'Reference proteome'
  | 'Non-reference proteome'
  | 'Excluded';

export type ProteomesAPIModel = {
  id: string;
  taxonomy: TaxonomyDatum;
  modified: string;
  proteomeType: ProteomeType;
  components?: Component[];
  exclusionReasons?: string[];
  citations?: Citation[];
  annotationScore: AnnotationScoreValue;
  superkingdom: string;
  proteomeCompletenessReport?: ProteomeCompletenessReport;
  genomeAssembly?: GenomeAssembly;
  geneCount: number;
  genomeAnnotation: GenomeAnnotation;
  taxonLineage: Lineage[];
  strain?: string;
  isolate?: string;
  panproteomeTaxon?: PanproteomeTaxon;
  description: string;
  relatedProteomes?: RelatedProteome[];
  proteinCount: number; // use this in the results table - calculated sum of the components proteinCount: components.reduce((total, { proteinCount }) => proteinCount + total, 0)
  proteomeStatistics: Statistics;
};

export type ProteomesUIModel = ProteomesAPIModel & {
  relatedProteomes?: EnrichedRelatedProteome[];
};

const proteomesConverter = (
  data: ProteomesAPIModel,
  similarProteomesData?: ProteomesAPIModel[]
): ProteomesUIModel => {
  const dataById = new Map(similarProteomesData?.map((p) => [p.id, p]));
  return {
    ...data,
    relatedProteomes: data.relatedProteomes?.map((rp) => {
      const resolved = dataById.get(rp.proteomeId);
      return {
        ...rp,
        scientificName: resolved?.taxonomy?.scientificName,
        proteomeType: resolved?.proteomeType,
      };
    }),
  };
};

export default proteomesConverter;
