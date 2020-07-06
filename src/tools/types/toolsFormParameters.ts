import { JobTypes } from './toolsJobTypes';

import { FormParameters as AlignFP } from '../align/types/alignFormParameters';
import { FormParameters as BlastFP } from '../blast/types/blastFormParameters';

export type FormParameters = {
  [JobTypes.ALIGN]: AlignFP;
  [JobTypes.BLAST]: BlastFP;
  [JobTypes.IDMAP]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: never; // TODO
};
