import { Sequence } from '../../shared/types/sequence';
import { EntryType } from '../../shared/components/entry/EntryTypeIcon';
import EntrySection from '../types/entrySection';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';

export enum XRefsInternalDatabasesEnum {
  REVIEWED = 'UniProtKB/Swiss-Prot',
  UNREVIEWED = 'UniProtKB/TrEMBL',
}
export type XRefsInternalDatabases = `${XRefsInternalDatabasesEnum}`;

export const databaseToEntryType = new Map<
  string | XRefsInternalDatabases,
  EntryType
>([
  ['UniProtKB/Swiss-Prot', EntryType.REVIEWED],
  ['UniProtKB/Swiss-Prot protein isoforms', EntryType.REVIEWED],
  ['UniProtKB/TrEMBL', EntryType.UNREVIEWED],
]);

// made completely partial as it depends a lot on the fields requested to API
export type UniParcXRef = Partial<{
  active: boolean;
  created: string;
  database: XRefsInternalDatabases | string; // should replace with union of possibilities?
  geneName: string;
  id: string;
  lastUpdated: string;
  ncbiGi: string;
  organism: TaxonomyDatum;
  proteinName: string;
  proteomeId: string;
  component: string;
  chain: string;
  version: number; // might not always be there (e.g., for PRF xrefs)
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
  mostRecentCrossRefUpdated?: string;
  oldestCrossRefCreated?: string;
  sequenceFeatures?: SequenceFeature[];
  sequence: Sequence;
  from?: string; // ID Mapping results
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
