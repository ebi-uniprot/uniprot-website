import { useState, useEffect } from 'react';
import qs from 'query-string';

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
  const [showTaxonSuggestion, setShowTaxonSuggestion] = useState(false);
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'taxon',
    taxonHierarchySearchTerms
  );

  const { data } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${qs.stringify({
      query: modifiedQuery,
    })}`
  );

  useEffect(() => {
    if (data?.results.length && data?.results.length !== total) {
      setShowTaxonSuggestion(true);
    }
  }, [data, total]);

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
