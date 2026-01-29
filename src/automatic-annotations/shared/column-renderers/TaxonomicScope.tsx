import { ExpandableList } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import helper from '../../../shared/styles/helper.module.scss';
import getLabelAndTooltip from '../../../shared/utils/getLabelAndTooltip';
import * as logging from '../../../shared/utils/logging';
import { type TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type ARBAAPIModel } from '../../arba/adapters/arbaConverter';
import { type UniRuleAPIModel } from '../../unirule/adapters/uniRuleConverter';

type CustomTaxonScope = {
  negative: boolean;
  taxon: TaxonomyDatum;
};

const TaxonomicScope = ({
  mainRule,
}: Partial<UniRuleAPIModel | ARBAAPIModel>) => {
  // Using a map in order to remove duplicates
  const taxonScopeMap = new Map<number, CustomTaxonScope>();
  for (const conditionSet of mainRule?.conditionSets || []) {
    for (const condition of conditionSet.conditions || []) {
      if (condition.type !== 'taxon') {
        continue;
      }
      for (const conditionValue of condition.conditionValues || []) {
        // This shouldn't happen
        /* istanbul ignore if */
        if (!conditionValue.cvId) {
          logging.warn(`No cvId field in taxon for "${conditionValue.value}"`);
          continue;
        }
        const taxonId = +conditionValue.cvId;
        if (!taxonScopeMap.has(taxonId)) {
          taxonScopeMap.set(taxonId, {
            negative: Boolean(condition.isNegative),
            taxon: {
              taxonId,
              scientificName: conditionValue.value,
            },
          });
        }
      }
    }
  }

  return (
    <ExpandableList descriptionString="taxons" displayNumberOfHiddenItems>
      {Array.from(taxonScopeMap.values()).map((taxonScope) =>
        taxonScope?.taxon?.taxonId ? (
          <span key={taxonScope.taxon.taxonId} className={helper['no-wrap']}>
            {taxonScope.negative && '(Excluding) '}
            <TaxonomyView data={taxonScope.taxon} />
          </span>
        ) : undefined
      )}
    </ExpandableList>
  );
};

export const taxonomicScopeRenderer = {
  ...getLabelAndTooltip(
    'Taxonomic scope',
    'The taxonomic scope to which the annotation rule applies'
  ),
  render: TaxonomicScope,
};
