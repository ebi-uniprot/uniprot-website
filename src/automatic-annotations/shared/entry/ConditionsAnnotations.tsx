import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  ExternalLink,
  InfoList,
  EvidenceTag,
  InformationIcon,
} from 'franklin-sites';
import { isEqual, pullAll } from 'lodash-es';
import cn from 'classnames';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import AccessionView from '../../../shared/components/results/AccessionView';
import CSVView from '../../../uniprotkb/components/protein-data-views/CSVView';
import CatalyticActivityView from '../../../uniprotkb/components/protein-data-views/CatalyticActivityView';
import { CofactorView } from '../../../uniprotkb/components/entry/FunctionSection';

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
import {
  CatalyticActivityComment,
  CofactorComment,
} from '../../../uniprotkb/types/commentTypes';

import styles from './styles/conditions-annotations.module.scss';

type AnnotationWithExceptions = Annotation & { exceptions?: RuleException[] };

// NOTE: across values within a condition: OR
const conditionsToInfoData = (conditions: Condition[]) =>
  conditions.map((condition, index) => {
    const key = `${index}`;
    // Fragmented sequence
    if (condition.type === 'fragment') {
      return {
        title: 'fragmented',
        content: condition.isNegative ? 'no' : 'yes',
        key,
      };
    }
    // Sequence length
    if (condition.type === 'sequence length') {
      return {
        title: 'length',
        content: `${condition.range?.start?.value}${
          condition.range?.start?.value !== undefined &&
          condition.range?.end?.value !== undefined &&
          '-'
        }${condition.range?.end?.value}`,
        key,
      };
    }
    // Taxonomy
    if (condition.type === 'taxon') {
      return {
        title: 'taxon', // NOTE: don't pluralise, the values are "OR"-separated
        content: (
          <>
            {condition.conditionValues?.map(({ cvId, value }, index, array) => {
              let output: ReactNode = value;
              if (cvId) {
                output = (
                  <TaxonomyView
                    data={{ taxonId: +cvId, scientificName: value }}
                  />
                );
              }
              return (
                <Fragment key={cvId || value}>
                  {listFormat(index, array, 'or')}
                  {condition.isNegative && 'not'}
                  {output}
                </Fragment>
              );
            })}
          </>
        ),
        key,
      };
    }
    // Gene location
    if (condition.type === 'gene location') {
      return {
        title: 'gene location',
        content: (
          <>
            {condition.conditionValues?.map(({ value }, index, array) => {
              if (!value) {
                return null;
              }
              return (
                <Fragment key={value}>
                  {listFormat(index, array, 'or')}
                  {condition.isNegative && 'not'}
                  {value}
                </Fragment>
              );
            })}
          </>
        ),
        key,
      };
    }
    // Signature match
    if (condition.type?.endsWith('id')) {
      const signatureDB = condition.type.replace(' id', '');
      return {
        // NOTE: don't pluralise, the values are "OR"-separated
        title: `${signatureDB} signature`,
        content: (
          <>
            {condition.conditionValues?.map(({ value }, index, array) => {
              if (!value) {
                return null;
              }
              const url = externalUrls.InterProSearch(value);
              return (
                <Fragment key={value}>
                  {listFormat(index, array, 'or')}
                  {condition.isNegative && 'not'}
                  <ExternalLink url={url}>{value}</ExternalLink>
                </Fragment>
              );
            })}
          </>
        ),
        key,
      };
    }
    // in case we're missing a case
    console.warn(condition); // eslint-disable-line no-console
    return { title: '', content: null };
  });

// Accross condition sets: OR
// Across conditions within a condition set: AND
const ConditionsComponent = ({
  conditionSets,
}: {
  conditionSets?: ConditionSet[];
}) => (
  <ul className={cn(styles.conditions, 'no-bullet')}>
    {conditionSets?.map(({ conditions }, index) => {
      if (!conditions?.length) {
        // Would be absurd
        return null;
      }
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          {index !== 0 && 'or'}
          <InfoList infoData={conditionsToInfoData(conditions)} />
        </li>
      );
    })}
  </ul>
);

const ExceptionComponent = ({
  exceptions,
}: {
  exceptions?: Array<RuleException | undefined>;
}) => {
  const filteredExceptions = exceptions?.filter(
    (e: RuleException | undefined): e is RuleException => e !== undefined
  );
  if (!filteredExceptions?.length) {
    return null;
  }
  return (
    <EvidenceTag
      className={styles.exceptions}
      label={pluralise('exception', filteredExceptions.length)}
      iconComponent={<InformationIcon style={{ marginTop: '0.3em' }} />}
    >
      <ul>
        {filteredExceptions.map((exception, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {exception.category}:<br />
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
                    <AccessionView
                      id={accession}
                      namespace={Namespace.uniprotkb}
                    />
                  </Fragment>
                ))}
                .<br />
              </>
            ) : null}
            {exception.note && <span>Note: {exception.note}</span>}
          </li>
        ))}
      </ul>
    </EvidenceTag>
  );
};

const groupedAnnotation = (
  type: string,
  annotations: AnnotationWithExceptions[]
) => {
  // Keyword
  if (type === 'keyword') {
    return (
      <ul className="no-bullet">
        {annotations.map(
          (annotation) =>
            annotation.keyword?.id && (
              <li key={annotation.keyword.id}>
                <Link
                  to={getEntryPath(Namespace.keywords, annotation.keyword.id)}
                >
                  {annotation.keyword.name}
                </Link>
                <ExceptionComponent exceptions={annotation.exceptions} />
              </li>
            )
        )}
      </ul>
    );
  }
  if (type === 'GO term') {
    return (
      <ul className="no-bullet">
        {annotations.map(
          (annotation) =>
            annotation.dbReference?.id && (
              <li key={annotation.dbReference.id}>
                <ExternalLink
                  url={externalUrls.QuickGO(annotation.dbReference.id)}
                >
                  {annotation.dbReference.id}
                </ExternalLink>
                <ExceptionComponent exceptions={annotation.exceptions} />
              </li>
            )
        )}
      </ul>
    );
  }
  if (type === 'protein name') {
    return (
      <ul className="no-bullet">
        {annotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CSVView
              data={annotation.proteinDescription}
              bolderFirst={Boolean(
                annotation.proteinDescription?.recommendedName
              )}
            />
            <ExceptionComponent exceptions={annotation.exceptions} />
          </li>
        ))}
      </ul>
    );
  }
  if (type === 'gene name') {
    return (
      <ul className="no-bullet">
        {annotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CSVView data={annotation.gene} />
            <ExceptionComponent exceptions={annotation.exceptions} />
          </li>
        ))}
      </ul>
    );
  }
  if (type === 'subcellular location') {
    // TODO: check what needs to be done here
    const locations = annotations.flatMap(
      (annotation) => annotation.comment?.subcellularLocations
    );
    // NOTE: missing accessions in data here to generate links
    // NOTE: not handling possible exceptions here because we flattened
    return (
      <ul className="no-bullet">
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
      <>
        <CatalyticActivityView
          comments={annotations.map(
            (annotation) => annotation.comment as CatalyticActivityComment
          )}
          defaultHideAllReactions
        />
        <ExceptionComponent
          exceptions={annotations.flatMap(
            (annotation) => annotation.exceptions
          )}
        />
      </>
    );
  }
  if (type === 'cofactor') {
    return (
      <>
        <CofactorView
          cofactors={annotations.map(
            (annotation) => annotation.comment as CofactorComment
          )}
        />
        <ExceptionComponent
          exceptions={annotations.flatMap(
            (annotation) => annotation.exceptions
          )}
        />
      </>
    );
  }
  // last case, free text comments, check it contains texts anyway
  if (annotations[0]?.comment?.texts?.length) {
    return (
      <ul className="no-bullet">
        {annotations.map(
          (annotation, index) =>
            annotation.comment && (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {annotation.comment.texts?.map((text) => text.value).join('. ')}
                <ExceptionComponent exceptions={annotation.exceptions} />
              </li>
            )
        )}
      </ul>
    );
  }
  // If we arrived here, we missed a case
  // eslint-disable-next-line no-console
  console.warn(`missed ${type}: `, annotations);
  return null;
};

// See similar logic in AnnotationCovered.tsx common column renderer
const annotationsToInfoData = (annotations: AnnotationWithExceptions[]) => {
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
      type = 'GO term';
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

  return Array.from(map.entries()).map(([type, annotations]) => ({
    title: type,
    content: groupedAnnotation(type, annotations),
  }));
};

const mergeAnnotationsAndExceptions = (
  annotations: Annotation[],
  exceptions: RuleException[]
) => {
  // Make a shallow copy in order to avoid modifying the original when mutating
  let exceptionsToAssign = Array.from(exceptions);
  const output: AnnotationWithExceptions[] = [];
  for (const annotation of annotations) {
    const matchedExceptions = exceptionsToAssign.filter((exception) => {
      return isEqual(exception.annotation, annotation);
    });
    if (!matchedExceptions.length) {
      output.push(annotation);
    } else {
      output.push({ ...annotation, exceptions: matchedExceptions });
      // also, remove the assigned exceptions from the exception array
      // warning: pullAll mutates!
      exceptionsToAssign = pullAll(exceptionsToAssign, matchedExceptions);
    }
  }
  // Sanity check, we used all the exceptions to assign
  if (exceptionsToAssign.length) {
    // eslint-disable-next-line no-console
    console.warn('exceptions left unnassigned:', exceptionsToAssign);
  }
  return output;
};

const AnnotationsComponent = ({
  annotations,
  exceptions,
}: {
  annotations?: Annotation[];
  exceptions?: RuleException[];
}) => {
  if (!annotations?.length) {
    // Might be absurd, but we never know
    return (
      <div className={styles.annotations}>
        No specific annotations for this rule.
      </div>
    );
  }
  // TODO: actually, this needs to be associated to groups of annotations, not just one by one
  // Example to work with: UR000000032
  const annotationsWithExceptions = exceptions
    ? mergeAnnotationsAndExceptions(annotations, exceptions)
    : annotations;
  return (
    <div className={styles.annotations}>
      <InfoList infoData={annotationsToInfoData(annotationsWithExceptions)} />
      {/* {groupedAnnotationsTuples.map(([type, annotations]) => (
        <Fragment key={type}>
          <h3 className="small">{type}:</h3>
          <GroupedAnnotation type={type} annotations={annotations} />
        </Fragment>
      ))} */}
    </div>
  );
};

const RuleComponent = ({
  rule,
  extra,
}: {
  rule: Rule | CaseRule;
  extra?: boolean;
}) => (
  <div className={cn(styles.rule, { [styles.extra]: extra })}>
    <ConditionsComponent conditionSets={rule.conditionSets} />
    <AnnotationsComponent
      annotations={rule.annotations}
      exceptions={rule.ruleExceptions}
    />
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
