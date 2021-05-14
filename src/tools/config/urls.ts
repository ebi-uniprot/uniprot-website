import queryString from 'query-string';

import { createFacetsQueryString } from '../../shared/config/apiUrls';
import { SelectedFacet } from '../../uniprotkb/types/resultsTypes';
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
    | 'phylotree' // Phylogenetic Tree
    | 'pim' // Percent Identity Matrix
    | 'submission'; // Submission Details (according to doc in JSON, but it looks like it's actually XML)
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
      baseURL = 'https://wwwdev.ebi.ac.uk/uniprot/api/idmapping';
      return Object.freeze({
        runUrl: `${baseURL}/run`,
        statusUrl: (jobId) =>
          // The cachebust extra query is just here to avoid using cached value
          `${baseURL}/status/${jobId}?cachebust=${new Date().getTime()}`,
        resultUrl: (redirectUrl, { facets, size, selectedFacets = [] }) =>
          `https://wwwdev.ebi.ac.uk${redirectUrl}?${queryString.stringify({
            size,
            facets: facets?.join(','),
            query: createFacetsQueryString(selectedFacets),
          })}`,
        detailsUrl: (jobId) => `${baseURL}/details/${jobId}`,
      });
      break;
    case JobTypes.PEPTIDE_SEARCH:
      baseURL =
        'https://research.bioinformatics.udel.edu/peptidematchws/asyncrest';
      return Object.freeze({
        runUrl: baseURL,
        statusUrl: (jobId) => `${baseURL}/jobs/${jobId}`,
        resultUrl: (jobId) => `${baseURL}/jobs/${jobId}`,
      });
    default:
    //
  }
  return Object.freeze({
    runUrl: `${baseURL}/run`,
    statusUrl: (jobId) => `${baseURL}/status/${jobId}`,
    resultUrl: (jobId, { format }) => `${baseURL}/result/${jobId}/${format}`,
  });
}

export default urlObjectCreator;
