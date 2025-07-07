export type AgrParalogs = {
  results: AgrParalogsResult[];
  total: number;
  returnedRecords: number;
  requestDuration: string;
  requestDate: string;
};

export type AgrParalogsResult = {
  category: 'gene_to_gene_paralogy';
  searchable: boolean;
  geneToGeneParalogy: GeneToGeneParalogy;
};

type GeneToGeneParalogy = {
  internal: boolean;
  obsolete: boolean;
  subjectGene: Gene;
  objectGene: Gene;
  predictionMethodsMatched: PredictionMethod[];
  predictionMethodsNotMatched: PredictionMethod[];
  predictionMethodsNotCalled: PredictionMethod[];
  rank: number;
  length: number;
  similarity: number;
  identity: number;
  notInternalOrObsolete: boolean;
};

type Gene = {
  type: 'Gene';
  internal: boolean;
  obsolete: boolean;
  primaryExternalId: string;
  taxon: Taxon;
  geneSymbol: GeneSymbolName;
  geneFullName: GeneSymbolName;
  notInternalOrObsolete: boolean;
  dateCreated: string;
};

type GeneSymbolName = {
  internal: boolean;
  obsolete: boolean;
  formatText: string;
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

export type PredictionMethod = {
  internal: boolean;
  obsolete: boolean;
  name: PredictionMethodName;
  notInternalOrObsolete: boolean;
};

export type PredictionMethodName =
  | 'Ensembl Compara'
  | 'OrthoFinder'
  | 'InParanoid'
  | 'PhylomeDB'
  | 'PANTHER'
  | 'HGNC'
  | 'SGD'
  | 'OrthoInspector'
  | 'OMA'
  | 'SonicParanoid';
