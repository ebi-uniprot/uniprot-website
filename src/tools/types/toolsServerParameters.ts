import { JobTypes } from './toolsJobTypes';

import { ServerParameters as AlignSP } from '../align/types/alignServerParameters';
import { ServerParameters as BlastSP } from '../blast/types/blastServerParameters';

export type ServerParameters = {
  [JobTypes.ALIGN]: AlignSP;
  [JobTypes.BLAST]: BlastSP;
  [JobTypes.IDMAP]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: never; // TODO
};

export type PublicServerParameters = {
  [JobTypes.ALIGN]: Omit<AlignSP, 'email'>;
  [JobTypes.BLAST]: Omit<BlastSP, 'email'>;
  [JobTypes.IDMAP]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: never; // TODO
};
