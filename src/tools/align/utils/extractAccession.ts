import {
  reUniParc,
  reUniProtKBAccessionWithIsoform,
  reUniRefAccession,
} from '../../../uniprotkb/utils/regexes';

import { Namespace } from '../../../shared/types/namespaces';

const namespaceToReAccession = [
  {
    namespace: Namespace.uniprotkb,
    re: reUniProtKBAccessionWithIsoform,
    toUpperCase: true,
  },
  { namespace: Namespace.uniref, re: reUniRefAccession },
  { namespace: Namespace.uniparc, re: reUniParc, toUpperCase: true },
].map((o) => ({
  ...o,
  re: new RegExp(`(?:^|\\W)(${o.re.source})(?:\\W|$)`, 'i'),
}));

const extractAccession = (
  string?: string
): { namespace: Namespace; accession: string } | null => {
  if (!string) {
    return null;
  }
  for (const { namespace, re, toUpperCase } of namespaceToReAccession) {
    // index 0: full matching string
    // index 1: the actual accession <--
    const group = string.match(re)?.[1];
    if (group) {
      return {
        namespace,
        accession: toUpperCase ? group.toUpperCase() : group,
      };
    }
  }
  return null;
};

export default extractAccession;
