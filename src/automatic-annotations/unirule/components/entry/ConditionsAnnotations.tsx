import { Fragment } from 'react';
import { Accordion } from 'franklin-sites';

import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';
import { ARBAAPIModel } from '../../../arba/adapters/arbaConverter';
import {
  CaseRule,
  Rule,
  Condition,
  RuleException,
} from '../../../shared/model';

import styles from './styles/conditions-annotations.module.scss';

const SingleCondition = ({ condition }: { condition: Condition }) => {
  if (condition.type === 'sequence length') {
    return (
      <>
        Sequence length: {condition.range?.start?.value}
        {condition.range?.start?.value !== undefined &&
          condition.range?.end?.value !== undefined &&
          '-'}
        {condition.range?.end?.value}
      </>
    );
  }
  if (condition.type === 'taxon') {
    return <>Taxon: </>;
  }
  // in case we're missing a case
  console.warn(condition); // eslint-disable-line no-console
  return <Fragment />;
};

const ConditionsComponent = ({
  conditions,
  exceptions,
}: {
  conditions?: Condition[];
  exceptions?: RuleException[];
}) => (
  <div>
    {conditions?.length ? (
      <>
        <p>If all of these conditions apply:</p>
        <ul>
          {conditions.map((condition, index, { length }) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              {index !== 0 && 'and '}
              {condition.isNegative && 'not '}
              <SingleCondition condition={condition} />
              {index + 1 < length ? ';' : '.'}
            </li>
          ))}
        </ul>
      </>
    ) : null}
  </div>
);

const RuleComponent = ({ rule }: { rule: Rule | CaseRule }) => (
  <div className={styles['side-by-side']}>
    <ConditionsComponent
      conditions={rule.conditionSets?.flatMap(
        (conditionSet) => conditionSet.conditions || []
      )}
      exceptions={rule.ruleExceptions}
    />
    <div>{JSON.stringify(rule, null, 2)}</div>
  </div>
);

const ConditionsAnnotations = ({
  data,
}: {
  data: UniRuleAPIModel | ARBAAPIModel;
}) => (
  <>
    <Accordion title="Common conditions">
      <RuleComponent rule={data.mainRule} />
    </Accordion>
    {data.otherRules?.map((otherRule, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Accordion key={index} title={`Special condition set #${index + 1}`}>
        <RuleComponent rule={otherRule} />
      </Accordion>
    ))}
    {data.positionFeatureSets?.map((positionalFeatureSet, index) => (
      <Accordion
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={`Special condition set #${
          (data.otherRules?.length || 0) + index + 1
        } (positional features)`}
      >
        {JSON.stringify(positionalFeatureSet, null, 2)}
      </Accordion>
    ))}
    {data.samFeatureSets?.map((samFeatureSet, index) => (
      <Accordion
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={`Special condition set #${
          (data.otherRules?.length || 0) +
          (data.positionFeatureSets?.length || 0) +
          index +
          1
        } (SAM features)`}
      >
        {JSON.stringify(samFeatureSet, null, 2)}
      </Accordion>
    ))}
  </>
);

export default ConditionsAnnotations;
