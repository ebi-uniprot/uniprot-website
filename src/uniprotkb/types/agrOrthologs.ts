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
  isBestScore: Confidence;
  isBestScoreReverse: Confidence;
  confidence: Confidence;
  strictFilter: boolean;
  moderateFilter: boolean;
  predictionMethodsMatched: Confidence[];
  predictionMethodsNotMatched?: Confidence[];
  predictionMethodsNotCalled?: Confidence[];
  notInternalOrObsolete: boolean;
};

type Confidence = {
  internal: boolean;
  obsolete: boolean;
  name?: string;
  notInternalOrObsolete: boolean;
  displayText?: string;
};

type Gene = {
  type: Type;
  internal: boolean;
  obsolete: boolean;
  primaryExternalId: string;
  taxon: Taxon;
  geneSymbol: Confidence;
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
