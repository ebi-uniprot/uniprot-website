import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';
import TaxonomicScope from '../../shared/column-renderers/TaxonomicScope';
import AnnotationCovered from '../../shared/column-renderers/AnnotationCovered';

import { mapToLinks } from '../../../shared/components/MapTo';

import { ARBAAPIModel } from '../adapters/arbaConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

export enum ARBAColumn {
  ruleId = 'rule_id',
  taxonomicScope = 'taxonomic_scope',
  annotationCovered = 'annotation_covered',
  // NOTE: once the backend is fixed, this will be available https://www.ebi.ac.uk/panda/jira/browse/TRM-26560
  statistics = 'statistics',
}

export const defaultColumns = [
  ARBAColumn.ruleId,
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
  label: 'ARBA ID',
  render: ({ uniRuleId }) =>
    uniRuleId && <AccessionView id={uniRuleId} namespace={Namespace.arba} />,
});

ARBAColumnConfiguration.set(ARBAColumn.taxonomicScope, {
  label: 'Taxonomic scope',
  render: TaxonomicScope,
});

ARBAColumnConfiguration.set(ARBAColumn.annotationCovered, {
  label: 'Annotation covered',
  render: AnnotationCovered,
});

ARBAColumnConfiguration.set(ARBAColumn.statistics, {
  label: 'Proteins annotated',
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
