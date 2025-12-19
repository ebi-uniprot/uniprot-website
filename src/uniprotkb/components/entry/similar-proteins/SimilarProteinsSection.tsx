import { Card } from 'franklin-sites';
import { lazy, memo } from 'react';

import LazyComponent from '../../../../shared/components/LazyComponent';
import helper from '../../../../shared/styles/helper.module.scss';
import { SimilarProteinsUIModel } from '../../../adapters/similarProteinsConverter';
import EntrySection from '../../../types/entrySection';
import { getEntrySectionNameAndId } from '../../../utils/entrySection';
import XRefView from '../../protein-data-views/XRefView';
import AgrHomology from './AgrHomology';

const SimilarProteins = lazy(
  () => import(/* webpackChunkName: "similar-proteins" */ './SimilarProteins')
);

const SimilarProteinsSection = ({
  primaryAccession,
  canonical,
  isoforms,
  xrefs,
}: SimilarProteinsUIModel) => {
  const { name, id } = getEntrySectionNameAndId(EntrySection.SimilarProteins);
  return (
    <Card
      header={<h2 data-article-id="similar_proteins_section">{name}</h2>}
      id={id}
      data-entry-section
    >
      <h3 data-article-id="similar_proteins_section#uniref-clusters">
        UniRef clusters
      </h3>
      <LazyComponent>
        <SimilarProteins canonical={canonical} isoforms={isoforms} />
      </LazyComponent>
      <h3
        data-article-id="similar_proteins_section#orthology-and-paralogy"
        className={helper['padding-top-med']}
      >
        Orthologs & paralogs
      </h3>
      <LazyComponent>
        <AgrHomology xrefs={xrefs} />
      </LazyComponent>
      <XRefView xrefs={xrefs} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default memo(SimilarProteinsSection);
