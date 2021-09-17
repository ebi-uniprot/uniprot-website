// import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';
import TaxonomicScope from '../../shared/column-renderers/TaxonomicScope';

// import { LocationToPath, Location } from '../../../app/config/urls';

import { UniRuleAPIModel } from '../adapters/uniRuleConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

export enum UniRuleColumn {
  ruleId = 'rule_id',
  // statistics = 'statistics',
  taxonomicScope = 'taxonomic_scope',
  annotationCovered = 'annotation_covered',
  predictedProteinName = 'predicted_protein_name',
  templateEntries = 'template_entries',
}

export const defaultColumns = [
  UniRuleColumn.ruleId,
  // UniRuleColumn.statistics,
  UniRuleColumn.taxonomicScope,
  UniRuleColumn.annotationCovered,
  UniRuleColumn.predictedProteinName,
  UniRuleColumn.templateEntries,
];

export const primaryKeyColumns = [UniRuleColumn.ruleId];

export const UniRuleColumnConfiguration: ColumnConfiguration<
  UniRuleColumn,
  Partial<UniRuleAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
UniRuleColumnConfiguration.set(UniRuleColumn.ruleId, {
  label: 'UniRule ID',
  render: ({ uniRuleId }) =>
    uniRuleId && <AccessionView id={uniRuleId} namespace={Namespace.unirule} />,
});

// UniRuleColumnConfiguration.set(UniRuleColumn.statistics, {
//   label: 'Statistics',
//   render: () => null,
// });

UniRuleColumnConfiguration.set(UniRuleColumn.taxonomicScope, {
  label: 'Taxonomic scope',
  render: TaxonomicScope,
});

UniRuleColumnConfiguration.set(UniRuleColumn.annotationCovered, {
  label: 'Annotation covered',
  render: () => null,
});

UniRuleColumnConfiguration.set(UniRuleColumn.predictedProteinName, {
  label: 'Predicted protein name',
  render: () => null,
});

UniRuleColumnConfiguration.set(UniRuleColumn.templateEntries, {
  label: 'Template entries',
  render: ({ information }) => (
    <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
      {information?.uniProtAccessions?.map((accession) => (
        <AccessionView
          key={accession}
          id={accession}
          namespace={Namespace.uniprotkb}
        />
      ))}
    </ExpandableList>
  ),
});

export default UniRuleColumnConfiguration;
