export type DatabaseAPIModel = {
  pubMedId: string;
  abbrev: string;
  doiId: string;
  linkType: string;
  dbUrl: string;
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
  category: string;
  name: string;
  id: string;
  server: string;
};

export type DatabaseUIModel = DatabaseAPIModel & {
  // any addition/change by the converter
};

const databaseConverter = (data: DatabaseAPIModel): DatabaseUIModel => ({
  ...data,
});

export default databaseConverter;
