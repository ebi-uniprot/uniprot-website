const re = /(^|\W)([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2})(\W|$)/i;

const extractAccession = (string?: string): string | undefined => {
  if (!string) return undefined;
  const match = string.match(re);
  // index 0: full matching string
  // index 1: what's before the interesting bit
  // index 2: the actual accession <--
  return match?.[2].toUpperCase() ?? undefined;
};

export default extractAccession;
