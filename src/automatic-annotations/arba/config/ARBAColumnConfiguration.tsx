import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import { mapToLinks } from '../../../shared/components/MapTo';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';

import { taxonomicScope } from '../../shared/column-renderers/TaxonomicScope';
import { ruleId } from '../../shared/column-renderers/RuleID';
import { annotationCovered } from '../../shared/column-renderers/AnnotationCovered';

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

export const ARBAColumnConfiguration: ColumnConfiguration<
  ARBAColumn,
  Partial<ARBAAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
ARBAColumnConfiguration.set(
  ARBAColumn.ruleId,
  ruleId(({ uniRuleId }) => uniRuleId, 'ARBA', Namespace.arba)
);

ARBAColumnConfiguration.set(ARBAColumn.taxonomicScope, taxonomicScope());

ARBAColumnConfiguration.set(ARBAColumn.annotationCovered, annotationCovered());

ARBAColumnConfiguration.set(ARBAColumn.statistics, {
  ...getLabelAndTooltip(
    'Statistics',
    'Number of proteins annotated by the rule'
  ),
  render: ({ uniRuleId, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.unirule, uniRuleId, statistics)?.map(
        ({ key, link, name }) => (
          // eslint-disable-next-line uniprot-website/use-config-location
          <Link key={key} to={link}>
            {name}
          </Link>
        )
      )}
    </ExpandableList>
  ),
});

export default ARBAColumnConfiguration;
