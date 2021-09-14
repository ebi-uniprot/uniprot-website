import { ExpandableList } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';
import TaxonomicScope from '../../shared/column-renderers/TaxonomicScope';
import CSVView from '../../../uniprotkb/components/protein-data-views/CSVView';

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
  render: ({ mainRule }) => {
    const annotations = new Set<string>();

    for (const annotation of mainRule?.annotations || []) {
      if ('keyword' in annotation) {
        annotations.add('keyword');
      } else if ('proteinDescription' in annotation) {
        annotations.add('protein name');
      } else if ('gene' in annotation) {
        annotations.add('gene name');
      } else if (annotation.comment?.commentType) {
        annotations.add(annotation.comment?.commentType.toLowerCase());
      } else if (annotation.dbReference?.database === 'GO') {
        annotations.add('GO (Gene Ontology) term');
      } else {
        // in case we're missing a case
        console.warn(annotation); // eslint-disable-line no-console
      }
    }

    return (
      <ExpandableList
        descriptionString="annotations"
        displayNumberOfHiddenItems
      >
        {Array.from(annotations)}
      </ExpandableList>
    );
  },
});

UniRuleColumnConfiguration.set(UniRuleColumn.predictedProteinName, {
  label: 'Predicted protein name',
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
      />
    );
  },
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
