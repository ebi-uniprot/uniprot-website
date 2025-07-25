import { FormParameters } from '../types/blastFormParameters';

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3848038/
export const getAutoMatrixFor = (
  sequence?: string
): FormParameters['matrix'] => {
  if (!sequence?.length) {
    return 'BLOSUM62';
  }
  if (sequence.length <= 34) {
    return 'PAM30';
  }
  if (sequence.length <= 49) {
    return 'PAM70';
  }
  if (sequence.length <= 85) {
    return 'BLOSUM80';
  }
  return 'BLOSUM62';
};
