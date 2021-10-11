import { ExpandableList } from 'franklin-sites';

import * as logging from '../../../shared/utils/logging';

import { ARBAAPIModel } from '../../arba/adapters/arbaConverter';
import { UniRuleAPIModel } from '../../unirule/adapters/uniRuleConverter';

const AnnotationCovered = ({
  mainRule,
}: Partial<UniRuleAPIModel | ARBAAPIModel>) => {
  const annotations = new Set<string>();

  // See similar logic in ConditionsAnnotations.tsx, annotationsToInfoData function
  for (const annotation of mainRule?.annotations || []) {
    if ('keyword' in annotation) {
      annotations.add('keyword');
    } else if ('proteinDescription' in annotation) {
      annotations.add('protein name');
    } else if ('gene' in annotation) {
      annotations.add('gene name');
    } else if (annotation.comment?.commentType) {
      annotations.add(annotation.comment?.commentType.toLowerCase());
    } else if (annotation.dbReference?.database === 'GO') {
      annotations.add('GO term');
    } else {
      // in case we're missing a case
      logging.warn(annotation);
    }
  }

  return (
    <ExpandableList descriptionString="annotations" displayNumberOfHiddenItems>
      {Array.from(annotations)}
    </ExpandableList>
  );
};

export default AnnotationCovered;
