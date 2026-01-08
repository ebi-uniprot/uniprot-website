import { DataList } from 'franklin-sites';
import { useMemo } from 'react';

import { Namespace } from '../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../shared/utils/getIdKey';
import { type CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import CitationsCard from '../../../supporting-data/citations/components/results/CitationsCard';
import { type ProteomesAPIModel } from '../../adapters/proteomesConverter';

const dataRenderer = (citation: CitationsAPIModel) => (
  <CitationsCard data={citation} headingLevel="h3" notSelectable />
);

const getIdKey = getIdKeyForNamespace(Namespace.citations);

const Publications = ({
  citations,
}: {
  citations: ProteomesAPIModel['citations'];
}) => {
  const data = useMemo<CitationsAPIModel[] | undefined>(
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
