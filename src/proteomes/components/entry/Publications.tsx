import { useMemo } from 'react';
import { DataList } from 'franklin-sites';

import CitationsCard from '../../../supporting-data/citations/components/results/CitationsCard';

import { CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

import { getIdKeyForNamespace } from '../../../shared/utils/getIdKey';
import { Namespace } from '../../../shared/types/namespaces';

const dataRenderer = (citation: CitationsAPIModel) => (
  <CitationsCard data={citation} headingLevel="h3" notSelectable />
);

const getIdKey = getIdKeyForNamespace(Namespace.citations);

const Publications = ({
  citations,
}: {
  citations: ProteomesAPIModel['citations'];
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
      <DataList getIdKey={getIdKey} data={data} dataRenderer={dataRenderer} />
    </section>
  );
};

export default Publications;
