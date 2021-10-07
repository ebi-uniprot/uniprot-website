import { ExpandableList } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import { ARBAAPIModel } from '../../arba/adapters/arbaConverter';
import { UniRuleAPIModel } from '../../unirule/adapters/uniRuleConverter';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

import Logging from '../../../shared/utils/logging';

import helper from '../../../shared/styles/helper.module.scss';

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
        continue; // eslint-disable-line no-continue
      }
      for (const conditionValue of condition.conditionValues || []) {
        // This shouldn't happen
        /* istanbul ignore if */
        if (!conditionValue.cvId) {
          // eslint-disable-next-line no-console
          Logging.warn(`No cvId field in taxon for "${conditionValue.value}"`);
          continue; // eslint-disable-line no-continue
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

export default TaxonomicScope;
