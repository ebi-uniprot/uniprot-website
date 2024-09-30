import { Sequence } from '../../shared/types/sequence';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import EntrySection from '../types/entrySection';

// TODO: move these somewhere else, probably in the shared folder
type GeneOntologyAspect = `GO ${
  | 'Molecular Function'
  | 'Biological Process'
  | 'Cellular Component'}`;
type GeneOntologyEntry = {
  aspect: GeneOntologyAspect;
  goId: string;
};

export type UniRefEntryType = 'UniRef100' | 'UniRef90' | 'UniRef50';

export const uniRefEntryTypeToPercent: Record<UniRefEntryType, string> = {
  UniRef100: '100%',
  UniRef90: '90%',
  UniRef50: '50%',
};

type MemberIDType = 'UniParc' | 'UniProtKB ID';

export type UniRefMember = {
  seed?: boolean;
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
  commonTaxon: TaxonomyDatum;
  goTerms?: GeneOntologyEntry[];
  memberCount: number;
  entryType: UniRefEntryType;
  updated: string;
  name: string;
  id: string;
  organismCount: number;
  representativeMember: RepresentativeMember;
  seedId: string;
  memberIdTypes: MemberIdType[];
  members: string[];
  organisms: TaxonomyDatum[];
  from?: string; // ID Mapping results
};

export type UniRefAPIModel = {
  commonTaxon: TaxonomyDatum;
  goTerms?: GeneOntologyEntry[];
  representativeMember: RepresentativeMember;
  seedId: string;
  memberCount: number;
  entryType: UniRefEntryType;
  updated: string;
  name: string;
  id: string;
  members?: UniRefMember[];
};

export type Identity = 50 | 90 | 100;

export type UniRefUIModel<
  T extends UniRefAPIModel | UniRefLiteAPIModel = UniRefLiteAPIModel,
> = T & {
  identity: Identity;
  // use SequenceUIModel?
  [EntrySection.Sequence]: {
    sequence: T['representativeMember']['sequence'];
  };
};

const uniRefConverter = <T extends UniRefAPIModel | UniRefLiteAPIModel>(
  data: T
): UniRefUIModel<T> => ({
  ...data,
  identity: +data.entryType.replace('UniRef', '') as Identity,
  [EntrySection.Sequence]: { sequence: data.representativeMember.sequence },
});

export default uniRefConverter;
