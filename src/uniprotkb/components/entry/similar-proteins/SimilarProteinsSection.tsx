import { lazy } from 'react';
import { Card } from 'franklin-sites';

import LazyComponent from '../../../../shared/components/LazyComponent';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../types/entrySection';

const SimilarProteins = lazy(
  () => import(/* webpackChunkName: "similar-proteins" */ './SimilarProteins')
);

const SimilarProteinsSection = ({ isoforms }: { isoforms: string[] }) => {
  const { name, id } = getEntrySectionNameAndId(EntrySection.SimilarProteins);
  return (
    <Card
      header={<h2 data-article-id="similar_proteins_section">{name}</h2>}
      id={id}
      data-entry-section
    >
      <LazyComponent>
        <SimilarProteins isoforms={isoforms} />
      </LazyComponent>
    </Card>
  );
};

export default SimilarProteinsSection;
