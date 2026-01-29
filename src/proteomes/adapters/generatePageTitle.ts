import { type ProteomesUIModel } from './proteomesConverter';

export default (data: ProteomesUIModel) => {
  let organismName: string | number | undefined;
  const organismScientificName = data.taxonomy.scientificName;
  const organismCommonName = data.taxonomy.commonName;
  if (organismScientificName && organismCommonName) {
    organismName = `${organismScientificName} (${organismCommonName})`;
  } else {
    organismName =
      organismScientificName || organismCommonName || data.taxonomy.taxonId;
  }
  return organismName;
};
