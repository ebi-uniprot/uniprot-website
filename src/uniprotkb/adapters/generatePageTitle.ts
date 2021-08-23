import { UniProtkbUIModel } from './uniProtkbConverter';

import { Namespace, NamespaceLabels } from '../../shared/types/namespaces';

export default (data: UniProtkbUIModel) => {
  const geneName =
    data['names-and-taxonomy'].geneNamesData?.[0].geneName?.value;
  const proteinName =
    data['names-and-taxonomy'].proteinNamesData?.recommendedName?.fullName
      .value ||
    data['names-and-taxonomy'].proteinNamesData?.submissionNames?.[0].fullName
      .value;
  let organismName: string | number | undefined;
  {
    const organismScientificName =
      data['names-and-taxonomy'].organismData?.scientificName;
    const organismCommonName =
      data['names-and-taxonomy'].organismData?.commonName;
    if (organismScientificName && organismCommonName) {
      organismName = `${organismScientificName} (${organismCommonName})`;
    } else {
      organismName =
        organismScientificName ||
        organismCommonName ||
        data['names-and-taxonomy'].organismData?.taxonId;
    }
  }
  return `${[geneName, proteinName, organismName]
    .filter(Boolean)
    .join(' - ')} | ${NamespaceLabels[Namespace.uniprotkb]}`;
};
