export enum Namespace {
  uniprotkb = 'uniprotkb',
  uniref = 'uniref',
  uniparc = 'uniparc',
  proteomes = 'proteomes',
  publications = 'publications',
  keywords = 'keywords',
}

export const NamespaceLabels = {
  [Namespace.uniprotkb]: 'UniProtKB',
  [Namespace.uniref]: 'UniRef',
  [Namespace.uniparc]: 'UniParc',
  [Namespace.proteomes]: 'Proteomes',
  [Namespace.publications]: 'Publications',
  [Namespace.keywords]: 'Keywords',
};

export enum Operator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
}

export enum itemType {
  comment = 'comment',
  database = 'database',
  feature = 'feature',
  goterm = 'goterm',
  group = 'group',
  groupDisplay = 'groupDisplay',
  single = 'single',
}

export enum dataType {
  empty = '',
  date = 'date',
  enum = 'enum',
  integer = 'integer',
  string = 'string',
}

export type SearchTermType = {
  id: string;
  label: string;
  term?: string;
  example?: string;
  itemType: itemType;
  dataType: dataType;
  hasRange?: boolean;
  hasEvidence?: boolean;
  valuePrefix?: string;
  termSuffix?: boolean;
  autoComplete?: string;
  description?: string;
  options?: {
    name: string;
    values: {
      name: string;
      label: string;
    }[];
  }[];
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
