import { TaxonomyUIModel } from './taxonomyConverter';

import { Namespace, NamespaceLabels } from '../../../shared/types/namespaces';

export default (data: TaxonomyUIModel) => {
  let organismName: string | number | undefined;
  const organismScientificName = data.scientificName;
  const organismCommonName = data.commonName;
  if (organismScientificName && organismCommonName) {
    organismName = `${organismScientificName} (${organismCommonName})`;
  } else {
    organismName = organismScientificName || organismCommonName || data.taxonId;
  }
  return `${organismName} | ${NamespaceLabels[Namespace.taxonomy]}`;
};
