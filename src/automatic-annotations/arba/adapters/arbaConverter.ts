import { AAModel } from '../../shared/model';

export type ARBAAPIModel = AAModel & {
  // TODO: change that in the model (backend)
  uniRuleId: string;
};

export type ARBAUIModel = ARBAAPIModel & {
  // any addition/change by the converter
};

const arbaConverter = (data: ARBAAPIModel): ARBAUIModel => ({
  ...data,
});

export default arbaConverter;
