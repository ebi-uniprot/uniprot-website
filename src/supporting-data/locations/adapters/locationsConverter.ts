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

type Keyword = {
  name: string;
  id: string;
};

export type LocationsLite = {
  id: `SL-${string}`;
  name: string;
  definition: string;
  content: string;
  keyword?: Keyword;
  // TODO: change to enum of possible values, example: 'LOCATION'
  // TODO: review, maybe it's always 'LOCATION'...
  category: string;
  geneOntologies: GO[];
  note?: string;
  synonyms?: string[];
};

export type LocationsAPIModel = LocationsLite & {
  isA?: LocationsLite[];
  partOf?: LocationsLite[];
  statistics: Statistics;
  links?: string[];
  references?: string[];
};

export type LocationsUIModel = LocationsAPIModel & {
  // any addition/change by the converter
};

const locationsConverter = (data: LocationsAPIModel): LocationsUIModel => ({
  ...data,
});

export default locationsConverter;
