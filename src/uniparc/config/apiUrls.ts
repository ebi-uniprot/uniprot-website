import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';
import { Namespace } from '../../shared/types/namespaces';
import { FileFormat } from '../../shared/types/resultsDownload';
import { stringifyUrl } from '../../shared/utils/url';

const databases = (
  upid: string,
  xrefId?: string,
  includeXrefSource?: boolean,
  stream?: boolean,
  options: {
    format?: FileFormat.tsv | FileFormat.json;
    size?: number;
    fields?: string;
    facets?: string;
  } = {}
) => {
  const url = stream
    ? joinUrl(apiPrefix, 'uniparc', upid, 'databases', 'stream')
    : joinUrl(apiPrefix, 'uniparc', upid, 'databases');

  if (xrefId) {
    return stringifyUrl(url, { id: xrefId, includeSources: includeXrefSource });
  }
  return stringifyUrl(url, {
    format: fileFormatToUrlParameter[options.format || FileFormat.json],
    size: options.size,
    fields: options.fields,
    facets: options.facets,
  });
};

const proteomeFasta = (upid: string, stream?: boolean) => {
  const baseUrl = stream
    ? joinUrl(apiPrefix, 'uniparc', 'proteome', upid, 'stream')
    : joinUrl(apiPrefix, 'uniparc', 'proteome', upid);
  return stringifyUrl(baseUrl, {
    format: fileFormatToUrlParameter[FileFormat.fasta],
    compressed: true,
  });
};

// Precomputed UniParc annotations. Path params (unlike UniFire's query params).
// Returns HTTP 404 when there is no precomputed data for the entry.
const precomputedAnnotation = (uniparcId: string, taxId: string) =>
  joinUrl(apiPrefix, Namespace.uniprotkb, 'precomputed', uniparcId, taxId);

// TEMPORARY: during the dev rollout, precomputed annotations are served from
// wwwdev while UniFire's `run` service is only on rest.uniprot.org. So under
// `yarn start:dev` (`apiPrefix` → wwwdev) UniFire must be pinned to its host
// rather than follow `apiPrefix`. Once everything is served from
// rest.uniprot.org, delete UNIFIRE_HOST and build this from `apiPrefix` like
// every other API URL.
const UNIFIRE_HOST = 'https://rest.uniprot.org';

const unifire = (uniparcId: string, taxId: string) =>
  stringifyUrl(joinUrl(UNIFIRE_HOST, Namespace.uniprotkb, 'unifire', 'run'), {
    id: uniparcId,
    taxId,
  });

export default { databases, proteomeFasta, precomputedAnnotation, unifire };
