import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';
import CSVView from '../../../uniprotkb/components/protein-data-views/CSVView';

import { mapToLinks } from '../../../shared/components/MapTo';

import { UniRuleAPIModel } from '../adapters/uniRuleConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import SharedColumnConfiguration from '../../../shared/config/ColumnConfiguration';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';

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
  // TODO: commnent out when backend fixes the statistics column
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
UniRuleColumnConfiguration.set(
  UniRuleColumn.ruleId,
  SharedColumnConfiguration.rule_id(
    ({ uniRuleId }) => uniRuleId,
    'UniRule',
    Namespace.unirule
  )
);

UniRuleColumnConfiguration.set(
  UniRuleColumn.taxonomicScope,
  SharedColumnConfiguration.taxonomic_scope
);

UniRuleColumnConfiguration.set(
  UniRuleColumn.annotationCovered,
  SharedColumnConfiguration.annotation_covered
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
      )?.map(({ key, link, name }) => (
        // eslint-disable-next-line uniprot-website/use-config-location
        <Link key={key} to={link}>
          {name}
        </Link>
      ))}
    </ExpandableList>
  ),
});

export default UniRuleColumnConfiguration;
