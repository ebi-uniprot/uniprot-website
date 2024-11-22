import { Fragment } from 'react';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';

import { UniParcUIModel } from '../../adapters/uniParcConverter';
import { Namespace } from '../../../shared/types/namespaces';

type Props = {
  data: UniParcUIModel;
};

const Overview = ({ data }: Props) => {
  const infoData = [
    {
      title: 'Common Taxonomies',
      content: data.commonTaxons && (
        <div>
          {data.commonTaxons.map((taxon, index, commonTaxons) => (
            <Fragment key={taxon.commonTaxon}>
              <Link to={getEntryPath(Namespace.taxonomy, taxon.commonTaxonId)}>
                {taxon.commonTaxon}
              </Link>
              {index !== commonTaxons.length - 1 ? '; ' : null}
            </Fragment>
          ))}
        </div>
      ),
    },
    {
      title: 'Sequence length',
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
