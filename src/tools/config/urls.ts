import deepFreeze from 'deep-freeze';
import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';
import apiUrls from '../../shared/config/apiUrls/apiUrls';
import { Column } from '../../shared/config/columns';
import { Namespace } from '../../shared/types/namespaces';
import { DownloadUrlOptions } from '../../shared/types/results';
import { getSearchParams, stringifyUrl } from '../../shared/utils/url';
import { SortableColumn } from '../../uniprotkb/types/columnTypes';
import {
  SelectedFacet,
  SortDirection,
} from '../../uniprotkb/types/resultsTypes';
import { JobTypes } from '../types/toolsJobTypes';

type CommonResultFormats =
  | 'out' // raw output of the tool
  | 'sequence'; // raw, as submitted

export type ResultFormat = {
  [JobTypes.ALIGN]:
    | CommonResultFormats
    // Alignment in CLUSTAL format with base/residue numbering;
    // https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Multiple+Sequence+Alignment+Tool+Output+Examples#MultipleSequenceAlignmentToolOutputExamples-ClustalOmegaproteinoutputexamples
    // ClustalW:
    // http://web.mit.edu/meme_v4.11.4/share/doc/clustalw-format.html
    | 'aln-clustal_num'
    | 'tree' // Guide Tree
    | 'phylotree' // Phylogenetic Tree
    | 'pim' // Percent Identity Matrix
    | 'submission'; // Submission Details (according to doc in JSON, but it looks like it's actually XML)
  [JobTypes.ASYNC_DOWNLOAD]: never;
  [JobTypes.BLAST]:
    | CommonResultFormats
    | 'ids' // e.g. 'TR:F8D2X3_HALXS'
    | 'accs' // e.g. 'TR:F8D2X3'
    | 'xml'
    | 'visual-svg'
    | 'complete-visual-svg'
    | 'visual-png'
    | 'complete-visual-png'
    | 'visual-jpg'
    | 'complete-visual-jpg'
    | 'ffdp-query-svg'
    | 'ffdp-query-png'
    | 'ffdp-query-jpeg'
    | 'ffdp-subject-svg'
    | 'ffdp-subject-png'
    | 'ffdp-subject-jpeg'
    | 'parameters' // in XML
    | 'json';
  [JobTypes.ID_MAPPING]: never;
  [JobTypes.PEPTIDE_SEARCH]: never;
};

type Return<T extends JobTypes> = Readonly<{
  runUrl: string;
  statusUrl: (jobId: string) => string;
  resultUrl: (
    redirectUrl: string,
    extra: {
      format?: ResultFormat[T];
      facets?: string[];
      size?: number;
      selectedFacets?: SelectedFacet[];
      query?: string;
      sortColumn?: SortableColumn;
      sortDirection?: SortDirection;
      columns?: Column[];
    }
  ) => string;
  detailsUrl?: (jobId: string) => string;
}>;

function urlObjectCreator<T extends JobTypes>(type: T): Return<T> {
  let baseURL = '';
  switch (type) {
    case JobTypes.ALIGN:
      baseURL = 'https://www.ebi.ac.uk/Tools/services/rest/clustalo';
      break;
    case JobTypes.BLAST:
      baseURL = 'https://www.ebi.ac.uk/Tools/services/rest/ncbiblast';
      break;
    case JobTypes.ID_MAPPING:
      baseURL = joinUrl(apiPrefix, 'idmapping');
      return deepFreeze({
        runUrl: `${baseURL}/run`,
        statusUrl: (jobId) => joinUrl(baseURL, 'status', jobId),
        resultUrl: (redirectUrl, extra) =>
          stringifyUrl(redirectUrl, getSearchParams(extra)),
        detailsUrl: (jobId) => `${baseURL}/details/${jobId}`,
      });
    case JobTypes.PEPTIDE_SEARCH:
      baseURL = 'https://peptidesearch.uniprot.org/asyncrest';
      return deepFreeze({
        runUrl: baseURL,
        statusUrl: (jobId) => joinUrl(baseURL, 'jobs', jobId),
        resultUrl: (jobId) => joinUrl(baseURL, 'jobs', jobId),
        detailsUrl: (jobId) => joinUrl(baseURL, 'jobs', jobId, 'parameters'),
      });
    default:
    //
  }
  return deepFreeze({
    runUrl: joinUrl(baseURL, 'run'),
    statusUrl: (jobId) => joinUrl(baseURL, 'status', jobId),
    resultUrl: (jobId, { format }) =>
      joinUrl(baseURL, 'result', jobId, format || ''),
  });
}

type AsyncDownloadReturn = Readonly<{
  runUrl: (options: DownloadUrlOptions) => string;
  statusUrl: (jobId: string) => string;
  resultUrl: (redirectUrl: string) => string;
  detailsUrl?: (jobId: string) => string;
}>;

export function asyncDownloadUrlObjectCreator(
  namespace: Namespace
): AsyncDownloadReturn {
  // All ID Mapping jobs are under /idmapping/ regardless of underlying namespace
  const baseURL = joinUrl(
    apiPrefix,
    namespace === Namespace.idmapping ? 'idmapping' : namespace,
    'download'
  );
  return deepFreeze({
    runUrl: (options) =>
      // All parameters need to go in the URL.
      apiUrls.results.download({ ...options, base: joinUrl(baseURL, 'run') }),
    statusUrl: (jobId) => joinUrl(baseURL, 'status', jobId),
    resultUrl: (jobId) => joinUrl(baseURL, 'results', jobId),
    detailsUrl: (jobId) => joinUrl(baseURL, 'details', jobId),
  });
}

export default urlObjectCreator;
