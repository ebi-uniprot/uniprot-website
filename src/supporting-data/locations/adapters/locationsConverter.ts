export type LocationsAPIModel = {};

export type LocationsUIModel = LocationsAPIModel & {
  // any addition/change by the converter
};

const locationsConverter = (data: LocationsAPIModel): LocationsUIModel => ({
  ...data,
});

export default locationsConverter;
