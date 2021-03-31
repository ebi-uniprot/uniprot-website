export type IDMappingField = {
  groupName: string;
  displayName: string;
  name: string;
  from: boolean;
  to: boolean;
  ruleId?: number;
};

export type IDMappingRule = {
  ruleId: number;
  tos: string[];
  taxonId: boolean;
};

export type IDMappingFormConfig = {
  fields: IDMappingField[];
  rules: IDMappingRule[];
};
