import { DataListWithLoader } from 'franklin-sites';

import HelpCard from '../results/HelpCard';

import usePagination from '../../../shared/hooks/usePagination';

import { help as helpURL } from '../../../shared/config/apiUrls';
import { pluralise } from '../../../shared/utils/utils';

import { HelpAPIModel, HelpUIModel } from '../../types/apiModel';

const getIdKey = (article: HelpUIModel) => article.id;

const cardRenderer = (article: HelpUIModel) => (
  <HelpCard id={article.id} title={article.title} headingLevel="h3" />
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
      .join(' AND ')} NOT id:${current}`,
    facets: null,
    fields: ['id', 'title'],
    size: '5',
  });
  const andPayload = usePagination<HelpAPIModel, HelpUIModel>(initialANDApiUrl);

  // Use OR query if no result with AND and there is more that 1 linked category
  const useOR = andPayload.total === 0 && categories.length > 1;

  // (Bigger) query for help articles
  const initialORApiUrl = useOR
    ? helpURL.search({
        query: `(${categories
          .map((category) => `category:"${category}"`)
          .join(' OR ')}) NOT id:${current}`,
        facets: null,
        fields: ['id', 'title'],
        size: '5',
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
      <h2>Related {pluralise('article', payload.total)}</h2>
      <DataListWithLoader
        getIdKey={getIdKey}
        data={payload.allResults}
        loading={payload.initialLoading}
        dataRenderer={cardRenderer}
        onLoadMoreItems={payload.handleLoadMoreRows}
        hasMoreData={payload.hasMoreData}
        clickToLoad="Load more articles"
      />
    </>
  );
};

export default RelatedArticles;
