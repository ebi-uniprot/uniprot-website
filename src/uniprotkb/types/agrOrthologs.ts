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
  internal: boolean;
  obsolete: boolean;
  subjectGene: Gene;
  objectGene: Gene;
  isBestScore: Score;
  isBestScoreReverse: Score;
  confidence: Confidence;
  strictFilter: boolean;
  moderateFilter: boolean;
  predictionMethodsMatched: Method[];
  predictionMethodsNotMatched?: Method[];
  predictionMethodsNotCalled?: Method[];
  notInternalOrObsolete: boolean;
};

type Confidence = {
  internal: boolean;
  obsolete: boolean;
  name?: 'moderate' | 'low' | 'high';
  notInternalOrObsolete: boolean;
  displayText?: string;
};

type Score = {
  internal: false;
  obsolete: false;
  name: 'Yes' | 'No';
  notInternalOrObsolete: true;
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
  type: Type;
  internal: boolean;
  obsolete: boolean;
  primaryExternalId: string;
  taxon: Taxon;
  geneSymbol: GeneSymbol;
  notInternalOrObsolete: boolean;
};

type Method = {
  internal: boolean;
  obsolete: boolean;
  name: PredictionMethodName;
  notInternalOrObsolete: boolean;
};

type GeneSymbol = {
  internal: boolean;
  obsolete: boolean;
  displayText: string;
  notInternalOrObsolete: boolean;
};

type Taxon = {
  internal: boolean;
  obsolete: boolean;
  curie: string;
  name: string;
  childCount: number;
  descendantCount: number;
  notInternalOrObsolete: boolean;
};

type Type = 'Gene';

type StringencyFilter = 'all' | 'stringent';
