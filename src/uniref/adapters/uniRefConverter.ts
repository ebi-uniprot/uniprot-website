import EntrySection from '../types/entrySection';

enum GeneOntologyAspect {
  FUNCTION = 'GO Molecular Function',
  PROCESS = 'GO Biological Process',
  COMPONENT = 'GO Cellular Component',
}

enum MemberIdType {
  UNIPROTKB_REVIEWED = 'UniProtKB Reviewed (Swiss-Prot)',
  UNIPROTKB_UNREVIEWED = 'UniProtKB Unreviewed (TrEMBL)',
  UNIPARC = 'UniParc ID',
}

enum EntryType {
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

type OverlapRegion = {
  end: number;
  start: number;
};

type UniRefMember = {
  seed: boolean;
  memberIdType: MemberIdType;
  memberId: string;
  organismName: string;
  organismTaxId: number;
  sequenceLength: number;
  proteinName: string;
  accessions: string[];
  uniRef50Id: string;
  uniRef90Id: string;
  uniRef100Id: string;
  uniParcId: string;
  overlapRegion: OverlapRegion;
};

type RepresentativeMember = UniRefMember & {
  sequence: Sequence;
};

export type UniRefLiteAPIModel = {
  commonTaxonId: number;
  commonTaxon: string;
  goTerms: GeneOntologyEntry[];
  memberCount: number;
  entryType: EntryType;
  updated: string;
  name: string;
  id: string;
  sequence: string;
  sequenceLength: number;
  organismCount: number;
  representativeId: string;
  seedId: string;
  memberIdTypes: MemberIdType;
  members: string[];
  organismIds: number[];
  organisms: string[];
};

export type UniRefAPIModel = {
  commonTaxonId: number;
  commonTaxon: string;
  goTerms: GeneOntologyEntry[];
  representativeMember: RepresentativeMember;
  memberCount: number;
  entryType: EntryType;
  updated: string;
  name: string;
  id: string;
  // if 'members' is absent, it means only the representative member is member
  members?: UniRefMember[];
};

export type UniRefUIModel = UniRefAPIModel & {
  [EntrySection.Members]: UniRefAPIModel['members'];
  // use SequenceUIModel?
  [EntrySection.Sequence]: UniRefAPIModel['representativeMember']['sequence'];
};

const uniRefConverter = (data: UniRefAPIModel): UniRefUIModel => ({
  ...data,
  [EntrySection.Members]: [data.representativeMember, ...(data.members || [])],
  [EntrySection.Sequence]: data.representativeMember.sequence,
});

export default uniRefConverter;
