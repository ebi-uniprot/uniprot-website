// import { Statistics } from '../../shared/types/apiModel';

export type Information = Record<string, any>; // TODO

export type Rule = Record<string, any>; // TODO

export type CaseRule = Record<string, any>; // TODO

export type SamFeatureSet = Record<string, any>; // TODO

export type PositionFeatureSet = Record<string, any>; // TODO

export type AAModel = {
  // id: string; // ID field is different for UniRule and ARBA
  information: Information;
  ruleStatus: 'APPLY' | 'DISUSED' | 'TEST';
  mainRule: Rule;
  otherRules?: CaseRule[];
  samFeatureSets?: SamFeatureSet[];
  positionFeatureSets?: PositionFeatureSet[];
  proteinsAnnotatedCount: number; // TODO: change to Statistics model
  // statistics: Statistics; // TODO: Not here yet, replace by this
  createdBy: 'ARBA' | string; // curator
  modifiedBy: 'ARBA' | string; // curator
  createdDate: string; // YYYY-MM-DD
  modifiedDate: string; // YYYY-MM-DD
};
