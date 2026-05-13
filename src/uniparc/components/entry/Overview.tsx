import { InfoList } from 'franklin-sites';

import { type UniParcUIModel } from '../../adapters/uniParcConverter';
import { CommonTaxons } from '../common-taxons';

type Props = {
  data: UniParcUIModel;
};

const Overview = ({ data }: Props) => {
  const infoData = [
    {
      title: 'Common Taxonomies',
      content: data.commonTaxons && (
        <CommonTaxons commonTaxons={data.commonTaxons} />
      ),
    },
    {
      title: 'Amino acids',
      content: data.sequence && <span>{data.sequence.length}</span>,
    },
    {
      title: 'Cross references',
      content: data.crossReferenceCount && (
        <span>{data.crossReferenceCount}</span>
      ),
    },
    {
      title: 'First seen',
      content: data.oldestCrossRefCreated && (
        <time dateTime={data.oldestCrossRefCreated}>
          {data.oldestCrossRefCreated}
        </time>
      ),
    },
    {
      title: 'Last seen',
      content: data.mostRecentCrossRefUpdated && (
        <time dateTime={data.mostRecentCrossRefUpdated}>
          {data.mostRecentCrossRefUpdated}
        </time>
      ),
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default Overview;
