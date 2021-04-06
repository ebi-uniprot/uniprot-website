import { FC } from 'react';
import { DataList } from 'franklin-sites';

import CitationCard from '../../../supporting-data/citations/components/results/CitationsCard';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import { getCitationItemId } from '../../../supporting-data/citations/utils';

import { Citation } from '../../../supporting-data/citations/adapters/citationsConverter';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

const Publications: FC<Pick<ProteomesAPIModel, 'citations' | 'taxonomy'>> = ({
  citations,
  taxonomy,
}) => {
  if (!citations?.length) {
    return null;
  }

  return (
    <section>
      <h2>
        {'Publications for '}
        <TaxonomyView data={taxonomy} noLink />
      </h2>
      <DataList
        getIdKey={getCitationItemId}
        data={citations}
        dataRenderer={(citation: Citation) => (
          <CitationCard data={{ citation }} />
        )}
      />
    </section>
  );
};

export default Publications;
