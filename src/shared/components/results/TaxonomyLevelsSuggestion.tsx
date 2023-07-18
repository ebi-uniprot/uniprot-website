import ProteomeSuggestion from './ProteomeSuggestion';
import {
  modifyQueryWithSuggestions,
  SearchTextLink,
  taxonHierarchySearchTerms,
} from './SearchSuggestions';
import OrganismSuggestion from './OrganismSuggestion';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';

import { SearchResults } from '../../types/results';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { Namespace } from '../../types/namespaces';

const TaxonomyLevelsSuggestion = ({
  query,
  total,
}: {
  query: string;
  total: number;
}) => {
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'taxon',
    taxonHierarchySearchTerms
  );

  const searchParams = new URLSearchParams({
    query: `${modifiedQuery}`,
    size: '0',
  });

  const { headers } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${searchParams}`
  );

  const showTaxonSuggestion =
    headers?.['x-total-results'] &&
    Number(headers?.['x-total-results']) !== total;

  if (query !== modifiedQuery && searchValue) {
    const searchByOrganism = query.includes('organism');
    return (
      <small>
        {searchByOrganism && !query.includes('proteome') ? (
          <>
            {showTaxonSuggestion ? (
              <>
                {' '}
                or expand search to &quot;<b>{searchValue}</b>&quot; to{' '}
                <SearchTextLink
                  query={modifiedQuery}
                  text="include lower taxonomic ranks"
                />
              </>
            ) : (
              ''
            )}
            <ProteomeSuggestion query={query} organismID={searchValue} />
          </>
        ) : (
          <OrganismSuggestion
            query={modifiedQuery}
            taxonID={searchValue}
            total={total}
          />
        )}
      </small>
    );
  }
  return null;
};

export default TaxonomyLevelsSuggestion;
