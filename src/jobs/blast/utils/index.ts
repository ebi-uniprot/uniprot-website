import { type FormParameters } from '../types/blastFormParameters';

// Map a comma-separated list of taxon IDs (as returned by the BLAST parameters
// endpoint) to scientific-name labels, falling back to the bare ID when a name
// hasn't been resolved
export const taxonIdsToLabels = (
  csv: string | undefined,
  taxonIdToLabel: Map<string, string>
): string[] =>
  (csv || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .map((id) => taxonIdToLabel.get(id) || id);

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
