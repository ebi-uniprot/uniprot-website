import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';
import { type TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type UniProtKBSimplifiedTaxonomy } from '../../../uniprotkb/adapters/uniProtkbConverter';

export function organismIDRenderer<Schema>(
  getter: (
    data: Schema
  ) => TaxonomyDatum | UniProtKBSimplifiedTaxonomy | undefined
) {
  return {
    ...getLabelAndTooltip(
      'Organism ID',
      'NCBI taxonomy identifier of the source organism (TaxId)'
    ),
    render: (data: Schema) => {
      const taxonomyData = getter(data);
      return taxonomyData && <TaxonomyView data={taxonomyData} displayOnlyID />;
    },
  };
}
