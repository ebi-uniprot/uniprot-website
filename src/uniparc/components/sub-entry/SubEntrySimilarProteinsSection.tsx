import { lazy, memo } from 'react';
import { Card } from 'franklin-sites';

import LazyComponent from '../../../shared/components/LazyComponent';

import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';

import SubEntrySection from '../../types/subEntry';

const SubEntrySimilarProteins = lazy(
  () =>
    import(
      /* webpackChunkName: "similar-proteins" */ './SubEntrySimilarProteins'
    )
);

type Props = {
  uniparcId?: string;
};

const SimilarProteinsSection = ({ uniparcId }: Props) =>
  !uniparcId ? null : (
    <Card
      header={
        <h2 data-article-id="similar_proteins_section">
          {entrySectionToLabel[SubEntrySection.SimilarProteins]}
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

export default memo(SimilarProteinsSection);
