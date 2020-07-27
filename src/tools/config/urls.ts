import { JobTypes } from '../types/toolsJobTypes';

type CommonResultFormats =
  | 'out' // raw output of the tool
  | 'sequence'; // raw, as submitted

type ResultFormat = {
  [JobTypes.ALIGN]:
    | CommonResultFormats
    | 'aln-clustal_num' // Alignment in CLUSTAL format with base/residue numbering
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
  [JobTypes.IDMAP]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: never; // TODO
};

function urlObjectCreator<T extends JobTypes>(type: T) {
  let baseURL = '';
  switch (type) {
    case JobTypes.ALIGN:
      baseURL = 'https://wwwdev.ebi.ac.uk/Tools/services/rest/clustalo';
      break;
    case JobTypes.BLAST:
      baseURL = 'https://wwwdev.ebi.ac.uk/Tools/services/rest/ncbiblast';
      break;
    case JobTypes.IDMAP:
      baseURL = ''; // TODO
      break;
    case JobTypes.PEPTIDE_SEARCH:
      baseURL = ''; // TODO
      break;
    default:
    //
  }
  return Object.freeze({
    runUrl: `${baseURL}/run`,
    statusUrl: (jobId: string) => `${baseURL}/status/${jobId}`,
    resultUrl: (jobId: string, format: ResultFormat[T]) =>
      `${baseURL}/result/${jobId}/${format}`,
  });
}

export default urlObjectCreator;
