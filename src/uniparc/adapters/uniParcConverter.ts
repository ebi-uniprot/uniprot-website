import { EntryType } from '../../shared/components/entry/EntryTypeIcon';
import { Sequence } from '../../shared/types/sequence';
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

type Property = {
  key: string;
  value: string;
};

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
  properties: Property[];
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
  alignment?: string;
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

type CommonTaxon = {
  topLevel: string;
  commonTaxon: string;
  commonTaxonId: number;
};

type Proteome = {
  id: string;
  component: string;
};

export type UniParcLiteAPIModel = {
  uniParcId: string;
  crossReferenceCount: number;
  commonTaxons?: CommonTaxon[];
  uniProtKBAccessions?: string[];
  sequence: Sequence;
  sequenceFeatures?: SequenceFeature[];
  oldestCrossRefCreated?: string;
  mostRecentCrossRefUpdated?: string;
  geneNames?: string[];
  organisms?: TaxonomyDatum[];
  proteinNames?: string[];
  proteomes?: Proteome[];
};

export type UniParcAPIModel = {
  uniParcId: string;
  uniParcCrossReferences?: UniParcXRef[];
  mostRecentCrossRefUpdated?: string;
  oldestCrossRefCreated?: string;
  sequenceFeatures?: SequenceFeature[];
  sequence: Sequence;
  uniProtKBAccessions?: string[];
  from?: string; // ID Mapping results
};

export type UniParcUIModel<
  T extends UniParcAPIModel | UniParcLiteAPIModel = UniParcLiteAPIModel,
> = T;

const uniParcConverter = <T extends UniParcAPIModel | UniParcLiteAPIModel>(
  data: T
): UniParcUIModel<T> => ({
  ...data,
});

export default uniParcConverter;
