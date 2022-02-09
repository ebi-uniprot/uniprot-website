import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';
import TaxonomicScope from '../../shared/column-renderers/TaxonomicScope';
import AnnotationCovered from '../../shared/column-renderers/AnnotationCovered';

import { mapToLinks } from '../../../shared/components/MapTo';

import { ARBAAPIModel } from '../adapters/arbaConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';
import SharedColumnConfiguration from '../../../shared/config/ColumnConfiguration';

export enum ARBAColumn {
  ruleId = 'rule_id',
  taxonomicScope = 'taxonomic_scope',
  annotationCovered = 'annotation_covered',
  statistics = 'statistics',
}

export const defaultColumns = [
  ARBAColumn.ruleId,
  // TODO: commnent out when backend fixes the statistics column
  // ARBAColumn.statistics,
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
  SharedColumnConfiguration.rule_id(
    ({ uniRuleId }) => uniRuleId,
    'ARBA',
    Namespace.arba
  )
);

ARBAColumnConfiguration.set(
  ARBAColumn.taxonomicScope,
  SharedColumnConfiguration.taxonomic_scope
);

ARBAColumnConfiguration.set(
  ARBAColumn.annotationCovered,
  SharedColumnConfiguration.annotation_covered
);

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
