import { Statistics } from '../../../shared/types/apiModel';

type GO = {
  name: string;
  // Swagger says "id"
  // id: string;
  // But endpoint gives
  goId: `GO:${string}`;
};

export type KeywordNameID = {
  name: string;
  id: `KW-${string}`;
};

export type KeywordsLite = {
  keyword: KeywordNameID;
  sites?: string[];
  definition: string;
  synonyms?: string[];
  geneOntologies?: GO[];
  category?: KeywordNameID;
  children?: KeywordsLite[];
  links?: string[];
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
