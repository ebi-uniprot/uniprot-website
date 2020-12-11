import { EntryType } from '../../uniprotkb/adapters/uniProtkbConverter';
import EntrySection from '../types/entrySection';

enum GeneOntologyAspect {
  FUNCTION = 'GO Molecular Function',
  PROCESS = 'GO Biological Process',
  COMPONENT = 'GO Cellular Component',
}

enum UniRefEntryType {
  UniRef100 = 'UniRef100',
  UniRef90 = 'UniRef90',
  UniRef50 = 'UniRef50',
}

type GeneOntologyEntry = {
  aspect: GeneOntologyAspect;
  goId: string;
};

type Sequence = {
  value: string;
  length: number;
  molWeight: number;
  crc64: string;
  md5: string;
};

type MemberIDType = 'UniParc' | 'UniProtKB ID';

export type UniRefMember = {
  seed: boolean;
  memberIdType: MemberIDType;
  memberId: string;
  organismName: string;
  organismTaxId: number;
  sequenceLength: number;
  proteinName: string;
  accessions?: string[];
  uniref50Id?: string;
  uniref90Id?: string;
  uniref100Id?: string;
  uniparcId?: string;
};

export type RepresentativeMember = UniRefMember & {
  sequence: Sequence;
};

export type UniRefLiteAPIModel = {
  commonTaxonId: number;
  commonTaxon: string;
  goTerms: GeneOntologyEntry[];
  memberCount: number;
  entryType: UniRefEntryType;
  updated: string;
  name: string;
  id: string;
  sequence: string;
  sequenceLength: number;
  organismCount: number;
  representativeId: string;
  seedId: string;
  memberIdTypes?: EntryType[];
  members: string[];
  organismIds: number[];
  organisms: string[];
};

export type UniRefAPIModel = {
  commonTaxonId: number;
  commonTaxon: string;
  goTerms: GeneOntologyEntry[];
  representativeMember: RepresentativeMember;
  seedId: string;
  memberCount: number;
  entryType: UniRefEntryType;
  updated: string;
  name: string;
  id: string;
  // if 'members' is absent, it means only the representative member is member
  members?: UniRefMember[];
};

export const identityLevels = [50, 90, 100] as const;
export type Identity = typeof identityLevels[number];

export type UniRefUIModel = UniRefAPIModel & {
  identity: Identity;
  // use SequenceUIModel?
  [EntrySection.Sequence]: {
    sequence: UniRefAPIModel['representativeMember']['sequence'];
  };
};

const uniRefConverter = (data: UniRefAPIModel): UniRefUIModel => ({
  ...data,
  identity: +data.entryType.replace('UniRef', '') as Identity,
  [EntrySection.Sequence]: { sequence: data.representativeMember.sequence },
});

export default uniRefConverter;
