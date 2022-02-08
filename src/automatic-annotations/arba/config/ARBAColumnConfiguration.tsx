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
ARBAColumnConfiguration.set(ARBAColumn.ruleId, {
  ...getLabelAndTooltip(
    'ARBA ID',
    'Unique and stable identifier for annotation rules'
  ),
  render: ({ uniRuleId }) =>
    uniRuleId && <AccessionView id={uniRuleId} namespace={Namespace.arba} />,
});

ARBAColumnConfiguration.set(ARBAColumn.taxonomicScope, {
  ...getLabelAndTooltip(
    'Taxonomic scope',
    'The taxonomic scope to which the annotation rule applies'
  ),
  render: TaxonomicScope,
});

ARBAColumnConfiguration.set(ARBAColumn.annotationCovered, {
  ...getLabelAndTooltip(
    'Annotation covered',
    'Types of annotations that the rule can add to UniProtKB entries'
  ),
  render: AnnotationCovered,
});

// TODO: add tooltip
ARBAColumnConfiguration.set(ARBAColumn.statistics, {
  label: 'Statistics',
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
