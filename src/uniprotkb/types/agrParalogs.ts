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
  subjectGene: Gene;
  objectGene: Gene;
  predictionMethodsMatched: PredictionMethod[];
  predictionMethodsNotMatched: PredictionMethod[];
  predictionMethodsNotCalled: PredictionMethod[];
  rank: number;
  length: number;
  similarity: number;
  identity: number;
};

type DataProviderCrossReference = {
  referencedCurie: string;
  displayName: string;
  resourceDescriptorPage: {
    resourceDescriptor: {
      prefix: string;
      name: string;
      defaultUrlTemplate: string;
    };
    name: string;
    urlTemplate: string;
  };
};

type Gene = {
  type: 'Gene';
  primaryExternalId: string;
  dataProviderCrossReference: DataProviderCrossReference;
  taxon: Taxon;
  geneSymbol: GeneSymbolName;
  geneFullName: GeneSymbolName;
  dateCreated: string;
};

type GeneSymbolName = {
  formatText: string;
  displayText: string;
};

type Species = {
  fullName: string;
  abbreviation: string;
  displayName: string;
  phylogeneticOrder: number;
};

type Taxon = {
  curie: string;
  name: string;
  descendantCount: number;
  species: Species;
};

export type PredictionMethod = {
  name: PredictionMethodName;
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
