type GO = {
  name: string;
  id: string;
};

type Statistics = {
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

type KeywordNameID = {
  name: string;
  id: string;
};

export type KeywordsAPIModel = {
  geneOntologies: GO[];
  sites: string[];
  accession: string;
  statistics: Statistics;
  synonyms: string[];
  // TODO: change to enum of possible values, example: 'BIOLOGICAL_PROCESS'
  category: string;
  definition: string;
  keyword: KeywordNameID;
  parents: null[]; // TODO: review
  children: null[]; // TODO: review
};

export type KeywordsUIModel = KeywordsAPIModel & {
  // any addition/change by the converter
};

const keywordsConverter = (data: KeywordsAPIModel): KeywordsUIModel => ({
  ...data,
});

export default keywordsConverter;
