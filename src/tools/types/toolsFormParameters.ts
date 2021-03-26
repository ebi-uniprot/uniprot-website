import { JobTypes } from './toolsJobTypes';

import { FormParameters as AlignFP } from '../align/types/alignFormParameters';
import { FormParameters as BlastFP } from '../blast/types/blastFormParameters';
import { FormParameters as IDMappingFP } from '../id-mapping/types/idMappingFormParameters';
import { FormParameters as PeptideSearchFP } from '../peptide-search/types/peptideSearchFormParameters';

export type FormParameters = {
  [JobTypes.ALIGN]: AlignFP;
  [JobTypes.BLAST]: BlastFP;
  [JobTypes.ID_MAPPING]: IDMappingFP;
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchFP;
};
