import { lazy, memo } from 'react';
import { Card } from 'franklin-sites';

import LazyComponent from '../../../../shared/components/LazyComponent';

import { getEntrySectionNameAndId } from '../../../utils/entrySection';

import SubEntrySection from '../../../types/subEntry';
import UniParcSubEntryConfig from '../../../config/UniParcSubEntryConfig';

const SubEntrySimilarProteins = lazy(
  () =>
    import(
      /* webpackChunkName: "similar-proteins" */ './SubEntrySimilarProteins'
    )
);

type Props = {
  uniparcId: string;
};

const SimilarProteinsSection = ({ uniparcId }: Props) => {
  return (
    <Card
      header={
        <h2 data-article-id="similar_proteins_section">
          {UniParcSubEntryConfig[SubEntrySection.SimilarProteins].label}
        </h2>
      }
      id={SubEntrySection.SimilarProteins}
      data-entry-section
    >
      <LazyComponent>
        <SubEntrySimilarProteins uniparcId={uniparcId} />
      </LazyComponent>
    </Card>
  );
};

export default memo(SimilarProteinsSection);
