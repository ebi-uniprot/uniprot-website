import { Statistics } from '../../../shared/types/apiModel';

export type DatabaseAPIModel = {
  pubMedId: string;
  abbrev: string;
  doiId: string;
  linkType: string;
  dbUrl: string;
  category: string;
  name: string;
  id: string;
  servers: string[];
  statistics?: Statistics;
};

export type DatabaseUIModel = DatabaseAPIModel & {
  // any addition/change by the converter
};

const databaseConverter = (data: DatabaseAPIModel): DatabaseUIModel => ({
  ...data,
});

export default databaseConverter;
