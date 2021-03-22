import { JobTypes } from './toolsJobTypes';

import { ServerParameters as AlignSP } from '../align/types/alignServerParameters';
import { ServerParameters as BlastSP } from '../blast/types/blastServerParameters';
import { ServerParameters as PeptideSearchSP } from '../peptide-search/types/peptideSearchServerParameters';

export type ServerParameters = {
  [JobTypes.ALIGN]: AlignSP;
  [JobTypes.BLAST]: BlastSP;
  [JobTypes.ID_MAPPING]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchSP;
};

export type PublicServerParameters = {
  [JobTypes.ALIGN]: Omit<AlignSP, 'email'>;
  [JobTypes.BLAST]: Omit<BlastSP, 'email'>;
  [JobTypes.ID_MAPPING]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchSP;
};
