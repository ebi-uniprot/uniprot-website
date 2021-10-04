import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  ExternalLink,
  InfoList,
  EvidenceTag,
  InformationIcon,
} from 'franklin-sites';
import { isEqual, pullAll, omit } from 'lodash-es';
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
  PositionFeatureSet,
  Range,
} from '../model';
import { Namespace } from '../../../shared/types/namespaces';
import {
  CatalyticActivityComment,
  CofactorComment,
} from '../../../uniprotkb/types/commentTypes';

import styles from './styles/conditions-annotations.module.scss';

type AnnotationWithExceptions = Annotation & { exceptions?: RuleException[] };

const position = (range?: Range) => {
  if (range?.start?.value) {
    if (!range.end?.value || range.end.value === range.start.value) {
      return <>{range.start.value}</>;
    }
    return (
      <>
        {range.start.value}-{range.end.value}
      </>
    );
  }
  return null;
};

const positionalFeatureSetToInfoDatumCondition = (
  positionFeatureSet: PositionFeatureSet,
  negative?: boolean,
  key?: string
) => ({
  title: 'positional features',
  content: (
    <ul className="no-bullet">
      {negative && 'not'}
      {positionFeatureSet.positionalFeatures?.map((pf, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          {position(pf.position)}: {pf.pattern}
        </li>
      ))}
    </ul>
  ),
  key,
});

const positionalFeatureSetToInfoDatumAnnotation = (
  positionFeatureSet: PositionFeatureSet
) => ({
  title: 'positional features',
  content: (
    <ul className="no-bullet">
      {positionFeatureSet.positionalFeatures?.map((pf, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          {position(pf.position)}: {pf.type} - {pf.value}
        </li>
      ))}
    </ul>
  ),
});

// NOTE: across values within a condition: OR
// NOTE: except for positional features: AND
const conditionsToInfoData = (
  conditions: Condition[],
  positionalFeatureSets: PositionFeatureSet[] = [],
  positionalFocus?: boolean
) => {
  const items = positionalFocus
    ? [...positionalFeatureSets, ...conditions]
    : conditions;
  return items.map((condition, index) => {
    const key = `${index}`;
    // actually not a condition, it's a positional feature set
    if (!('type' in condition)) {
      if (!('positionalFeatures' in condition)) {
        // eslint-disable-next-line no-console
        console.warn('unexpected positional feature set:', condition);
        return { title: '', content: null };
      }
      return positionalFeatureSetToInfoDatumCondition(condition, false, key);
    }
    // Tag to a positional feature
    if (condition.type === 'Feature Tag') {
      // Retrieve the corresponding positional feature set to display it
      const matchingSet = positionalFeatureSets?.find(
        (pfs) => pfs.tag === condition.tag?.value
      );
      if (matchingSet) {
        return positionalFeatureSetToInfoDatumCondition(
          matchingSet,
          condition.isNegative,
          key
        );
      }
    }
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
        content: (
          <>
            {condition.isNegative && 'not '}
            {position(condition.range)}
          </>
        ),
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
                  {condition.isNegative && 'not '}
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
                  {condition.isNegative && 'not '}
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
                  {condition.isNegative && 'not '}
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
};

// Accross condition sets: OR
// Across conditions within a condition set: AND
const ConditionsComponent = ({
  conditionSets,
  positionalFeatureSets,
}: {
  conditionSets?: ConditionSet[];
  positionalFeatureSets?: PositionFeatureSet[];
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
          <InfoList
            infoData={conditionsToInfoData(conditions, positionalFeatureSets)}
          />
        </li>
      );
    })}
  </ul>
);

const ExceptionComponent = ({
  annotationWithExceptions,
}: {
  annotationWithExceptions: AnnotationWithExceptions;
}) => {
  const filteredExceptions = annotationWithExceptions.exceptions?.filter(
    (e: RuleException | undefined): e is RuleException => e !== undefined
  );
  if (!filteredExceptions?.length) {
    return null;
  }
  const originalAnnotation = omit(annotationWithExceptions, 'exceptions');
  return (
    <EvidenceTag
      className={styles.exceptions}
      label={pluralise('exception', filteredExceptions.length)}
      iconComponent={<InformationIcon style={{ marginTop: '0.3em' }} />}
    >
      <ul>
        {filteredExceptions.map((exception, index) => {
          // Only need to display the exception's annotation if it is distinct
          // from the main annotation
          const needsToDisplayAnnotation = !isEqual(
            originalAnnotation,
            exception.annotation
          );
          return (
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
              {exception.annotation && needsToDisplayAnnotation && (
                <InfoList
                  infoData={annotationsToInfoData([exception.annotation])}
                />
              )}
              {exception.note && <span>Note: {exception.note}</span>}
            </li>
          );
        })}
      </ul>
    </EvidenceTag>
  );
};

const groupedAnnotation = (
  type: string,
  annotations: Array<AnnotationWithExceptions | PositionFeatureSet>
) => {
  const typedAnnotations = annotations as AnnotationWithExceptions[];
  // Keyword
  if (type === 'keyword') {
    return (
      <ul className="no-bullet">
        {typedAnnotations.map(
          (annotation) =>
            annotation.keyword?.id && (
              <li key={annotation.keyword.id}>
                <Link
                  to={getEntryPath(Namespace.keywords, annotation.keyword.id)}
                >
                  {annotation.keyword.name}
                </Link>
                <ExceptionComponent annotationWithExceptions={annotation} />
              </li>
            )
        )}
      </ul>
    );
  }
  if (type === 'GO term') {
    return (
      <ul className="no-bullet">
        {typedAnnotations.map(
          (annotation) =>
            annotation.dbReference?.id && (
              <li key={annotation.dbReference.id}>
                <ExternalLink
                  url={externalUrls.QuickGO(annotation.dbReference.id)}
                >
                  {annotation.dbReference.id}
                </ExternalLink>
                <ExceptionComponent annotationWithExceptions={annotation} />
              </li>
            )
        )}
      </ul>
    );
  }
  if (type === 'protein name') {
    return (
      <ul className="no-bullet">
        {typedAnnotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CSVView
              data={annotation.proteinDescription}
              bolderFirst={Boolean(
                annotation.proteinDescription?.recommendedName
              )}
            />
            <ExceptionComponent annotationWithExceptions={annotation} />
          </li>
        ))}
      </ul>
    );
  }
  if (type === 'gene name') {
    return (
      <ul className="no-bullet">
        {typedAnnotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CSVView data={annotation.gene} />
            <ExceptionComponent annotationWithExceptions={annotation} />
          </li>
        ))}
      </ul>
    );
  }
  if (type === 'subcellular location') {
    // TODO: check what needs to be done here
    const locations = typedAnnotations.flatMap(
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
      <ul className="no-bullet">
        {typedAnnotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CatalyticActivityView
              comments={[annotation.comment as CatalyticActivityComment]}
              defaultHideAllReactions
            />
            <ExceptionComponent annotationWithExceptions={annotation} />
          </li>
        ))}
      </ul>
    );
  }
  if (type === 'cofactor') {
    return (
      <ul className="no-bullet">
        {typedAnnotations.map((annotation, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <CofactorView cofactors={[annotation.comment as CofactorComment]} />
            <ExceptionComponent annotationWithExceptions={annotation} />
          </li>
        ))}
      </ul>
    );
  }
  // last case, free text comments, check it contains texts anyway
  if (typedAnnotations[0]?.comment?.texts?.length) {
    return (
      <ul className="no-bullet">
        {typedAnnotations.map(
          (annotation, index) =>
            annotation.comment && (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {annotation.comment.texts?.map((text) => text.value).join('. ')}
                <ExceptionComponent annotationWithExceptions={annotation} />
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
function annotationsToInfoData(
  annotations: AnnotationWithExceptions[],
  positionalFeatureSet?: PositionFeatureSet
) {
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

  const infoData = Array.from(map.entries()).map(([type, annotations]) => ({
    title: type,
    content: groupedAnnotation(type, annotations),
  }));

  if (positionalFeatureSet) {
    infoData.unshift(
      positionalFeatureSetToInfoDatumAnnotation(positionalFeatureSet)
    );
  }

  return infoData;
}

const mergeAnnotationsAndExceptions = (
  annotations: Annotation[],
  exceptions: RuleException[]
) => {
  // Make a shallow copy in order to avoid modifying the original when mutating
  let exceptionsToAssign = Array.from(exceptions);
  const output: AnnotationWithExceptions[] = [];
  for (const annotation of annotations) {
    const matchedExceptions = exceptionsToAssign.filter((exception) => {
      // If annotations are perfectly identical, match them
      if (isEqual(exception.annotation, annotation)) {
        return true;
      }
      // Specific cases
      // Match any protein description annotations
      if (
        exception.annotation &&
        'proteinDescription' in annotation &&
        'proteinDescription' in exception.annotation
      ) {
        return true;
      }
      // Match any gene description annotations
      if (
        exception.annotation &&
        'gene' in annotation &&
        'gene' in exception.annotation
      ) {
        return true;
      }
      return false;
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
  annotations = [],
  positionalFeatureSet,
  exceptions,
}: {
  annotations?: Annotation[];
  positionalFeatureSet?: PositionFeatureSet;
  exceptions?: RuleException[];
}) => {
  if (!annotations.length && !positionalFeatureSet) {
    // Might be absurd, but we never know
    return (
      <div className={styles.annotations}>
        No specific annotations for this rule.
      </div>
    );
  }
  const annotationsWithExceptions = exceptions
    ? mergeAnnotationsAndExceptions(annotations, exceptions)
    : annotations;
  return (
    <div className={styles.annotations}>
      <InfoList
        infoData={annotationsToInfoData(
          annotationsWithExceptions,
          positionalFeatureSet
        )}
      />
    </div>
  );
};

const RuleComponent = ({
  rule,
  positionalFeatureSets,
  extra,
}: {
  rule: Rule | CaseRule;
  positionalFeatureSets?: PositionFeatureSet[];
  extra?: boolean;
}) => (
  <div className={cn(styles.rule, { [styles.extra]: extra })}>
    <ConditionsComponent
      conditionSets={rule.conditionSets}
      positionalFeatureSets={positionalFeatureSets}
    />
    <AnnotationsComponent
      annotations={rule.annotations}
      exceptions={rule.ruleExceptions}
    />
  </div>
);

const PositionalFeatureComponent = ({
  positionalFeatureSet,
}: {
  positionalFeatureSet: PositionFeatureSet;
}) => (
  <div className={cn(styles.rule, styles.extra)}>
    <div className={styles.conditions}>
      <InfoList
        infoData={conditionsToInfoData(
          positionalFeatureSet.conditions || [],
          [positionalFeatureSet],
          true
        )}
      />
    </div>
    <AnnotationsComponent
      annotations={positionalFeatureSet.annotations}
      positionalFeatureSet={positionalFeatureSet}
      exceptions={positionalFeatureSet.ruleExceptions}
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
      <RuleComponent
        rule={data.mainRule}
        positionalFeatureSets={data.positionFeatureSets}
      />
    </Card>
    {data.otherRules?.map((otherRule, index) => (
      <Card
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        header={
          <h2 className="medium">{`Special condition set #${index + 1}`}</h2>
        }
      >
        <RuleComponent
          rule={otherRule}
          positionalFeatureSets={data.positionFeatureSets}
          extra
        />
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
        <PositionalFeatureComponent
          positionalFeatureSet={positionalFeatureSet}
        />
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
