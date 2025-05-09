import cn from 'classnames';
import {
  EllipsisReveal,
  InfoList,
  // EvidenceTag,
  // InformationIcon,
} from 'franklin-sites';
import { isEqual, pullAll /* , omit */ } from 'lodash-es';
import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import ExternalLink from '../../../shared/components/ExternalLink';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { Namespace } from '../../../shared/types/namespaces';
import listFormat from '../../../shared/utils/listFormat';
import * as logging from '../../../shared/utils/logging';
import { pluralise } from '../../../shared/utils/utils';
import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';
import { CofactorView } from '../../../uniprotkb/components/entry/FunctionSection';
import CatalyticActivityView from '../../../uniprotkb/components/protein-data-views/CatalyticActivityView';
// import AccessionView from '../../../shared/components/results/AccessionView';
import CSVView from '../../../uniprotkb/components/protein-data-views/CSVView';
import LigandDescriptionView from '../../../uniprotkb/components/protein-data-views/LigandDescriptionView';
import {
  CatalyticActivityComment,
  CofactorComment,
} from '../../../uniprotkb/types/commentTypes';
import { DatabaseInfoMaps } from '../../../uniprotkb/utils/database';
import { ARBAAPIModel } from '../../arba/adapters/arbaConverter';
import { UniRuleAPIModel } from '../../unirule/adapters/uniRuleConverter';
import {
  Annotation,
  CaseRule,
  Condition,
  ConditionSet,
  PositionFeatureSet,
  Range,
  Rule,
  RuleException,
  SAMFeatureSet,
} from '../model';
import styles from './styles/conditions-annotations.module.scss';

type AnnotationWithExceptions = Annotation & { exceptions?: RuleException[] };

const position = (range?: Range) => {
  if (range?.start?.value) {
    if (!range.end?.value || range.end.value === range.start.value) {
      return range.start.value;
    }
    return `${range.start.value}-${range.end.value}`;
  }
  return null;
};

const hits = (range?: Range) => {
  if (range?.start?.value) {
    if (!range.end?.value || range.end.value === range.start.value) {
      return range.start.value;
    }
    return `${range.start.value} to ${range.end.value}`;
  }
  return 0;
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

const samFeatureSetToInfoDatumCondition = (samFeatureSet: SAMFeatureSet) => {
  const nHits = hits(samFeatureSet.samTrigger?.expectedHits);
  return {
    title: `predicted ${samFeatureSet.samTrigger?.samTriggerType}`,
    content: `${nHits} ${pluralise(
      'hit',
      // use the number value, but if it's a string ("x to y"), then use plural
      typeof nHits === 'number' ? nHits : 2
    )}`,
    key: 'sam feature',
  };
};

// NOTE: across values within a condition: OR
// NOTE: except for positional features: AND
const conditionsToInfoData = (
  conditions: Condition[],
  databaseInfoMaps: DatabaseInfoMaps | null,
  featureSets: Array<PositionFeatureSet | SAMFeatureSet> = [],
  featureFocus = false
) => {
  const items = featureFocus ? [...featureSets, ...conditions] : conditions;
  return items.map((condition, index) => {
    const key = `${index}`;
    // actually not a condition, it's a positional feature set
    if (!('type' in condition)) {
      if ('positionalFeatures' in condition) {
        return positionalFeatureSetToInfoDatumCondition(condition, false, key);
      }
      if ('samTrigger' in condition) {
        return samFeatureSetToInfoDatumCondition(condition);
      }
      logging.warn('unexpected positional feature set', {
        extra: { data: condition },
      });
      return { title: '', content: null };
    }
    // Tag to a positional feature
    if (condition.type === 'Feature Tag') {
      // Retrieve the corresponding positional feature set to display it
      const matchingSet = featureSets?.find(
        (fs) => 'tag' in fs && fs.tag === condition.tag?.value
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
        content: condition.isNegative ? (
          <span className={cn(styles.statement, styles.negation)}>no</span>
        ) : (
          'yes'
        ),
        key,
      };
    }
    // Sequence length
    if (condition.type === 'sequence length') {
      return {
        title: 'length',
        content: (
          <>
            {condition.isNegative && (
              <>
                <span className={cn(styles.statement, styles.negation)}>
                  not
                </span>{' '}
              </>
            )}
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
        content: condition.conditionValues?.map(
          ({ cvId, value }, index, array) => {
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
                {condition.isNegative && (
                  <>
                    <span className={cn(styles.statement, styles.negation)}>
                      not
                    </span>{' '}
                  </>
                )}
                {output}
              </Fragment>
            );
          }
        ),
        key,
      };
    }
    // Gene location
    if (condition.type === 'gene location') {
      return {
        title: 'gene location',
        content: condition.conditionValues?.map(({ value }, index, array) => {
          if (!value) {
            return null;
          }
          return (
            <Fragment key={value}>
              {listFormat(index, array, 'or')}
              {condition.isNegative && (
                <>
                  <span className={cn(styles.statement, styles.negation)}>
                    not
                  </span>{' '}
                </>
              )}
              {value}
            </Fragment>
          );
        }),
        key,
      };
    }
    // Proteome property
    if (condition.type === 'proteome property') {
      return {
        title: 'proteome property',
        content: condition.conditionValues?.map(({ value }) => {
          if (!value) {
            return null;
          }
          return (
            <Fragment key={value}>
              {condition.isNegative && (
                <>
                  <span className={cn(styles.statement, styles.negation)}>
                    not
                  </span>{' '}
                </>
              )}
              {value}
            </Fragment>
          );
        }),
        key,
      };
    }
    // Signature match
    if (condition.type?.endsWith('id') || condition.type?.endsWith('hits')) {
      const signatureDB: string = condition.type.replace(/ (id|hits)$/, '');
      let range: ReactNode = null;
      if (condition.range?.start?.value) {
        if (
          !condition.range.end?.value ||
          condition.range.start.value === condition.range.end.value
        ) {
          range = ` has exactly ${condition.range.start.value} ${pluralise(
            'hit',
            condition.range.start.value
          )}`;
        } else {
          range = ` has between ${condition.range.start.value} and ${
            condition.range.end.value
          } ${pluralise('hit', condition.range.end.value)}`;
        }
      }

      return {
        // NOTE: don't pluralise, the values are "OR"-separated
        title: `${signatureDB}${
          condition.type.endsWith('id') ? ' signature' : ' hits'
        }`,
        content: condition.conditionValues?.map(({ value }, index, array) => {
          if (!value) {
            return null;
          }

          let url: string | null = null;
          if (signatureDB === 'SRHMM') {
            // skip, not sure what to link to
          } else if (signatureDB === 'SCOP Superfamily') {
            url = getUrlFromDatabaseInfo(databaseInfoMaps, 'SUPFAM', {
              id: value,
            });
          } else if (signatureDB === 'PIR superfamily') {
            url = getUrlFromDatabaseInfo(databaseInfoMaps, 'PIRSF', {
              id: value,
            });
          } else if (signatureDB === 'PROSITE pattern') {
            url = getUrlFromDatabaseInfo(databaseInfoMaps, 'PROSITE', {
              id: value,
            });
          } else {
            url = getUrlFromDatabaseInfo(databaseInfoMaps, signatureDB, {
              id: value,
            });
          }

          return (
            <Fragment key={value}>
              {listFormat(index, array, 'or')}
              {condition.isNegative && (
                <>
                  <span className={cn(styles.statement, styles.negation)}>
                    not
                  </span>{' '}
                </>
              )}
              <ExternalLink url={url}>{value}</ExternalLink>
              {range}
            </Fragment>
          );
        }),
        key,
      };
    }
    logging.warn('missing case', { extra: { data: condition } });
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
}) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  return (
    <ul className={cn(styles.conditions, 'no-bullet')}>
      {conditionSets?.map(({ conditions }, index) => {
        if (!conditions?.length) {
          // Would be absurd
          return null;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {index !== 0 && (
              <div className={cn(styles.statement, styles.or)}>or</div>
            )}
            <div className={cn(styles.statement, styles.if)}>if</div>
            <InfoList
              infoData={conditionsToInfoData(
                conditions,
                databaseInfoMaps,
                positionalFeatureSets
              )}
            />
          </li>
        );
      })}
    </ul>
  );
};

const GroupedAnnotation = (
  type: string,
  annotations: Array<AnnotationWithExceptions | PositionFeatureSet>
) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
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
              </li>
            )
        )}
      </ul>
    );
  }
  if (type === 'GO term' && databaseInfoMaps) {
    return (
      <ul className="no-bullet">
        {typedAnnotations.map(
          (annotation) =>
            annotation.dbReference?.id && (
              <li key={annotation.dbReference.id}>
                <ExternalLink
                  url={getUrlFromDatabaseInfo(databaseInfoMaps, 'GO', {
                    id: annotation.dbReference.id,
                  })}
                >
                  {annotation.dbReference.id}
                </ExternalLink>
              </li>
            )
        )}
      </ul>
    );
  }
  if (type === 'protein name') {
    return (
      <ul className="no-bullet">
        <EllipsisReveal.Provider>
          {typedAnnotations.map((annotation, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <CSVView
                data={annotation.proteinDescription}
                bolderFirst={Boolean(
                  annotation.proteinDescription?.recommendedName
                )}
                contextKey="protein_name"
              />
            </li>
          ))}
        </EllipsisReveal.Provider>
      </ul>
    );
  }
  if (type === 'gene name') {
    return (
      <ul className="no-bullet">
        <EllipsisReveal.Provider>
          {typedAnnotations.map((annotation, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <CSVView data={annotation.gene} contextKey="gene name" />
            </li>
          ))}
        </EllipsisReveal.Provider>
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
              </li>
            )
        )}
      </ul>
    );
  }
  logging.warn(`missing case: ${type}`, { extra: { data: annotations } });
  return null;
};

// See similar logic in AnnotationCovered.tsx common column renderer
function annotationsToInfoData(
  annotations: AnnotationWithExceptions[],
  featureSet?: PositionFeatureSet | SAMFeatureSet
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
      logging.warn('missing case', { extra: { data: annotation } });
    }
    if (type) {
      const annotations = map.get(type) || [];
      annotations.push(annotation);
      map.set(type, annotations);
    }
  }

  const infoData = Array.from(map.entries()).map(([type, annotations]) => ({
    title: type,
    content: GroupedAnnotation(type, annotations),
  }));

  if (featureSet) {
    if ('positionalFeatures' in featureSet) {
      infoData.unshift({
        title: 'positional features',
        content: (
          <ul className="no-bullet">
            {featureSet.positionalFeatures?.map((pf, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <li>
                  {position(pf.position)}: {pf.type}
                </li>
                {pf.ligand && (
                  <li>
                    <LigandDescriptionView
                      ligand={pf.ligand}
                      ligandPart={pf.ligandPart}
                      description={pf.description}
                    />
                  </li>
                )}
              </div>
            ))}
          </ul>
        ),
      });
    } else if (
      'samTrigger' in featureSet &&
      featureSet.samTrigger?.samTriggerType
    ) {
      // all this section is hardcoded in the current website... 🙄
      const type = featureSet.samTrigger.samTriggerType;
      if (type === 'signal') {
        infoData.unshift({
          title: 'chain',
          content: (
            <>
              <em>@CHAIN_NAME@</em> to residues corresponding to positions{' '}
              <em>@TO|+1@</em> - <em>@CTER@</em>)
            </>
          ),
        });
        infoData.unshift({
          title: 'signal peptide',
          content: (
            <>
              to residues corresponding to positions <em>@NTER@</em> -{' '}
              <em>@TO@</em>
            </>
          ),
        });
      } else if (type === 'transmembrane') {
        infoData.unshift({
          title: 'transmembrane',
          content: (
            <>
              Helical (to residues corresponding to positions <em>@FROM@</em> -{' '}
              <em>@TO@</em>)
            </>
          ),
        });
      } else if (type === 'coiledCoil') {
        infoData.unshift({
          title: 'coiled coil',
          content: (
            <>
              to residues corresponding to positions <em>@FROM@</em> -{' '}
              <em>@TO@</em>
            </>
          ),
        });
      } else {
        logging.warn('missing case', { extra: { data: featureSet } });
      }
    }
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
    logging.warn('exceptions left unnassigned', {
      extra: { data: exceptionsToAssign },
    });
  }
  return output;
};

const AnnotationsComponent = ({
  annotations = [],
  featureSet,
  exceptions,
}: {
  annotations?: Annotation[];
  featureSet?: PositionFeatureSet | SAMFeatureSet;
  exceptions?: RuleException[];
}) => {
  if (!annotations.length && !featureSet) {
    // Example: UR001569201
    return (
      <div className={styles.annotations}>
        <div className={styles.statement}>then</div>
        No specific annotations for this rule
      </div>
    );
  }
  const annotationsWithExceptions = exceptions
    ? mergeAnnotationsAndExceptions(annotations, exceptions)
    : annotations;
  return (
    <div className={styles.annotations}>
      <div className={styles.statement}>then</div>
      <InfoList
        infoData={annotationsToInfoData(annotationsWithExceptions, featureSet)}
      />
    </div>
  );
};

const RuleComponent = ({
  rule,
  positionalFeatureSets,
}: {
  rule: Rule | CaseRule;
  positionalFeatureSets?: PositionFeatureSet[];
}) => (
  <div className={styles.rule}>
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
}) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  return (
    <div className={styles.rule}>
      <ul className={cn(styles.conditions, 'no-bullet')}>
        <li>
          <div className={cn(styles.statement, styles.if)}>if</div>
          <InfoList
            infoData={conditionsToInfoData(
              positionalFeatureSet.conditions || [],
              databaseInfoMaps,
              [positionalFeatureSet],
              true
            )}
          />
        </li>
      </ul>
      <AnnotationsComponent
        annotations={positionalFeatureSet.annotations}
        featureSet={positionalFeatureSet}
        exceptions={positionalFeatureSet.ruleExceptions}
      />
    </div>
  );
};

const SAMFeatureComponent = ({
  samFeatureSet,
}: {
  samFeatureSet: SAMFeatureSet;
}) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  return (
    <div className={styles.rule}>
      <ul className={cn(styles.conditions, 'no-bullet')}>
        <li>
          <div className={cn(styles.statement, styles.if)}>if</div>
          <InfoList
            infoData={conditionsToInfoData(
              samFeatureSet.conditions || [],
              databaseInfoMaps,
              [samFeatureSet],
              true
            )}
          />
        </li>
      </ul>
      <AnnotationsComponent
        annotations={samFeatureSet.annotations}
        featureSet={samFeatureSet}
      />
    </div>
  );
};

const ConditionsAnnotations = ({
  data,
}: {
  data: UniRuleAPIModel | ARBAAPIModel;
}) => {
  const hasExtra = Boolean(
    data.otherRules?.length ||
      data.positionFeatureSets?.length ||
      data.samFeatureSets?.length
  );
  return (
    <div
      className={cn(styles['conditions-annotations'], {
        [styles['has-extra']]: hasExtra,
      })}
    >
      <RuleComponent
        rule={data.mainRule}
        positionalFeatureSets={data.positionFeatureSets}
      />
      {hasExtra && (
        <div className={styles.extra}>
          <div className={styles.statement}>additionally</div>
          {data.otherRules?.map((otherRule, index) => (
            <RuleComponent
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              rule={otherRule}
              positionalFeatureSets={data.positionFeatureSets}
            />
          ))}
          {data.positionFeatureSets?.map((positionalFeatureSet, index) => (
            <PositionalFeatureComponent
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              positionalFeatureSet={positionalFeatureSet}
            />
          ))}
          {data.samFeatureSets?.map((samFeatureSet, index) => (
            <SAMFeatureComponent
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              samFeatureSet={samFeatureSet}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConditionsAnnotations;
