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
  links?: string[];
  definition?: string;
  synonyms?: string[];
  geneOntologies?: GO[];
  category?: KeywordNameID;
  parents?: KeywordsLite[];
};

export type KeywordsAPIModel = KeywordsLite & {
  accession?: string;
  statistics?: Statistics;
  children?: KeywordsLite[];
};

export type KeywordsUIModel = KeywordsAPIModel & {
  // any addition/change by the converter
};

const keywordsConverter = (data: KeywordsAPIModel): KeywordsUIModel => ({
  ...data,
});

export default keywordsConverter;
