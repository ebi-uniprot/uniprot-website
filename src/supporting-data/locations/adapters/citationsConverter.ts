export type CitationsAPIModel = {};

export type CitationsUIModel = CitationsAPIModel & {
  // any addition/change by the converter
};

const citationsConverter = (data: CitationsAPIModel): CitationsUIModel => ({
  ...data,
});

export default citationsConverter;
