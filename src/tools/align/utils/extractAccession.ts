import { reUniProtKBAccessionWithIsoform } from '../../../uniprotkb/utils/regexes';

const re = new RegExp(
  `(?:^|\\W)(${reUniProtKBAccessionWithIsoform.source})(?:\\W|$)`,
  'i'
);

const extractAccession = (string?: string): string | undefined => {
  if (!string) {
    return undefined;
  }
  const match = string.match(re);
  // index 0: full matching string
  // index 1: the actual accession <--
  return match?.[1].toUpperCase() ?? undefined;
};

export default extractAccession;
