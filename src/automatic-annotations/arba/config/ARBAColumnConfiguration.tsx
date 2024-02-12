import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import { mapToLinks } from '../../../shared/components/MapTo';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';

import { taxonomicScopeRenderer } from '../../shared/column-renderers/TaxonomicScope';
import { ruleIDRenderer } from '../../shared/column-renderers/RuleID';
import { annotationCoveredRenderer } from '../../shared/column-renderers/AnnotationCovered';

import { ARBAAPIModel } from '../adapters/arbaConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

export enum ARBAColumn {
  ruleId = 'rule_id',
  taxonomicScope = 'taxonomic_scope',
  annotationCovered = 'annotation_covered',
  statistics = 'statistics',
}

export const defaultColumns = [
  ARBAColumn.ruleId,
  ARBAColumn.statistics,
  ARBAColumn.taxonomicScope,
  ARBAColumn.annotationCovered,
];

export const primaryKeyColumns = [ARBAColumn.ruleId];

const ARBAColumnConfiguration: ColumnConfiguration<
  ARBAColumn,
  Partial<ARBAAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
ARBAColumnConfiguration.set(
  ARBAColumn.ruleId,
  ruleIDRenderer(({ uniRuleId }) => uniRuleId, 'ARBA', Namespace.arba)
);

ARBAColumnConfiguration.set(ARBAColumn.taxonomicScope, taxonomicScopeRenderer);

ARBAColumnConfiguration.set(
  ARBAColumn.annotationCovered,
  annotationCoveredRenderer
);

ARBAColumnConfiguration.set(ARBAColumn.statistics, {
  ...getLabelAndTooltip(
    'Statistics',
    'Number of proteins annotated by the rule'
  ),
  render: ({ uniRuleId, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.unirule, uniRuleId, statistics)}
    </ExpandableList>
  ),
});

export default ARBAColumnConfiguration;
