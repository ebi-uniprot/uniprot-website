import AccessionView from '../../../shared/components/results/AccessionView';
import { type Namespace } from '../../../shared/types/namespaces';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';
import { type ARBAAPIModel } from '../../arba/adapters/arbaConverter';

export function ruleIDRenderer<Schema>(
  getter: (data: Schema) => ARBAAPIModel['uniRuleId'] | undefined,
  namespaceLabel: string,
  namespace: Namespace.unirule | Namespace.arba
) {
  return {
    ...getLabelAndTooltip(
      `${namespaceLabel} ID`,
      'Unique and stable identifier for annotation rules'
    ),
    render: (data: Schema) => {
      const uniRuleId = getter(data);
      return (
        uniRuleId && <AccessionView id={uniRuleId} namespace={namespace} />
      );
    },
  };
}
