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
  resultUrl: (jobId: string, extra: { format?: ResultFormat[T] }) => string;
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
      // TODO: change to non VPN URL
      baseURL = 'http://wp-np2-be.ebi.ac.uk:8096/uniprot/api/idmapping';
      return Object.freeze({
        runUrl: `${baseURL}/run`,
        statusUrl: (jobId) => `${baseURL}/status/${jobId}`,
        resultUrl: (jobId) => `${baseURL}/results/${jobId}`,
      });
      break;
    case JobTypes.PEPTIDE_SEARCH:
      baseURL = 'https://www.uniprot.org/peptidesearch';
      return Object.freeze({
        runUrl: `${baseURL}/`,
        statusUrl: (jobId) => `${baseURL}/uniprot/${jobId}`,
        resultUrl: (jobId) => `${baseURL}/uniprot/${jobId}`,
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
