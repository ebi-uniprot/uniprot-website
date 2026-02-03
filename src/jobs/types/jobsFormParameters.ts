import { type FormParameters as AlignFP } from '../align/types/alignFormParameters';
import { type FormParameters as AsyncDownloadFP } from '../async-download/types/asyncDownloadFormParameters';
import { type FormParameters as BlastFP } from '../blast/types/blastFormParameters';
import { type FormParameters as IDMappingFP } from '../id-mapping/types/idMappingFormParameters';
import { type FormParameters as PeptideSearchFP } from '../peptide-search/types/peptideSearchFormParameters';
import { type JobTypes } from './jobTypes';

export type FormParameters = {
  [JobTypes.ALIGN]: AlignFP;
  [JobTypes.BLAST]: BlastFP;
  [JobTypes.ID_MAPPING]: IDMappingFP;
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchFP;
  [JobTypes.ASYNC_DOWNLOAD]: AsyncDownloadFP;
};
