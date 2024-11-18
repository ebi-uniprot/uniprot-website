import { Fragment } from 'react';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import parseDate from '../../../shared/utils/parseDate';
import { getEntryPath } from '../../../app/config/urls';

import { UniParcUIModel } from '../../adapters/uniParcConverter';
import { Namespace } from '../../../shared/types/namespaces';

type Props = {
  data: UniParcUIModel;
};

const Overview = ({ data }: Props) => {
  const infoData = [
    {
      title: <span>Common Taxons</span>,
      content: data.commonTaxons && (
        <div>
          {data.commonTaxons.map((taxon) => (
            <Fragment key={taxon.commonTaxon}>
              <Link to={getEntryPath(Namespace.taxonomy, taxon.commonTaxonId)}>
                {taxon.commonTaxon}
              </Link>
              {'; '}
            </Fragment>
          ))}
        </div>
      ),
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
