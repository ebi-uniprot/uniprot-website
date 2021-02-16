import { Sequence } from '../../shared/types/sequence';
import { OrganismData } from '../../uniprotkb/adapters/namesAndTaxonomyConverter';
import { EntryType } from '../../uniprotkb/adapters/uniProtkbConverter';

import EntrySection from '../types/entrySection';

export enum XRefsInternalDatabases {
  Reviewed = 'UniProtKB/Swiss-Prot',
  Unreviewed = 'UniProtKB/TrEMBL',
}

export const databaseToEntryType: Record<string, EntryType | undefined> = {
  [XRefsInternalDatabases.Reviewed]: EntryType.REVIEWED,
  [XRefsInternalDatabases.Unreviewed]: EntryType.UNREVIEWED,
};

export type UniParcXRef = Partial<{
  active: boolean;
  created: string;
  database: XRefsInternalDatabases | string; // should replace with union of possibilities?
  geneName: string;
  id: string;
  lastUpdated: string;
  ncbiGi: string;
  organism: OrganismData;
  proteinName: string;
  proteomeId: string;
  component: string;
  version?: number; // might not always be there (e.g., for PRF xrefs)
  versionI: number; // internal UniProt versioning, always present
}>;

export type SequenceFeatureLocation = {
  start: number;
  end: number;
};

export type SequenceFeature = {
  database: string; // should replace with union of possibilities?
  databaseId: string;
  interproGroup?: {
    id: string;
    name: string;
  };
  locations: SequenceFeatureLocation[];
};

export type UniParcAPIModel = {
  uniParcId: string;
  uniParcCrossReferences?: UniParcXRef[];
  sequenceFeatures?: SequenceFeature[];
  sequence: Sequence;
};

export type UniParcUIModel = UniParcAPIModel & {
  // any addition/change by the converter
  [EntrySection.XRefs]: UniParcXRef[];
};

const uniParcConverter = (data: UniParcAPIModel): UniParcUIModel => ({
  ...data,
  [EntrySection.XRefs]: data.uniParcCrossReferences || [],
});

export default uniParcConverter;
