export type Operator = 'AND' | 'OR' | 'NOT';

export type ItemType = 'group' | 'sibling_group' | 'single';

export type DataType = 'boolean' | 'date' | 'enum' | 'integer' | 'string';

export type FieldType = 'evidence' | 'general' | 'range';

type EvidenceGroup = {
  groupName: string;
  items: { name: string; code: string }[];
};

export type SearchTermType = {
  id: string;
  label: string;
  itemType: ItemType;
  term: string;
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
  siblings?: SearchTermType[];
};

export type QueryBit = Record<string, string>;

export type Clause = {
  id: number;
  searchTerm: SearchTermType;
  queryBits: QueryBit;
  logicOperator: Operator;
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
