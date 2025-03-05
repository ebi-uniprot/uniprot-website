export type GoCamModels = {
  gocam: string;
  title: string;
};

export interface GoCamModelInfo {
  id: string;
  individuals: Individual[];
  facts: Fact[];
  annotations: GoCamModelAnnotation[];
}

interface GoCamModelAnnotation {
  key: string;
  value: string;
  'value-type'?: ValueType;
}

type ValueType = 'IRI';

interface Fact {
  subject: string;
  property: string;
  'property-label': string;
  object: string;
  annotations: GoCamModelAnnotation[];
}

interface Individual {
  id: string;
  type: RootTypeElement[];
  'root-type': RootTypeElement[];
  annotations: IndividualAnnotation[];
}

interface IndividualAnnotation {
  key: Key;
  value: string;
}

type Key =
  | 'contributor'
  | 'date'
  | 'hint-layout-x'
  | 'hint-layout-y'
  | 'providedBy'
  | 'source'
  | 'with';

interface RootTypeElement {
  type: 'class';
  id: string;
  label: string;
}
