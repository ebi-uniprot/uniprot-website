import { Card } from 'franklin-sites';
import { memo } from 'react';

import { UniParcUIModel } from '../../adapters/uniParcConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';

type Props = {
  data?: Partial<UniParcUIModel>;
};

const FamilyAndDomainsSection = ({ data }: Props) => {
  const { sequenceFeatures, sequence } = data || {};
  if (!sequenceFeatures || !sequence?.value) {
    return null;
  }

  return (
    <Card
      header={
        <h2 data-article-id="family_and_domains_section">
          {entrySectionToLabel[SubEntrySection.FamilyAndDomains]}
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
