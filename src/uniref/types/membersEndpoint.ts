import { type SearchResults } from '../../shared/types/results';
import { type UniRefMember } from '../adapters/uniRefConverter';

export type UniRefMembersResults = SearchResults<UniRefMember>;

export const uniRefMembersFacets = [
  'member_id_type',
  'uniprot_member_id_type',
] as const;
