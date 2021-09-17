// import { Link } from 'react-router-dom';

import AccessionView from '../../../shared/components/results/AccessionView';

// import { LocationToPath, Location } from '../../../app/config/urls';

import { ARBAAPIModel } from '../adapters/arbaConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

export enum ARBAColumn {
  ruleId = 'rule_id',
  // statistics = 'statistics',
  taxonomicScope = 'taxonomic_scope',
  annotationCovered = 'annotation_covered',
  predictedProteinName = 'predicted_protein_name',
  templateEntries = 'template_entries',
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

// ARBAColumnConfiguration.set(ARBAColumn.statistics, {
//   label: 'Statistics',
//   render: () => null,
// });

ARBAColumnConfiguration.set(ARBAColumn.taxonomicScope, {
  label: 'Taxonomic scope',
  render: () => null,
});

ARBAColumnConfiguration.set(ARBAColumn.annotationCovered, {
  label: 'Annotation covered',
  render: () => null,
});

ARBAColumnConfiguration.set(ARBAColumn.predictedProteinName, {
  label: 'Predicted protein name',
  render: () => null,
});

ARBAColumnConfiguration.set(ARBAColumn.templateEntries, {
  label: 'Template entries',
  render: () => null,
});

export default ARBAColumnConfiguration;
