export type DiseasesAPIModel = {};

export type DiseasesUIModel = DiseasesAPIModel & {
  // any addition/change by the converter
};

const diseasesConverter = (data: DiseasesAPIModel): DiseasesUIModel => ({
  ...data,
});

export default diseasesConverter;
