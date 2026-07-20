import { Card, DataList } from 'franklin-sites';
import { useMemo } from 'react';

import { Namespace } from '../../../shared/types/namespaces';
import { getIdKeyForNamespace } from '../../../shared/utils/getIdKey';
import { type CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import LiteratureCitation from '../../../supporting-data/citations/components/LiteratureCitation';
import { type ProteomesAPIModel } from '../../adapters/proteomesConverter';
import styles from '../styles/publications.module.scss';

const dataRenderer = (citation: CitationsAPIModel) => (
  <LiteratureCitation
    data={citation}
    headingLevel="h3"
    linkToEntry
    className={styles['inline-publication']}
  />
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
    <Card header={<h2>Publications</h2>}>
      <DataList getIdKey={getIdKey} data={data} dataRenderer={dataRenderer} />
    </Card>
  );
};

export default Publications;
