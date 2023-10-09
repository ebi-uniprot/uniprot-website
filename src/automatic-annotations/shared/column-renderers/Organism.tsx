import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { UniProtKBSimplifiedTaxonomy } from '../../../uniprotkb/adapters/uniProtkbConverter';

export function organism<Schema>(
  getter: (
    data: Schema
  ) => TaxonomyDatum | UniProtKBSimplifiedTaxonomy | undefined,
  strainGetter?: (data: Schema) => string | undefined
) {
  return {
    ...getLabelAndTooltip(
      'Organism',
      'Scientific name (and synonyms) of the source organism',
      'organism-name'
    ),
    render: (data: Schema) => {
      const taxonomyData = getter(data);
      const strain = strainGetter?.(data);
      return (
        taxonomyData && <TaxonomyView data={taxonomyData} strain={strain} />
      );
    },
  };
}
