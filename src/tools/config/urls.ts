import queryString from 'query-string';
import deepFreeze from 'deep-freeze';
import joinUrl from 'url-join';

import {
  apiPrefix,
  getAPIQueryParams,
  getDownloadUrl,
} from '../../shared/config/apiUrls';
import {
  SelectedFacet,
  SortDirection,
} from '../../uniprotkb/types/resultsTypes';
import { JobTypes } from '../types/toolsJobTypes';
import { Column } from '../../shared/config/columns';
import { SortableColumn } from '../../uniprotkb/types/columnTypes';
import { Namespace } from '../../shared/types/namespaces';
import { FormParameters as AsyncDownloadFP } from '../async-download/types/asyncDownloadFormParameters';

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
  detailsUrl?: (jobId: string, namespace?: Namespace) => string;
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
        statusUrl: (jobId) => `${baseURL}/status/${jobId}`,
        resultUrl: (redirectUrl, extra) =>
          queryString.stringifyUrl({
            url: redirectUrl,
            query: getAPIQueryParams(extra),
          }),
        detailsUrl: (jobId) => `${baseURL}/details/${jobId}`,
      });
    case JobTypes.PEPTIDE_SEARCH:
      baseURL =
        'https://research.bioinformatics.udel.edu/peptidematchws/asyncrest';
      return deepFreeze({
        runUrl: baseURL,
        statusUrl: (jobId) => `${baseURL}/jobs/${jobId}`,
        resultUrl: (jobId) => `${baseURL}/jobs/${jobId}`,
      });
    default:
    //
  }
  return deepFreeze({
    runUrl: `${baseURL}/run`,
    statusUrl: (jobId) => `${baseURL}/status/${jobId}`,
    resultUrl: (jobId, { format }) => `${baseURL}/result/${jobId}/${format}`,
  });
}

type AsyncDownloadReturn = Readonly<{
  runUrl: (options: AsyncDownloadFP) => string;
  statusUrl: (jobId: string) => string;
  resultUrl: (redirectUrl: string) => string;
  detailsUrl?: (jobId: string) => string;
}>;

export function asyncDownloadUrlObjectCreator(
  namespace: Namespace
): AsyncDownloadReturn {
  // TODO: remove hardcoded baseURL
  // const baseURL = joinUrl(apiPrefix, namespace, 'download');
  const baseURL = joinUrl(
    'http://hx-rke-wp-webadmin-35-worker-9.caas.ebi.ac.uk:30024',
    namespace,
    'download'
  );
  return deepFreeze({
    runUrl: (options: AsyncDownloadFP) =>
      getDownloadUrl({ ...options, base: joinUrl(baseURL, 'run') }),
    statusUrl: (jobId) => joinUrl(baseURL, 'status', jobId),
    resultUrl: (jobId) =>
      // TODO: remove the replace
      joinUrl(baseURL, 'results', jobId).replace(':30024', ':31210'),
    detailsUrl: (jobId) => joinUrl(baseURL, 'details', jobId),
  });
}

export default urlObjectCreator;
