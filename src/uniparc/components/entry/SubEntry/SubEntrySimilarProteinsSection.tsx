import { lazy, memo } from 'react';
import { Card } from 'franklin-sites';

import LazyComponent from '../../../../shared/components/LazyComponent';

import { getEntrySectionNameAndId } from '../../../utils/entrySection';

import EntrySection from '../../../types/subEntry';
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
  const { label } = UniParcSubEntryConfig[EntrySection.SimilarProteins];
  return (
    <Card
      header={<h2 data-article-id="similar_proteins_section">{label}</h2>}
      id={EntrySection.SimilarProteins}
      data-entry-section
    >
      <LazyComponent>
        <SubEntrySimilarProteins uniparcId={uniparcId} />
      </LazyComponent>
    </Card>
  );
};

export default memo(SimilarProteinsSection);
