import { FC } from 'react';
import { DataList } from 'franklin-sites';

import CitationCard from '../../../supporting-data/citations/components/results/CitationCard';

import { getCitationItemId } from '../../../supporting-data/citations/utils';

import { Citation } from '../../../supporting-data/citations/adapters/citationsConverter';

const Publications: FC<{ citations: Citation[] }> = ({ citations }) => (
  <section>
    <h2>Publications for </h2>
    <DataList
      getIdKey={getCitationItemId}
      data={citations}
      dataRenderer={(citation: Citation) => (
        <CitationCard data={{ citation }} />
      )}
    />
  </section>
);

export default Publications;
