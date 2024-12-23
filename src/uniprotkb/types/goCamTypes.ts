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

enum Key {
  Contributor = 'contributor',
  Date = 'date',
  HintLayoutX = 'hint-layout-x',
  HintLayoutY = 'hint-layout-y',
  ProvidedBy = 'providedBy',
  Source = 'source',
  With = 'with',
}

interface RootTypeElement {
  type: TypeEnum;
  id: string;
  label: string;
}

enum TypeEnum {
  Class = 'class',
}
