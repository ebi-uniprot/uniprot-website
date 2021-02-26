export type DatabaseAPIModel = {};

export type DatabaseUIModel = DatabaseAPIModel & {
  // any addition/change by the converter
};

const databaseConverter = (data: DatabaseAPIModel): DatabaseUIModel => ({
  ...data,
});

export default databaseConverter;
