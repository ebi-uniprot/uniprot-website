type GO = {
  name: string;
  // Swagger says "id"
  // id: string;
  // But endpoint gives
  goId: `GO:${string}`;
};

type Statistics = {
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

type KeywordNameID = {
  name: string;
  id: `KW-${string}`;
};

export type KeywordsLite = {
  keyword: KeywordNameID;
  sites?: string[];
  definition: string;
  synonyms?: string[];
  geneOntologies?: GO[];
  // TODO: change to enum of possible values? example: 'BIOLOGICAL_PROCESS'
  category?: string;
  children?: KeywordsLite[];
};

export type KeywordsAPIModel = KeywordsLite & {
  accession?: string;
  statistics: Statistics;
  parents?: KeywordsLite[];
};

export type KeywordsUIModel = KeywordsAPIModel & {
  // any addition/change by the converter
};

const keywordsConverter = (data: KeywordsAPIModel): KeywordsUIModel => ({
  ...data,
});

export default keywordsConverter;
