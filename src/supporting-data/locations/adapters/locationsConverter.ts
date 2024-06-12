import { Statistics } from '../../../shared/types/apiModel';

type GO = {
  name: string;
  // Swagger says "id"
  // id: string;
  // But endpoint gives
  goId: `GO:${string}`;
};

type Keyword = {
  name: string;
  id: string;
};

export type LocationsLite = {
  id: `SL-${string}`;
  name: string;
  definition: string;
  // NOTE: should that be a keyword returned by backend?
  content: string;
  keyword?: Keyword;
  // NOTE: should that be a keyword returned by backend?
  category: string;
  geneOntologies: GO[];
  note?: string;
  synonyms?: string[];
  isA?: LocationsLite[];
  partOf?: LocationsLite[];
  links?: string[];
};

export type LocationsAPIModel = LocationsLite & {
  statistics?: Statistics;
  references?: string[];
};

export type LocationsUIModel = LocationsAPIModel & {
  // any addition/change by the converter
};

const locationsConverter = (data: LocationsAPIModel): LocationsUIModel => ({
  ...data,
});

export default locationsConverter;
