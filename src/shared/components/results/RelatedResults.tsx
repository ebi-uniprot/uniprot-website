import { Link } from 'react-router';
import { Loader, DataListWithLoader, LongNumber } from 'franklin-sites';

import UniProtKBCard from '../../../uniprotkb/components/results/UniProtKBCard';

import useNSQuery from '../../hooks/useNSQuery';
import usePagination from '../../hooks/usePagination';

import { pluralise } from '../../utils/utils';
import { getIdKeyForNamespace } from '../../utils/getIdKey';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../types/namespaces';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { APIModel } from '../../types/apiModel';

const getIdKey = getIdKeyForNamespace(Namespace.uniprotkb);
const cardRenderer = (cardData: APIModel) => (
  <UniProtKBCard data={cardData as UniProtkbAPIModel} isNotSelectable />
);

const RelatedResults = ({
  relatedQuery,
  relation = 'Related',
}: {
  relatedQuery: string;
  relation?: string;
}) => {
  // Query for results data
  const initialApiUrl = useNSQuery({
    overrideNS: Namespace.uniprotkb,
    overrideView: 'cards',
    overrideQuery: relatedQuery,
    withFacets: false,
  });
  const {
    initialLoading,
    total,
    progress,
    allResults,
    hasMoreData,
    handleLoadMoreRows,
  } = usePagination<UniProtkbAPIModel, UniProtkbAPIModel>(initialApiUrl);

  if (initialLoading) {
    return (
      <>
        <h2>Related UniProtKB entries</h2>
        <Loader progress={progress} />
      </>
    );
  }

  if (!total) {
    // Shouldn't happen
    return null;
  }

  return (
    <>
      <h2>
        {relation} UniProtKB {pluralise('entry', total, 'entries')}
      </h2>
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=${relatedQuery}`,
        }}
      >
        Browse {pluralise('', total, 'all')} <LongNumber>{total}</LongNumber>{' '}
        {pluralise('entry', total, 'entries')}
      </Link>
      <DataListWithLoader
        getIdKey={getIdKey}
        data={allResults}
        loading={initialLoading}
        dataRenderer={cardRenderer}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        // clickToLoad
      />
    </>
  );
};

export default RelatedResults;
