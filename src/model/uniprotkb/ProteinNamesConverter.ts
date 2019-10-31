import idx from 'idx';
import { ProteinNamesData } from './sections/NamesAndTaxonomyConverter';

const convertProteinNames = (data: ProteinNamesData) => {
  let recommendedName;
  let shortNames;
  if (data.recommendedName) {
    recommendedName = data.recommendedName.fullName.value;
    if (data.recommendedName.shortNames) {
      shortNames = data.recommendedName.shortNames
        .map(shortName => shortName.value)
        .join(', ');
    }
  }
  const alternativeNames: string[] = [];
  const ecNumbers = idx(data, o => o.recommendedName.ecNumbers);
  if (ecNumbers && ecNumbers.length > 0) {
    alternativeNames.push(...ecNumbers.map(ec => ec.value));
  }
  const submissionNames = idx(data, o => o.submissionNames);
  if (submissionNames && submissionNames.length > 0) {
    alternativeNames.push(
      ...submissionNames.map(submissionName => submissionName.fullName.value)
    );
  }
  const alternativeNameArray = idx(data, o => o.alternativeNames);
  if (alternativeNameArray && alternativeNameArray.length > 0) {
    alternativeNames.push(
      ...alternativeNameArray.map(altName => altName.fullName.value)
    );
  }
  return { recommendedName, shortNames, alternativeNames };
};

export default convertProteinNames;
