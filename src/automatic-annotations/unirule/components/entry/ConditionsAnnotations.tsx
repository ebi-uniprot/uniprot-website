import { Fragment, ReactNode } from 'react';
import { Accordion, ExternalLink, Message } from 'franklin-sites';

import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import AccessionView from '../../../../shared/components/results/AccessionView';

import listFormat from '../../../../shared/utils/listFormat';
import { pluralise } from '../../../../shared/utils/utils';

import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';
import { ARBAAPIModel } from '../../../arba/adapters/arbaConverter';
import {
  CaseRule,
  Rule,
  Condition,
  RuleException,
  Annotation,
} from '../../../shared/model';
import { Namespace } from '../../../../shared/types/namespaces';

import helper from '../../../../shared/styles/helper.module.scss';
import styles from './styles/conditions-annotations.module.scss';

const SingleCondition = ({ condition }: { condition: Condition }) => {
  // Sequence length
  if (condition.type === 'sequence length') {
    return (
      <>
        sequence length: {condition.range?.start?.value}
        {condition.range?.start?.value !== undefined &&
          condition.range?.end?.value !== undefined &&
          '-'}
        {condition.range?.end?.value}
      </>
    );
  }
  // Taxonomy
  if (condition.type === 'taxon') {
    return (
      <>
        taxon:{' '}
        {condition.conditionValues?.map(({ cvId, value }, index, array) => {
          let output: ReactNode = value;
          if (cvId) {
            output = (
              <TaxonomyView data={{ taxonId: +cvId, scientificName: value }} />
            );
          }
          return (
            <Fragment key={cvId || value}>
              {listFormat(index, array, 'or')}
              {output}
            </Fragment>
          );
        })}
      </>
    );
  }
  if (condition.type?.endsWith('id')) {
    const signatureDB = condition.type.replace(' id', '');
    return (
      <>
        matches {signatureDB}{' '}
        {pluralise('signature', condition.conditionValues?.length || 0)}:{' '}
        {condition.conditionValues?.map(({ value }, index, array) => {
          // TODO: find how to map this to an actual URL pattern
          const url = '#';
          return (
            <Fragment key={value}>
              {/* TODO: check, is it "and" or "or"? */}
              {listFormat(index, array, 'or')}
              <ExternalLink url={url}>{value}</ExternalLink>
            </Fragment>
          );
        })}
      </>
    );
  }
  // in case we're missing a case
  console.warn(condition); // eslint-disable-line no-console
  return <Fragment />;
};

const ConditionsComponent = ({
  conditions,
  extra,
}: {
  conditions?: Condition[];
  extra?: boolean;
}) => (
  <div>
    {conditions?.length ? (
      <>
        <p>
          {extra
            ? "Additionally to this rule's common conditions above, i"
            : 'I'}
          f a protein meets{' '}
          {conditions.length === 1
            ? 'the following condition'
            : `all of the following ${conditions.length} conditions`}
          :
        </p>
        <ul>
          {conditions.map((condition, index, { length }) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <span className={helper.italic}>
                {index !== 0 && 'and'}
                {condition.isNegative && ' not'}
                {index !== 0 && ', '}
              </span>
              <SingleCondition condition={condition} />
              {index + 1 < length ? ';' : '.'}
            </li>
          ))}
        </ul>
      </>
    ) : null}
  </div>
);

const SingleAnnotation = ({ annotation }: { annotation: Annotation }) => (
  <>{JSON.stringify(annotation, null, 2)}</>
);

const AnnotationsComponent = ({
  annotations,
  extra,
}: {
  annotations?: Annotation[];
  extra?: boolean;
}) => {
  if (!annotations?.length) {
    return (
      <div className={styles.annotations}>
        No specific annotations for this rule.
      </div>
    );
  }
  return (
    <div className={styles.annotations}>
      <p>
        Then
        {extra
          ? ", additionally to this rule's common annotations above, "
          : ' '}
        th
        {annotations.length === 1
          ? 'is annotation is applied'
          : `ese ${annotations.length} annotations are applied`}
        :
      </p>
      <ul>
        {annotations.map((annotation, index, { length }) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <span className={helper.italic}>{index !== 0 && 'and,'}</span>
            <SingleAnnotation annotation={annotation} />
            {index + 1 < length ? ';' : '.'}
          </li>
        ))}
      </ul>
    </div>
  );
};
const SingleException = ({ exception }: { exception: RuleException }) => (
  <>
    {exception.category}.<br />
    {exception.annotation && (
      <>
        {JSON.stringify(exception.annotation, null, 2)}.<br />
      </>
    )}
    {exception.accessions?.length ? (
      <>
        This applies to the following{' '}
        {exception.accessions.length === 1
          ? ''
          : `${exception.accessions.length} `}
        {pluralise('entry', exception.accessions.length, 'entries')}:{' '}
        {exception.accessions.map((accession, index, array) => (
          <Fragment key={accession}>
            {listFormat(index, array)}
            <AccessionView id={accession} namespace={Namespace.uniprotkb} />
          </Fragment>
        ))}
        .<br />
      </>
    ) : null}
    {exception.note}
  </>
);

const ExceptionsComponent = ({
  exceptions,
}: {
  exceptions?: RuleException[];
}) => {
  if (!exceptions?.length) {
    return null;
  }
  const total = exceptions.reduce(
    (sum, exception) => sum + (exception.accessions?.length || 0),
    0
  );
  return (
    <Message level="warning" className={styles.exceptions}>
      <p>
        Please note th
        {total === 1
          ? 'is exception'
          : `ese ${total} exceptions across ${exceptions.length} ${pluralise(
              'group',
              exceptions.length
            )}`}
        :
      </p>
      <ul>
        {exceptions.map((exception, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <SingleException exception={exception} />
          </li>
        ))}
      </ul>
    </Message>
  );
};

const RuleComponent = ({
  rule,
  extra,
}: {
  rule: Rule | CaseRule;
  extra?: boolean;
}) => (
  <div className={styles.rule}>
    <ConditionsComponent
      conditions={rule.conditionSets?.flatMap(
        (conditionSet) => conditionSet.conditions || []
      )}
      extra={extra}
    />
    <AnnotationsComponent annotations={rule.annotations} extra={extra} />
    <ExceptionsComponent exceptions={rule.ruleExceptions} />
  </div>
);

const ConditionsAnnotations = ({
  data,
}: {
  data: UniRuleAPIModel | ARBAAPIModel;
}) => (
  <>
    <Accordion
      title={<h2 className="medium">Common conditions &amp; annotations</h2>}
    >
      <RuleComponent rule={data.mainRule} />
    </Accordion>
    {data.otherRules?.map((otherRule, index) => (
      <Accordion
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={
          <h2 className="medium">{`Special condition set #${index + 1}`}</h2>
        }
      >
        <RuleComponent rule={otherRule} extra />
      </Accordion>
    ))}
    {data.positionFeatureSets?.map((positionalFeatureSet, index) => (
      <Accordion
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={
          <h2 className="medium">{`Special condition set #${
            (data.otherRules?.length || 0) + index + 1
          } (positional features)`}</h2>
        }
      >
        {JSON.stringify(positionalFeatureSet, null, 2)}
      </Accordion>
    ))}
    {data.samFeatureSets?.map((samFeatureSet, index) => (
      <Accordion
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={
          <h2 className="medium">{`Special condition set #${
            (data.otherRules?.length || 0) +
            (data.positionFeatureSets?.length || 0) +
            index +
            1
          } (SAM features)`}</h2>
        }
      >
        {JSON.stringify(samFeatureSet, null, 2)}
      </Accordion>
    ))}
  </>
);

export default ConditionsAnnotations;
