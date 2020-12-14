import { Sequence } from '../../shared/components/entry/SequenceSection';

export type XRefProperty = {
  key: string; // should replace with union of possibilities?
  value: string;
};

// TODO: to be reviewed when working on UniParc pages
export type UniParcXRef = {
  active: boolean;
  created: string;
  database: string; // should replace with union of possibilities?
  id: string;
  lastUpdated: string;
  properties: XRefProperty[];
  version: number;
  versionI: number; // 🤔 what is this?
};

export type SequenceFeatureLocation = {
  start: number;
  end: number;
};

export type SequenceFeature = {
  database: string; // should replace with union of possibilities?
  databaseId: string;
  interproGroup: {
    id: string;
    name: string;
  };
  locations: SequenceFeatureLocation[];
};

export type UniParcAPIModel = {
  uniParcId: string;
  uniParcCrossReferences: UniParcXRef[];
  taxonomies: { taxonId: number }[];
  sequenceFeatures: SequenceFeature[];
  sequence: Sequence;
};

export type UniParcUIModel = UniParcAPIModel & {
  // any addition/change by the converter
};

const uniParcConverter = (data: UniParcAPIModel): UniParcUIModel => ({
  ...data,
});

export default uniParcConverter;
