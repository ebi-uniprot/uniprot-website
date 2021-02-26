type Statistics = {
  computationallyMappedProteinCount: number;
  largeScale: boolean;
  communityMappedProteinCount: number;
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

export type CitationsAPIModel = {
  statistics: Statistics;
  citation: Citation;
};

export type CitationsUIModel = CitationsAPIModel & {
  // any addition/change by the converter
};

const citationsConverter = (data: CitationsAPIModel): CitationsUIModel => ({
  ...data,
});

export default citationsConverter;
