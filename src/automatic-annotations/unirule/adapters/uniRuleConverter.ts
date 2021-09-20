import { AAModel } from '../../shared/model';

export type UniRuleAPIModel = AAModel & {
  uniRuleId: string;
};

export type UniRuleUIModel = UniRuleAPIModel & {
  // any addition/change by the converter
};

const uniRuleConverter = (data: UniRuleAPIModel): UniRuleUIModel => ({
  ...data,
});

export default uniRuleConverter;
