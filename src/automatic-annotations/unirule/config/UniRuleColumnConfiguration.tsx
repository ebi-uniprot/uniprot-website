import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import AccessionView from '../../../shared/components/results/AccessionView';
import TaxonomicScope from '../../shared/column-renderers/TaxonomicScope';
import AnnotationCovered from '../../shared/column-renderers/AnnotationCovered';
import CSVView from '../../../uniprotkb/components/protein-data-views/CSVView';

import { mapToLinks } from '../../../shared/components/MapTo';

import { UniRuleAPIModel } from '../adapters/uniRuleConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

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

UniRuleColumnConfiguration.set(UniRuleColumn.taxonomicScope, {
  label: 'Taxonomic scope',
  render: TaxonomicScope,
});

UniRuleColumnConfiguration.set(UniRuleColumn.annotationCovered, {
  label: 'Annotation covered',
  render: AnnotationCovered,
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

UniRuleColumnConfiguration.set(UniRuleColumn.statistics, {
  label: 'Statistics',
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
