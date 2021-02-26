type GO = {
  name: string;
  id: string;
};

type Statistics = {
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

type Keyword = {
  name: string;
  id: string;
};

export type LocationsAPIModel = {
  references: string[];
  geneOntologies: GO[];
  note: string;
  isA: null[]; // TODO: review
  partOf: null[]; // TODO: review
  statistics: Statistics;
  synonyms: string[];
  // TODO: change to enum of possible values, example: 'LOCATION'
  // TODO: review, maybe it's always 'LOCATION'...
  category: string;
  name: string;
  id: string;
  definition: string;
  content: string;
  keyword: Keyword;
  links: string[];
};

export type LocationsUIModel = LocationsAPIModel & {
  // any addition/change by the converter
};

const locationsConverter = (data: LocationsAPIModel): LocationsUIModel => ({
  ...data,
});

export default locationsConverter;
