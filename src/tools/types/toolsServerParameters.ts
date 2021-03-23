import { JobTypes } from './toolsJobTypes';

import {
  ServerParameters as AlignSP,
  PublicServerParameters as PublicAlignSP,
} from '../align/types/alignServerParameters';
import {
  ServerParameters as BlastSP,
  PublicServerParameters as PublicBlastSP,
} from '../blast/types/blastServerParameters';
import { ServerParameters as PeptideSearchSP } from '../peptide-search/types/peptideSearchServerParameters';

export type ServerParameters = {
  [JobTypes.ALIGN]: AlignSP;
  [JobTypes.BLAST]: BlastSP;
  [JobTypes.ID_MAPPING]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchSP;
};

export type PublicServerParameters = {
  [JobTypes.ALIGN]: PublicAlignSP;
  [JobTypes.BLAST]: PublicBlastSP;
  [JobTypes.ID_MAPPING]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchSP;
};
