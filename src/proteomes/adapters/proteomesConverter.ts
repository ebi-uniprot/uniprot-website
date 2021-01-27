export type Taxonomy = {
  scientificName: string;
  taxonId: number;
  commonName: string;
  mnemonic: string;
  synonyms: string[];
};

export type GenomeAnnotation = {
  source: string;
  url?: string;
};

export type ProteomeCrossReference = {
  database: string;
  id: string;
};

export type Component = {
  name: string;
  description: string;
  genomeAnnotation: GenomeAnnotation;
  proteomeCrossReferences: ProteomeCrossReference[];
};

export type CitationCrossReference = {
  database: string;
  id: string;
};

export type Citation = {
  citationType: string;
  authors: string[];
  citationCrossReferences: CitationCrossReference[];
  title: string;
  publicationDate: string;
  journal: string;
  firstPage: string;
  lastPage: string;
  volume: string;
  submissionDatabase: string;
  authoringGroup: string[];
};

export type CpdReport = {
  proteomeCount: number;
  stdCdss: number;
  averageCdss: number;
  confidence: number;
  status: string;
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
  buscoReport: BuscoReport;
};

export type GenomeAssembly = {
  source: string;
  assemblyId: string;
  genomeAssemblyUrl: string;
  level: string;
};

export type TaxonLineage = {
  scientificName: string;
  taxonId: number;
  hidden: boolean;
};

export type RedundantProteome = {
  id: string;
  similarity: number;
};

export type Result = {
  id: string;
  taxonomy: Taxonomy;
  modified: string;
  proteomeType: string;
  components: Component[];
  citations: Citation[];
  annotationScore: number;
  superkingdom: string;
  proteomeCompletenessReport: ProteomeCompletenessReport;
  genomeAssembly: GenomeAssembly;
  geneCount: number;
  genomeAnnotation: GenomeAnnotation;
  taxonLineage: TaxonLineage[];
  strain: string;
  panproteome: string;
  description: string;
  redundantProteomes: RedundantProteome[];
};

export type ProteomesAPIModel = {
  results: Result[];
};

export type ProteomesUIModel = ProteomesAPIModel & {
  // any addition/change by the converter
};

const proteomesConverter = (data: ProteomesAPIModel): ProteomesUIModel => ({
  ...data,
});

export default proteomesConverter;
