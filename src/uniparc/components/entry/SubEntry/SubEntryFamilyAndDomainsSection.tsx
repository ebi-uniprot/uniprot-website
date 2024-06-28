import { memo } from 'react';
import { Card } from 'franklin-sites';

import UniParcFeaturesView from '../UniParcFeaturesView';

import { hasContent } from '../../../../shared/utils/utils';

import UniParcSubEntryConfig from '../../../config/UniParcSubEntryConfig';

import SubEntrySection from '../../../types/subEntry';
import { UniParcUIModel } from '../../../adapters/uniParcConverter';

type Props = {
  data: UniParcUIModel;
};

const FamilyAndDomainsSection = ({ data }: Props) => {
  const { sequenceFeatures, sequence } = data;
  if (!sequenceFeatures || !sequence.value) {
    return null;
  }

  return (
    <Card
      header={
        <h2 data-article-id="family_and_domains_section">
          {UniParcSubEntryConfig[SubEntrySection.FamilyAndDomains].label}
        </h2>
      }
      id={SubEntrySection.FamilyAndDomains}
      data-entry-section
    >
      <UniParcFeaturesView data={sequenceFeatures} sequence={sequence.value} />
    </Card>
  );
};

export default memo(FamilyAndDomainsSection);
