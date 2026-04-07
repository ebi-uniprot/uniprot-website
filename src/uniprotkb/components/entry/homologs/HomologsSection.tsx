import { Card } from 'franklin-sites';
import { memo, useEffect, useRef } from 'react';

import LazyComponent from '../../../../shared/components/LazyComponent';
import helper from '../../../../shared/styles/helper.module.scss';
import { type HomologsUIModel } from '../../../adapters/homologsConverter';
import EntrySection from '../../../types/entrySection';
import { getEntrySectionNameAndId } from '../../../utils/entrySection';
import XRefView from '../../protein-data-views/XRefView';
import AgrHomology from '../similar-proteins/AgrHomology';

export const HOMOLOGS_XREF_ID = 'homologs-xrefs';

const HomologsSection = ({ primaryAccession, xrefs }: HomologsUIModel) => {
  const { name, id } = getEntrySectionNameAndId(EntrySection.Homologs);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === `#${id}` && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [id]);

  return (
    <Card
      header={<h2 data-article-id="homologs_section">{name}</h2>}
      id={id}
      ref={ref}
      data-entry-section
    >
      <h3
        data-article-id="homologs_section#orthology-and-paralogy"
        className={helper['padding-top-med']}
      >
        Orthologs & paralogs
      </h3>
      <LazyComponent>
        <AgrHomology xrefs={xrefs} />
      </LazyComponent>
      <XRefView xrefs={xrefs} primaryAccession={primaryAccession} />
      <span id={HOMOLOGS_XREF_ID}></span>
    </Card>
  );
};

export default memo(HomologsSection);
