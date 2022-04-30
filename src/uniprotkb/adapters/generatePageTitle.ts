import { UniProtkbUIModel } from './uniProtkbConverter';

import EntrySection from '../types/entrySection';

export default (data: UniProtkbUIModel) => {
  const geneName =
    data[EntrySection.NamesAndTaxonomy].geneNamesData?.[0].geneName?.value;
  const proteinName =
    data[EntrySection.NamesAndTaxonomy].proteinNamesData?.recommendedName
      ?.fullName.value ||
    data[EntrySection.NamesAndTaxonomy].proteinNamesData?.submissionNames?.[0]
      .fullName.value;
  let organismName: string | number | undefined;
  {
    const organismScientificName =
      data[EntrySection.NamesAndTaxonomy].organismData?.scientificName;
    const organismCommonName =
      data[EntrySection.NamesAndTaxonomy].organismData?.commonName;
    if (organismScientificName && organismCommonName) {
      organismName = `${organismScientificName} (${organismCommonName})`;
    } else {
      organismName =
        organismScientificName ||
        organismCommonName ||
        data[EntrySection.NamesAndTaxonomy].organismData?.taxonId;
    }
  }
  return `${[geneName, proteinName, organismName].filter(Boolean).join(' - ')}`;
};
