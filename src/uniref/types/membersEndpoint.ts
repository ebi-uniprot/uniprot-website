import { FacetObject } from '../../uniprotkb/types/responseTypes';
import { UniRefMember } from '../adapters/uniRefConverter';

export type UniRefMembersResults = {
  facets: FacetObject[];
  results: UniRefMember[];
};

export const uniRefMembersFacets = [
  'member_id_type',
  'uniprot_member_id_type',
] as const;
