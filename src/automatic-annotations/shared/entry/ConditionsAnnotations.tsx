import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, ExternalLink, Message } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import AccessionView from '../../../shared/components/results/AccessionView';
import CSVView from '../../../uniprotkb/components/protein-data-views/CSVView';
import CatalyticActivityView from '../../../uniprotkb/components/protein-data-views/CatalyticActivityView';

import listFormat from '../../../shared/utils/listFormat';
import { pluralise } from '../../../shared/utils/utils';
import externalUrls from '../../../shared/config/externalUrls';
import { getEntryPath } from '../../../app/config/urls';

import { UniRuleAPIModel } from '../../unirule/adapters/uniRuleConverter';
import { ARBAAPIModel } from '../../arba/adapters/arbaConverter';
import {
  CaseRule,
  Rule,
  Condition,
  RuleException,
  Annotation,
  ConditionSet,
} from '../model';
import { Namespace } from '../../../shared/types/namespaces';
import { CatalyticActivityComment } from '../../../uniprotkb/types/commentTypes';

import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/conditions-annotations.module.scss';

// Across values within a condition: OR
const SingleCondition = ({ condition }: { condition: Condition }) => {
  if (condition.type === 'fragment') {
    return (
      <>
        is <strong>{condition.isNegative ? 'not ' : ''}fragmented</strong>
      </>
    );
  }
  // Sequence length
  if (condition.type === 'sequence length') {
    return (
      <>
        <strong>{condition.isNegative ? 'does not have' : 'has'}</strong>{' '}
        length:
        {condition.range?.start?.value}
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
        <strong>
          {condition.isNegative ? 'is not found in' : 'is found in'}
        </strong>{' '}
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
  // Signature match
  if (condition.type?.endsWith('id')) {
    const signatureDB = condition.type.replace(' id', '');
    return (
      <>
        <strong>{condition.isNegative ? 'does not match' : 'matches'}</strong>{' '}
        {signatureDB} signature:{' '}
        {condition.conditionValues?.map(({ value }, index, array) => {
          if (!value) {
            return null;
          }
          const url = externalUrls.InterProSearch(value);
          return (
            <Fragment key={value}>
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
  return <>{JSON.stringify(condition, null, 2)}</>;
};

// Accross condition sets: OR
// Across conditions within a condition set: AND
const ConditionsComponent = ({
  conditionSets,
  extra,
}: {
  conditionSets?: ConditionSet[];
  extra?: boolean;
}) => (
  <div className={styles.conditions}>
    {conditionSets?.map(({ conditions }, index) => {
      if (!conditions?.length) {
        return null;
      }
      const intro: ReactNode[] = [];
      if (index === 0) {
        // Start of the sentence, option 1
        if (extra) {
          intro.push(
            <Fragment key="extra">
              <strong>Additionally</strong>
              {" to this rule's common conditions at the top, "}
              <strong>if</strong>
            </Fragment>
          );
        } else {
          // Start of the sentence, option 2
          intro.push(<strong key="main">If</strong>);
        }
      } else {
        // Start of the sentence, option 3
        intro.push(<strong key="complex">Or, if</strong>);
      }
      // Common bit of the sentence
      intro.push(' a protein meets ');
      if (conditions.length === 1) {
        // End of the sentence, option 1
        intro.push('the following condition:');
      } else {
        // End of the sentence, option 2
        intro.push('all of the following conditions:');
      }
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          <p>{intro}</p>
          <ul>
            {conditions.map((condition, index, { length }) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                <span className={helper.italic}>{index !== 0 && 'and, '}</span>
                <SingleCondition condition={condition} />
                {index + 1 < length ? ';' : '.'}
              </li>
            ))}
          </ul>
        </Fragment>
      );
    })}
  </div>
);

const GroupedAnnotation = ({
  type,
  annotations,
}: {
  type: string;
  annotations: Annotation[];
}) => {
  // Keyword
  if (type === 'keyword') {
    return (
      <>
        {annotations.map(
          (annotation, index, array) =>
            annotation.keyword?.id && (
              <Fragment key={annotation.keyword.id}>
                {listFormat(index, array)}
                <Link
                  to={getEntryPath(Namespace.keywords, annotation.keyword.id)}
                >
                  {annotation.keyword.name}
                </Link>
              </Fragment>
            )
        )}
      </>
    );
  }
  if (type === 'GO (Gene Ontology) term') {
    return (
      <>
        {annotations.map(
          (annotation, index, array) =>
            annotation.dbReference?.id && (
              <Fragment key={annotation.dbReference.id}>
                {listFormat(index, array)}
                <ExternalLink
                  url={externalUrls.QuickGO(annotation.dbReference.id)}
                >
                  {annotation.dbReference.id}
                </ExternalLink>
              </Fragment>
            )
        )}
      </>
    );
  }
  if (type === 'protein name') {
    return (
      <ul>
        {annotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CSVView
              data={annotation.proteinDescription}
              bolderFirst={Boolean(
                annotation.proteinDescription?.recommendedName
              )}
            />
          </li>
        ))}
      </ul>
    );
  }
  if (type === 'gene name') {
    return (
      <ul>
        {annotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CSVView data={annotation.gene} />
          </li>
        ))}
      </ul>
    );
  }
  if (type === 'subcellular location') {
    const locations = annotations.flatMap(
      (annotation) => annotation.comment?.subcellularLocations
    );
    // NOTE: missing accessions in data here to generate links
    return (
      <ul>
        {locations.map(
          (location) =>
            location?.location?.value && (
              <Fragment key={location.location.value}>
                <li>{location.location.value}</li>
                {location.topology?.value && <li>{location.topology.value}</li>}
              </Fragment>
            )
        )}
      </ul>
    );
  }
  if (type === 'catalytic activity') {
    return (
      <CatalyticActivityView
        comments={annotations.map(
          (annotation) => annotation.comment as CatalyticActivityComment
        )}
        defaultHideAllReactions
      />
    );
  }
  // last case, free text comments
  return (
    <ul>
      {annotations.map(
        (annotation, index) =>
          annotation.comment && (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              {annotation.comment.texts?.map((text) => text.value).join('. ')}
            </li>
          )
      )}
    </ul>
  );
};

// See similar logic in AnnotationCovered.tsx common column renderer
const groupAnnotations = (annotations: Annotation[]) => {
  const map = new Map<string, Annotation[]>();

  for (const annotation of annotations) {
    let type: string | undefined;
    if ('keyword' in annotation) {
      type = 'keyword';
    } else if ('proteinDescription' in annotation) {
      type = 'protein name';
    } else if ('gene' in annotation) {
      type = 'gene name';
    } else if (annotation.comment?.commentType) {
      type = annotation.comment?.commentType.toLowerCase();
    } else if (annotation.dbReference?.database === 'GO') {
      type = 'GO (Gene Ontology) term';
    } else {
      // in case we're missing a case
      console.warn(annotation); // eslint-disable-line no-console
    }
    if (type) {
      const annotations = map.get(type) || [];
      annotations.push(annotation);
      map.set(type, annotations);
    }
  }

  return map;
};

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
  const intro: ReactNode[] = [
    <Fragment key="common">
      <strong>Then</strong>,{' '}
    </Fragment>,
  ];
  if (extra) {
    intro.push(
      <Fragment key="extra">
        <strong>additionally</strong>
        {" to this rule's common annotations above, "}
      </Fragment>
    );
  }
  if (annotations.length === 1) {
    intro.push('this annotation is applied:');
  } else {
    intro.push('all these annotations are applied:');
  }
  const groupedAnnotationsTuples = Array.from(
    groupAnnotations(annotations).entries()
  );
  return (
    <div className={styles.annotations}>
      <p>{intro}</p>
      {groupedAnnotationsTuples.map(([type, annotations]) => (
        <Fragment key={type}>
          <h3 className="small">{type}:</h3>
          <GroupedAnnotation type={type} annotations={annotations} />
        </Fragment>
      ))}
    </div>
  );
};
const SingleException = ({ exception }: { exception: RuleException }) => {
  const groupedAnnotationsTuple =
    exception?.annotation &&
    Array.from(groupAnnotations([exception.annotation]));
  return (
    <>
      {exception.category}.<br />
      {groupedAnnotationsTuple && (
        <>
          <GroupedAnnotation
            type={groupedAnnotationsTuple[0][0]}
            annotations={groupedAnnotationsTuple[0][1]}
          />
          .
          <br />
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
};

const ExceptionsComponent = ({
  exceptions,
}: {
  exceptions?: RuleException[];
}) => {
  if (!exceptions?.length) {
    return null;
  }
  return (
    <Message level="warning" className={styles.exceptions}>
      <p>
        Please note th
        {exceptions.length === 1 && exceptions[0].accessions?.length === 1
          ? 'is exception'
          : `ese exceptions`}
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
    <ConditionsComponent conditionSets={rule.conditionSets} extra={extra} />
    <div className={styles.arrow}>➡️</div>
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
    <Card
      header={<h2 className="medium">Common conditions &amp; annotations</h2>}
    >
      <RuleComponent rule={data.mainRule} />
    </Card>
    {data.otherRules?.map((otherRule, index) => (
      <Card
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        header={
          <h2 className="medium">{`Special condition set #${index + 1}`}</h2>
        }
      >
        <RuleComponent rule={otherRule} extra />
      </Card>
    ))}
    {data.positionFeatureSets?.map((positionalFeatureSet, index) => (
      <Card
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        header={
          <h2 className="medium">{`Special condition set #${
            (data.otherRules?.length || 0) + index + 1
          } (positional features)`}</h2>
        }
      >
        {JSON.stringify(positionalFeatureSet, null, 2)}
      </Card>
    ))}
    {data.samFeatureSets?.map((samFeatureSet, index) => (
      <Card
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        header={
          <h2 className="medium">{`Special condition set #${
            (data.otherRules?.length || 0) +
            (data.positionFeatureSets?.length || 0) +
            index +
            1
          } (SAM features)`}</h2>
        }
      >
        {JSON.stringify(samFeatureSet, null, 2)}
      </Card>
    ))}
  </>
);

export default ConditionsAnnotations;
