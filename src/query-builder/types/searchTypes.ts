export enum Operator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
}

export enum ItemType {
  group = 'group',
  siblingGroup = 'sibling_group',
  single = 'single',
}

export enum DataType {
  boolean = 'boolean',
  date = 'date',
  enum = 'enum',
  integer = 'integer',
  string = 'string',
}

export enum FieldType {
  evidence = 'evidence',
  general = 'general',
  range = 'range',
}

type EvidenceGroup = {
  groupName: string;
  items: { name: string; code: string }[];
};

export type SearchTermType = {
  id: string;
  label: string;
  itemType: ItemType;
  term?: string;
  dataType?: DataType;
  fieldType?: FieldType;
  example?: string;
  autoComplete?: string;
  autoCompleteQueryTerm?: string;
  regex?: string;
  evidenceGroups?: EvidenceGroup[];
  valuePrefix?: string;
  values?: {
    name: string;
    value: string;
  }[];
  items?: SearchTermType[];
};

export type Input = {
  stringValue?: string;
  rangeFrom?: string;
  rangeTo?: string;
  evidenceValue?: string;
  id?: string;
};

export type Clause = {
  id: string;
  searchTerm: SearchTermType;
  logicOperator: Operator;
  queryInput: Input;
};

export enum Evidence {
  GO = 'go',
  ANNOTATION = 'annotation',
}

export type EvidenceDataPoint = {
  groupName: string;
  items: { name: string; code: string }[];
};

export type Evidences = {
  [Evidence.GO]: EvidenceDataPoint[];
  [Evidence.ANNOTATION]: EvidenceDataPoint[];
};
