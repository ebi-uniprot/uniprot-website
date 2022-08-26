import { DataListWithLoader } from 'franklin-sites';

import HelpCard from '../results/HelpCard';

import usePagination from '../../../shared/hooks/usePagination';

import { help as helpURL } from '../../../shared/config/apiUrls';
import { pluralise } from '../../../shared/utils/utils';

import { HelpAPIModel, HelpUIModel } from '../../adapters/helpConverter';

const getIdKey = (article: HelpUIModel) => article.id;

const cardRenderer = (article: HelpUIModel) => (
  <HelpCard id={article.id} title={article.title} />
);

const RelatedArticles = ({
  current,
  categories,
}: {
  current: string;
  categories: string[];
}) => {
  // Query for help articles for all categories for this article
  const initialANDApiUrl = helpURL.search({
    query: `${categories
      .map((category) => `category:"${category}"`)
      .join(' AND ')} AND NOT id:${current}`,
    facets: null,
    fields: ['id', 'title'],
  });
  const andPayload = usePagination<HelpAPIModel, HelpUIModel>(initialANDApiUrl);

  const useOR = andPayload.total === 0;

  // (Bigger) query for help articles if nothing with "AND"
  const initialORApiUrl = useOR
    ? helpURL.search({
        query: `(${categories
          .map((category) => `category:"${category}"`)
          .join(' OR ')}) AND NOT id:${current}`,
        facets: null,
        fields: ['id', 'title'],
      })
    : undefined;

  const orPayload = usePagination<HelpAPIModel, HelpUIModel>(initialORApiUrl);

  let payload = andPayload;
  if (useOR) {
    payload = orPayload;
  }

  if (payload.initialLoading || !payload.total) {
    return null;
  }

  return (
    <>
      <h2>
        Not what you are looking for? Here{' '}
        {pluralise('is', payload.total, 'are')}{' '}
        {payload.total > 25 ? 'some' : payload.total} related{' '}
        {pluralise('article', payload.total)}
      </h2>
      <DataListWithLoader
        getIdKey={getIdKey}
        data={payload.allResults}
        loading={payload.initialLoading}
        dataRenderer={cardRenderer}
        onLoadMoreItems={payload.handleLoadMoreRows}
        hasMoreData={payload.hasMoreData}
        // clickToLoad
      />
    </>
  );
};

export default RelatedArticles;
