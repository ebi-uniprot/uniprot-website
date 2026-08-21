// Split a comma-separated list of taxon IDs, as returned by the job parameters
// endpoints, into individual IDs
const parseTaxonIds = (csv: string | undefined): string[] =>
  (csv || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

export default parseTaxonIds;
