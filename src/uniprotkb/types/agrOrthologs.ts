export type AgrOrthologs = {
  results: AgrOrthologsResult[];
  total: number;
  returnedRecords: number;
  requestDate: string;
};

export type AgrOrthologsResult = {
  category: Category;
  searchable: boolean;
  stringencyFilter: StringencyFilter;
  geneAnnotations: GeneAnnotation[];
  geneAnnotationsMap: { [key: string]: GeneAnnotation };
  geneToGeneOrthologyGenerated: GeneToGeneOrthologyGenerated;
};

type Category = 'gene_to_gene_orthology';

type GeneAnnotation = {
  hasDiseaseAnnotations: boolean;
  hasExpressionAnnotations: boolean;
  geneIdentifier: string;
};

type GeneToGeneOrthologyGenerated = {
  subjectGene: Gene;
  objectGene: Gene;
  isBestScore: Score;
  isBestScoreReverse: Score;
  confidence: Confidence;
  strictFilter: boolean;
  moderateFilter: boolean;
  predictionMethodsMatched: PredictionMethod[];
  predictionMethodsNotMatched?: PredictionMethod[];
  predictionMethodsNotCalled?: PredictionMethod[];
};

type Confidence = {
  name: 'moderate' | 'low' | 'high';
};

type Score = {
  name: 'Yes' | 'No';
};

export type PredictionMethodName =
  | 'Hieranoid'
  | 'SonicParanoid'
  | 'InParanoid'
  | 'Xenbase'
  | 'ZFIN'
  | 'HGNC'
  | 'OrthoFinder'
  | 'PANTHER'
  | 'OMA'
  | 'Ensembl Compara'
  | 'OrthoInspector'
  | 'PhylomeDB';

type Gene = {
  type: 'Gene';
  primaryExternalId: string;
  taxon: Taxon;
  geneSymbol: GeneSymbol;
};

type PredictionMethod = {
  name: PredictionMethodName;
};

type GeneSymbol = {
  displayText: string;
};

type Taxon = {
  curie: string;
  name: string;
  descendantCount: number;
};

type StringencyFilter = 'all' | 'stringent';
