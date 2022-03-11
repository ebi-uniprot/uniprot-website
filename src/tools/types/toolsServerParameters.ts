import { JobTypes } from './toolsJobTypes';

import {
  ServerParameters as AlignSP,
  PublicServerParameters as PublicAlignSP,
} from '../align/types/alignServerParameters';
import {
  ServerParameters as BlastSP,
  PublicServerParameters as PublicBlastSP,
} from '../blast/types/blastServerParameters';
import { ServerParameters as IDMappingSP } from '../id-mapping/types/idMappingServerParameters';
import { ServerParameters as PeptideSearchSP } from '../peptide-search/types/peptideSearchServerParameters';
import { FormParameters as PeptideSearchFP } from '../peptide-search/types/peptideSearchFormParameters';

export type ServerParameters = {
  [JobTypes.ALIGN]: AlignSP;
  [JobTypes.BLAST]: BlastSP;
  [JobTypes.ID_MAPPING]: IDMappingSP;
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchSP;
};

export type PublicServerParameters = {
  [JobTypes.ALIGN]: PublicAlignSP;
  [JobTypes.BLAST]: PublicBlastSP;
  [JobTypes.ID_MAPPING]: IDMappingSP;
  // No public endpoint to expose this, so for now replace with a "possible"
  // form parameter in order to get going
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchFP;
};
