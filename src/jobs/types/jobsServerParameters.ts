import {
  type PublicServerParameters as PublicAlignSP,
  type ServerParameters as AlignSP,
} from '../align/types/alignServerParameters';
import {
  type PublicServerParameters as PublicBlastSP,
  type ServerParameters as BlastSP,
} from '../blast/types/blastServerParameters';
import { type ServerParameters as IDMappingSP } from '../id-mapping/types/idMappingServerParameters';
import { type FormParameters as PeptideSearchFP } from '../peptide-search/types/peptideSearchFormParameters';
import { type ServerParameters as PeptideSearchSP } from '../peptide-search/types/peptideSearchServerParameters';
import { type JobTypes } from './jobTypes';

export type ServerParameters = {
  [JobTypes.ALIGN]: AlignSP;
  [JobTypes.BLAST]: BlastSP;
  [JobTypes.ID_MAPPING]: IDMappingSP;
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchSP;
  [JobTypes.ASYNC_DOWNLOAD]: never;
};

export type PublicServerParameters = {
  [JobTypes.ALIGN]: PublicAlignSP;
  [JobTypes.BLAST]: PublicBlastSP;
  [JobTypes.ID_MAPPING]: IDMappingSP;
  // No public endpoint to expose this, so for now replace with a "possible"
  // form parameter in order to get going
  [JobTypes.PEPTIDE_SEARCH]: PeptideSearchFP;
  [JobTypes.ASYNC_DOWNLOAD]: never;
};
