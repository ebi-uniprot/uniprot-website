import { JobTypes } from './toolsJobTypes';

import { FormParameters as AlignFP } from '../align/types/alignFormParameters';
import { FormParameters as BlastFP } from '../blast/types/blastFormParameters';
import { FormParameters as PeptideSearchFP } from '../peptide-search/types/peptideSearchFormParameters';

export type FormParameters = {
  [JobTypes.ALIGN]: AlignFP;
  [JobTypes.BLAST]: BlastFP;
  [JobTypes.ID_MAPPING]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchFP;
};
