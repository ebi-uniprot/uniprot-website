import { FacetObject } from '../../uniprotkb/types/responseTypes';

export type HelpAPIModel = {
  id: string;
  title: string;
  lastModified: string;
  categories: string[];

  content?: string;

  matches?: {
    // key is one of the keys of the top level object (except "matches" itself)
    [key in Exclude<keyof HelpAPIModel, 'matches'>]?: string[];
  };
};

export type HelpUIModel = HelpAPIModel & {
  // any addition/change by the converter
};

export type HelpSearchResponse = {
  results: HelpAPIModel[];
  facets?: FacetObject[];
};

export type HelpEntryResponse = Omit<HelpAPIModel, 'matches'>;

const helpConverter = (data: HelpAPIModel): HelpUIModel => ({
  ...data,
});

export default helpConverter;
