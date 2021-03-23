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
  // "properties" only there when database is "EMBL", and not for all of them.
  // We shouldn't rely on that to display anything in the frontend, and it
  // wasn't used in the previous website anyway
  properties?: Array<{ key: string; value: string }>;
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
