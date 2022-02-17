import TaxonomyView from '../components/entry/TaxonomyView';
import AccessionView from '../components/results/AccessionView';

import getLabelAndTooltip from '../utils/getLabelAndTooltip';

import AnnotationCovered from '../../automatic-annotations/shared/column-renderers/AnnotationCovered';
import TaxonomicScope from '../../automatic-annotations/shared/column-renderers/TaxonomicScope';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { ARBAAPIModel } from '../../automatic-annotations/arba/adapters/arbaConverter';
import { Namespace } from '../types/namespaces';

const SharedColumnConfiguration = {
  organism_id<Schema>(getter: (data: Schema) => TaxonomyDatum | undefined) {
    return {
      ...getLabelAndTooltip(
        'Organism ID',
        'NCBI taxonomy identifier of the source organism (TaxId)'
      ),
      render: (data: Schema) => {
        const taxonomyData = getter(data);
        return (
          taxonomyData && <TaxonomyView data={taxonomyData} displayOnlyID />
        );
      },
    };
  },
  organism<Schema>(getter: (data: Schema) => TaxonomyDatum | undefined) {
    return {
      ...getLabelAndTooltip(
        'Organism',
        'Scientific name (and synonyms) of the source organism',
        'organism-name'
      ),
      render: (data: Schema) => {
        const taxonomyData = getter(data);
        return taxonomyData && <TaxonomyView data={taxonomyData} />;
      },
    };
  },
  rule_id<Schema>(
    getter: (data: Schema) => ARBAAPIModel['uniRuleId'] | undefined,
    namespaceLabel: string,
    namespace: Namespace.unirule | Namespace.arba
  ) {
    return {
      ...getLabelAndTooltip(
        `${namespaceLabel} ID`,
        'Unique and stable identifier for annotation rules'
      ),
      render: (data: Schema) => {
        const uniRuleId = getter(data);
        return (
          uniRuleId && <AccessionView id={uniRuleId} namespace={namespace} />
        );
      },
    };
  },
  taxonomic_scope: {
    ...getLabelAndTooltip(
      'Taxonomic scope',
      'The taxonomic scope to which the annotation rule applies'
    ),
    render: TaxonomicScope,
  },
  annotation_covered: {
    ...getLabelAndTooltip(
      'Annotation covered',
      'Types of annotations that the rule can add to UniProtKB entries'
    ),
    render: AnnotationCovered,
  },
};

export default SharedColumnConfiguration;
