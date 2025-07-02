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
  predictionMethodsMatched: PredictionMethods[];
  predictionMethodsNotMatched: PredictionMethods[];
  predictionMethodsNotCalled: PredictionMethods[];
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
  curie: 'NCBITaxon:6239';
  name: 'Caenorhabditis elegans';
  childCount: number;
  descendantCount: number;
  notInternalOrObsolete: boolean;
};

type PredictionMethods = {
  internal: boolean;
  obsolete: boolean;
  name: PredictionMethodsMatchedName;
  notInternalOrObsolete: boolean;
};

export type PredictionMethodsMatchedName =
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
