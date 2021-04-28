import { FC } from 'react';
import { DataList } from 'franklin-sites';

import CitationsCard from '../../../supporting-data/citations/components/results/CitationsCard';

import { getCitationItemId } from '../../../supporting-data/citations/utils';

import { Citation } from '../../../supporting-data/citations/adapters/citationsConverter';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

const Publications: FC<Pick<ProteomesAPIModel, 'citations'>> = ({
  citations,
}) => {
  if (!citations?.length) {
    return null;
  }

  return (
    <section>
      <h2>Publications</h2>
      <DataList
        getIdKey={getCitationItemId}
        data={citations}
        dataRenderer={(citation: Citation) => (
          <CitationsCard data={{ citation }} headingLevel="h3" />
        )}
      />
    </section>
  );
};

export default Publications;
