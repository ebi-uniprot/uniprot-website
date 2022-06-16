export type IDMappingGroupItem = {
  displayName: string;
  name: string;
  from: boolean;
  to: boolean;
  ruleId?: number | null;
  uriLink: string;
};

export type IDMappingGroup = {
  groupName: string;
  items: IDMappingGroupItem[];
};

export type IDMappingRule = {
  ruleId: number;
  tos: string[];
  taxonId: boolean;
  defaultTo: string;
};

export type IDMappingFormConfig = {
  groups: IDMappingGroup[];
  rules: IDMappingRule[];
};
