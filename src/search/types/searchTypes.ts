export enum Namespace {
  UniProtKB = 'UniProtKB',
  UniRef = 'UniRef',
  UniParc = 'UniParc',
  Proteomes = 'Proteomes'
}

export enum Operator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT'
}

export type SearchTermType = {
  id: string;
  label: string;
  term: string;
  example: string;
  itemType: string;
  dataType: string;
  hasRange?: boolean;
  hasEvidence?: boolean;
  valuePrefix?: string;
  autoComplete?: string;
  options?: Array<{
    name: string;
    values: Array<{
      name: string;
      label: string;
    }>;
  }>;
  values?: Array<{
    name: string;
    value: string;
  }>;
  items?: Array<SearchTermType>;
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

export enum EvidenceType {
  GO = 'go',
  ANNOTATION = 'annotation'
}
