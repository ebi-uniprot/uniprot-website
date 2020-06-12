const baseUrl = 'https://wwwdev.ebi.ac.uk/Tools/services/rest/ncbiblast';

export type ResultFormat =
  | 'out' // raw output of blast
  | 'sequence' // raw, as submitted
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
  // The following ones are temporary, as they are on wwwdev,
  // they will eventually change when prod finished implementing it.
  // The only interesting one is json, as the others are already present
  | 'jdp?format=json'
  | 'jdp?format=xml'
  | 'jdp?format=ids'
  | 'jdp?format=accs';

export default {
  runUrl: `${baseUrl}/run`,
  statusUrl: (jobId: string) => `${baseUrl}/status/${jobId}`,
  resultUrl: (jobId: string, format: ResultFormat) =>
    `${baseUrl}/result/${jobId}/${format}`,
};
