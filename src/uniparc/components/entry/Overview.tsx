import { InfoList } from 'franklin-sites';
// import { Link } from 'react-router-dom';

import parseDate from '../../../shared/utils/parseDate';
// import { getEntryPath } from '../../../app/config/urls';

import { UniParcUIModel } from '../../adapters/uniParcConverter';
// import { Namespace } from '../../../shared/types/namespaces';

type Props = {
  data: UniParcUIModel;
};

const Overview = ({ data }: Props) => {
  let commonTaxonsNode: string | undefined;

  if (data.commonTaxons) {
    commonTaxonsNode = data.commonTaxons
      // 2024_06
      // .map((taxon) => (
      //   <Link to={getEntryPath(Namespace.taxonomy, taxon.commonTaxonId)}>
      //     {taxon.commonTaxon}
      //   </Link>
      // ))
      .map((taxon) => taxon.commonTaxon)
      .join('; ');
  }
  const infoData = [
    {
      title: <span>Common Taxons</span>,
      content: commonTaxonsNode && <span>{commonTaxonsNode}</span>,
    },
    {
      title: <span>Sequence length</span>,
      content: data.sequence && <span>{data.sequence.length}</span>,
    },
    {
      title: <span>Cross references</span>,
      content: data.crossReferenceCount && (
        <span>{data.crossReferenceCount}</span>
      ),
    },
    {
      title: <span>First seen</span>,
      content: data.oldestCrossRefCreated && (
        <time dateTime={parseDate(data.oldestCrossRefCreated)?.toISOString()}>
          {data.oldestCrossRefCreated}
        </time>
      ),
    },
    {
      title: <span>Last seen</span>,
      content: data.mostRecentCrossRefUpdated && (
        <time
          dateTime={parseDate(data.mostRecentCrossRefUpdated)?.toISOString()}
        >
          {data.mostRecentCrossRefUpdated}
        </time>
      ),
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default Overview;
