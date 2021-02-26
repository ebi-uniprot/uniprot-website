type Keyword = {
  name: string;
  id: string;
};

type XRef = {
  databaseType: string;
  properties: string[];
  id: string;
};

export type DiseasesAPIModel = {
  keywords: Keyword[];
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
  alternativeNames: string[];
  acronym: string;
  crossReferences: XRef[];
  name: string;
  id: string;
  definition: string;
};

export type DiseasesUIModel = DiseasesAPIModel & {
  // any addition/change by the converter
};

const diseasesConverter = (data: DiseasesAPIModel): DiseasesUIModel => ({
  ...data,
});

export default diseasesConverter;
