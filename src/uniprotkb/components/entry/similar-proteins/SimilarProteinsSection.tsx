import { Card } from 'franklin-sites';
import { lazy, memo } from 'react';

import LazyComponent from '../../../../shared/components/LazyComponent';
import { UniProtkbUIModel } from '../../../adapters/uniProtkbConverter';
import EntrySection from '../../../types/entrySection';
import { getEntrySectionNameAndId } from '../../../utils/entrySection';
import AgrHomology from './AgrHomology';

const SimilarProteins = lazy(
  () => import(/* webpackChunkName: "similar-proteins" */ './SimilarProteins')
);

const SimilarProteinsSection = ({
  canonical,
  isoforms,
  xrefs,
}: UniProtkbUIModel[EntrySection.SimilarProteins]) => {
  const { name, id } = getEntrySectionNameAndId(EntrySection.SimilarProteins);
  return (
    <Card
      header={<h2 data-article-id="similar_proteins_section">{name}</h2>}
      id={id}
      data-entry-section
    >
      <LazyComponent>
        <SimilarProteins canonical={canonical} isoforms={isoforms} />
      </LazyComponent>
      <h3 data-article-id="TODO">Orthologs & Paralogs</h3>
      <LazyComponent>
        <AgrHomology xrefs={xrefs} />
      </LazyComponent>
    </Card>
  );
};

export default memo(SimilarProteinsSection);
