import { Statistics } from '../../../shared/types/apiModel';
import { KeywordNameID } from '../../keywords/adapters/keywordsConverter';

type XRef = {
  databaseType: string;
  properties?: string[];
  id: string;
};

export type DiseasesAPIModel = {
  keywords?: KeywordNameID[];
  alternativeNames?: string[];
  acronym: string;
  crossReferences: XRef[];
  name: string;
  id: string;
  definition: string;
  statistics?: Statistics;
};

export type DiseasesUIModel = DiseasesAPIModel & {
  // any addition/change by the converter
};

const diseasesConverter = (data: DiseasesAPIModel): DiseasesUIModel => ({
  ...data,
});

export default diseasesConverter;
