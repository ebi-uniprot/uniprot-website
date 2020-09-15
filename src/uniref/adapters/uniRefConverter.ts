enum GeneOntologyAspect {
  FUNCTION = 'Function',
  PROCESS = 'Process',
  COMPONENT = 'Component',
}

enum MemberIdType {
  UNIPROTKB = 'UniProtKb',
  UNIPARC = 'UniParc',
}

enum EntryType {
  UniRef100 = 'UniRef100',
  UniRef90 = 'UniRef90',
  UniRef50 = 'UniRef50',
}

type GeneOntologyEntry = {
  ancestors: GeneOntologyEntry[];
  aspect: GeneOntologyAspect;
  name: string;
  id: string;
} | null;

type Sequence = {
  value: string;
  length: number;
  checksum: string;
};

type UniProtKBAccession = {
  validAccession: boolean;
  value: string;
};

type EntryID = {
  validId: boolean;
  value: string;
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
  uniProtAccessions: UniProtKBAccession[];
  uniRef50Id: EntryID;
  uniRef90Id: EntryID;
  uniRef100Id: EntryID;
  uniParcId: EntryID;
  overlapRegion: OverlapRegion;
};

type RepresentativeMember = UniRefMember & {
  sequence: Sequence;
};

export type UniRefAPIModel = {
  commonTaxonId: number;
  commonTaxon: string;
  goTerms: GeneOntologyEntry[];
  representativeMember: RepresentativeMember;
  memberCount: number;
  entryType: EntryType;
  update: string;
  name: string;
  id: EntryID;
  members: UniRefMember[];
};
