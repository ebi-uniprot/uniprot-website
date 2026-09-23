/**
 * Whether the API's redirect for this URL segment leads to the same entry under
 * its accession, rather than to another entry: an entry name (`A4_HUMAN`) or a
 * versioned accession (`P05067.3`) is the entry itself, spelled differently.
 */
export const redirectsToSameEntry = (urlAccession: string) =>
  urlAccession.includes('_') || urlAccession.includes('.');

/**
 * Whether the page is a merged entry's history, viewed under the old
 * accession: the API redirected to the entry it was merged into, so the data
 * is that entry's, but this URL is not that entry's page. False for a redirect
 * that only normalised the spelling of the same entry, and for an isoform.
 */
export const isMergedEntryHistory = (
  urlAccession: string | undefined,
  primaryAccession: string | undefined,
  redirectedTo: string | undefined
) =>
  Boolean(
    redirectedTo &&
    urlAccession &&
    primaryAccession &&
    !redirectsToSameEntry(urlAccession) &&
    urlAccession.split('-')[0].toUpperCase() !== primaryAccession.toUpperCase()
  );
