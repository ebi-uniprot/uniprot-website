import { type FormParameters } from '../types/blastFormParameters';

// Split a comma-separated list of taxon IDs, as returned by the BLAST
// parameters endpoint, into individual IDs
export const parseTaxonIds = (csv: string | undefined): string[] =>
  (csv || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

// Map a comma-separated list of taxon IDs to scientific-name labels, falling
// back to the bare ID when a name hasn't been resolved
export const taxonIdsToLabels = (
  csv: string | undefined,
  taxonIdToLabel: Map<string, string>
): string[] => parseTaxonIds(csv).map((id) => taxonIdToLabel.get(id) || id);

// Summarise a list of taxon IDs as a single label plus a count of the rest,
// eg "Homo sapiens [9606] and 3 more". Used in the results heading, where an
// inline expandable list would put a focusable control inside the <h1>
export const taxonIdsToSummary = (
  csv: string | undefined,
  taxonIdToLabel: Map<string, string>
): string | null => {
  const [first, ...rest] = taxonIdsToLabels(csv, taxonIdToLabel);
  if (!first) {
    return null;
  }
  return rest.length ? `${first} and ${rest.length} more` : first;
};

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
