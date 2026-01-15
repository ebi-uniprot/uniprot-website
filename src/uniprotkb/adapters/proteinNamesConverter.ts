import { type ProteinNamesData } from './namesAndTaxonomyConverter';

const convertProteinNames = (data: ProteinNamesData) => {
  let recommendedName;
  let shortNames;
  if (data.recommendedName) {
    recommendedName = data.recommendedName.fullName.value;
    if (data.recommendedName.shortNames) {
      shortNames = data.recommendedName.shortNames
        .map((shortName) => shortName.value)
        .join(', ');
    }
  }
  const alternativeNames: string[] = [];
  const ecNumbers = data.recommendedName?.ecNumbers;
  if (ecNumbers && ecNumbers.length > 0) {
    alternativeNames.push(...ecNumbers.map((ec) => ec.value));
  }
  const { submissionNames } = data;
  if (submissionNames && submissionNames.length > 0) {
    alternativeNames.push(
      ...submissionNames.map((submissionName) => submissionName.fullName.value)
    );
  }
  const alternativeNameArray = data.alternativeNames;
  if (alternativeNameArray && alternativeNameArray.length > 0) {
    alternativeNames.push(
      ...alternativeNameArray.map((altName) => altName.fullName.value)
    );
  }
  return { recommendedName, shortNames, alternativeNames };
};

export default convertProteinNames;
