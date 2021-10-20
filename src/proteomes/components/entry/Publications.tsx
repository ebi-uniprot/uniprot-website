import { FC, useMemo } from 'react';
import { DataList } from 'franklin-sites';

import CitationsCard from '../../../supporting-data/citations/components/results/CitationsCard';

import { CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';
import { Namespace } from '../../../shared/types/namespaces';

const getIdKey = getIdKeyFor(Namespace.citations);

const Publications: FC<Pick<ProteomesAPIModel, 'citations'>> = ({
  citations,
}) => {
  const data = useMemo<CitationsAPIModel[]>(
    // Transform basic citation object to full citations as returned by the
    // citations endpoint (containing a "citation" field)
    () => citations?.map((citation) => ({ citation })),
    [citations]
  );

  if (!data?.length) {
    return null;
  }

  return (
    <section>
      <h2>Publications</h2>
      <DataList
        getIdKey={getIdKey}
        data={data}
        dataRenderer={(citation) => (
          <CitationsCard data={citation} headingLevel="h3" notSelectable />
        )}
      />
    </section>
  );
};

export default Publications;
