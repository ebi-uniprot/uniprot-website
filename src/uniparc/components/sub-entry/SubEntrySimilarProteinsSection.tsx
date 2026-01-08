import { Card } from 'franklin-sites';
import { lazy, memo } from 'react';

import LazyComponent from '../../../shared/components/LazyComponent';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';

const SubEntrySimilarProteins = lazy(
  () =>
    import(
      /* webpackChunkName: "similar-proteins" */ './SubEntrySimilarProteins'
    )
);

const SubEntrySameGene = lazy(
  () => import(/* webpackChunkName: "same-gene" */ './SubEntrySameGene')
);

type Props = {
  uniparcId?: string;
  subEntry: UniParcSubEntryUIModel['subEntry'];
};

const SimilarProteinsSection = ({ uniparcId, subEntry }: Props) =>
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
      <h3 data-article-id="similar_proteins_section#uniref-clusters">
        UniRef clusters
      </h3>
      <LazyComponent>
        <SubEntrySimilarProteins uniparcId={uniparcId} />
      </LazyComponent>
      {subEntry.geneName && subEntry.organism?.taxonId ? (
        <>
          <h3>
            &quot;{subEntry.geneName}&quot; gene in this entry&apos;s taxonomy
            tree
          </h3>
          <LazyComponent>
            <SubEntrySameGene
              geneName={subEntry.geneName}
              taxonId={subEntry.organism.taxonId}
            />
          </LazyComponent>
        </>
      ) : null}
    </Card>
  );

export default memo(SimilarProteinsSection);
