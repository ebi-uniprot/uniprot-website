import { SetRequired } from 'type-fest';
import { SearchResults } from '../../shared/types/results';

export type HelpAPIModel = {
  id: string;
  title: string;
  lastModified: string;
  releaseDate?: string; // specific to news / release notes
  categories?: string[];

  type: 'help' | 'releaseNotes';
  content?: string;

  matches?: {
    // key is one of the keys of the top level object (except "matches" itself)
    [key in Exclude<keyof HelpAPIModel, 'matches'>]?: string[];
  };
};

export type HelpUIModel = HelpAPIModel & {
  // any addition/change by the converter
};

export type HelpSearchResponse = SearchResults<HelpAPIModel>;

export type HelpEntryResponse = SetRequired<
  Omit<HelpAPIModel, 'matches'>,
  'content'
>;

const helpConverter = (data: HelpAPIModel): HelpUIModel => ({
  ...data,
});

export default helpConverter;
