import { JobTypes } from '../types/toolsJobTypes';

// TODO: change for other types
const validServerID = {
  [JobTypes.ALIGN]: /^clustalo-R\d{8}(-\w+){4}$/,
  [JobTypes.BLAST]: /^ncbiblast-R\d{8}(-\w+){4}$/,
  [JobTypes.IDMAP]: /./,
  [JobTypes.PEPTIDE_SEARCH]: /./,
};

const isValidServerID = (type: JobTypes, id: string) =>
  validServerID[type].test(id);

export default isValidServerID;
