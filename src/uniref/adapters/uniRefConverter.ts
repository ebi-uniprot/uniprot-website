import { Sequence } from '../../shared/types/sequence';
import { OrganismData } from '../../uniprotkb/adapters/namesAndTaxonomyConverter';
import EntrySection from '../types/entrySection';

// TODO: move that somewhere else, probably in the shared folder
enum GeneOntologyAspect {
  FUNCTION = 'GO Molecular Function',
  PROCESS = 'GO Biological Process',
  COMPONENT = 'GO Cellular Component',
}

export type UniRefEntryType = 'UniRef100' | 'UniRef90' | 'UniRef50';

export const uniRefEntryTypes: Readonly<UniRefEntryType[]> = [
  'UniRef100',
  'UniRef90',
  'UniRef50',
];

export const uniRefEntryTypeToPercent: Record<UniRefEntryType, string> = {
  UniRef100: '100%',
  UniRef90: '90%',
  UniRef50: '50%',
};

type GeneOntologyEntry = {
  aspect: GeneOntologyAspect;
  goId: string;
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

export type MemberIdType =
  | 'UniProtKB Reviewed (Swiss-Prot)'
  | 'UniProtKB Unreviewed (TrEMBL)'
  | 'UniParc';

export type UniRefLiteAPIModel = {
  commonTaxon: OrganismData;
  goTerms: GeneOntologyEntry[];
  memberCount: number;
  entryType: UniRefEntryType;
  updated: string;
  name: string;
  id: string;
  // Do not rely on `sequenceLength`
  sequenceLength: number;
  organismCount: number;
  representativeMember: Partial<UniRefMember> & {
    sequence?: Partial<Sequence>;
  };
  seedId: string;
  memberIdTypes: MemberIdType[];
  members: string[];
  organisms: OrganismData[];
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
  members: UniRefMember[];
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
