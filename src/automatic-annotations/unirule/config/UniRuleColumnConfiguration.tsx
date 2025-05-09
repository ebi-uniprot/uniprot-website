import { ExpandableList } from 'franklin-sites';

import { mapToLinks } from '../../../shared/components/MapTo';
import AccessionView from '../../../shared/components/results/AccessionView';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';
import CSVView from '../../../uniprotkb/components/protein-data-views/CSVView';
import { annotationCoveredRenderer } from '../../shared/column-renderers/AnnotationCovered';
import { ruleIDRenderer } from '../../shared/column-renderers/RuleID';
import { taxonomicScopeRenderer } from '../../shared/column-renderers/TaxonomicScope';
import { UniRuleAPIModel } from '../adapters/uniRuleConverter';

export enum UniRuleColumn {
  ruleId = 'rule_id',
  taxonomicScope = 'taxonomic_scope',
  annotationCovered = 'annotation_covered',
  predictedProteinName = 'predicted_protein_name',
  templateEntries = 'template_entries',
  statistics = 'statistics',
}

export const defaultColumns = [
  UniRuleColumn.ruleId,
  UniRuleColumn.statistics,
  UniRuleColumn.taxonomicScope,
  UniRuleColumn.annotationCovered,
  UniRuleColumn.predictedProteinName,
  UniRuleColumn.templateEntries,
];

export const primaryKeyColumns = [UniRuleColumn.ruleId];

const UniRuleColumnConfiguration: ColumnConfiguration<
  UniRuleColumn,
  Partial<UniRuleAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
UniRuleColumnConfiguration.set(
  UniRuleColumn.ruleId,
  ruleIDRenderer(({ uniRuleId }) => uniRuleId, 'UniRule', Namespace.unirule)
);

UniRuleColumnConfiguration.set(
  UniRuleColumn.taxonomicScope,
  taxonomicScopeRenderer
);

UniRuleColumnConfiguration.set(
  UniRuleColumn.annotationCovered,
  annotationCoveredRenderer
);

UniRuleColumnConfiguration.set(UniRuleColumn.predictedProteinName, {
  ...getLabelAndTooltip(
    'Predicted protein name',
    'Protein name(s) predicted by the annotation rule'
  ),
  render: ({ mainRule }) => {
    const proteinDescription = mainRule?.annotations?.find(
      (annotation) => annotation.proteinDescription
    )?.proteinDescription;
    if (!proteinDescription) {
      return null;
    }
    return (
      <CSVView
        data={proteinDescription}
        bolderFirst={Boolean(proteinDescription.recommendedName)}
        contextKey={UniRuleColumn.predictedProteinName}
      />
    );
  },
});

UniRuleColumnConfiguration.set(UniRuleColumn.templateEntries, {
  ...getLabelAndTooltip(
    'Template entries',
    'UniProtKB entries that served as a template for the rule'
  ),
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

UniRuleColumnConfiguration.set(UniRuleColumn.statistics, {
  ...getLabelAndTooltip(
    'Statistics',
    'Number of proteins annotated by the rule'
  ),
  render: ({ uniRuleId, information, statistics }) => (
    <ExpandableList>
      {mapToLinks(
        Namespace.unirule,
        information?.oldRuleNum || uniRuleId,
        statistics
      )}
    </ExpandableList>
  ),
});

export default UniRuleColumnConfiguration;
