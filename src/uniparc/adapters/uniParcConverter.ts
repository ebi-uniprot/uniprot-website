import { Sequence } from '../../shared/types/sequence';
import { EntryType } from '../../uniprotkb/adapters/uniProtkbConverter';

import EntrySection from '../types/entrySection';

export type XRefProperty = {
  key: string; // should replace with union of possibilities?
  value: string;
};

export enum XRefsInternalDatabases {
  Reviewed = 'UniProtKB/Swiss-Prot',
  Unreviewed = 'UniProtKB/TrEMBL',
}

export const databaseToEntryType: Record<string, EntryType | undefined> = {
  [XRefsInternalDatabases.Reviewed]: EntryType.REVIEWED,
  [XRefsInternalDatabases.Unreviewed]: EntryType.UNREVIEWED,
};

// TODO: to be reviewed when working on UniParc pages
export type UniParcXRef = {
  active: boolean;
  created: string;
  database: XRefsInternalDatabases | string; // should replace with union of possibilities?
  id: string;
  lastUpdated: string;
  properties?: XRefProperty[];
  version?: number; // might not always be there (e.g., for PRF xrefs)
  versionI: number; // internal UniProt versioning, always present
};

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
  taxonomies: { taxonId: number }[];
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
