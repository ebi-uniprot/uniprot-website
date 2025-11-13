import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import apiUrls from '../../config/apiUrls/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { SearchResults } from '../../types/results';
import {
  modifyQueryWithSuggestions,
  taxonHierarchySearchTerms,
} from '../../utils/searchSuggestions';
import { stringifyUrl } from '../../utils/url';
import OrganismSuggestion from './OrganismSuggestion';
import ProteomeSuggestion from './ProteomeSuggestion';
import { SearchLink } from './SearchTextLink';

const TaxonomyLevelsSuggestion = ({
  query,
  total,
  namespace,
}: {
  query: string;
  total: number;
  namespace: Namespace;
}) => {
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'taxon',
    taxonHierarchySearchTerms
  );

  const { headers } = useDataApi<
    SearchResults<UniProtkbAPIModel | UniParcAPIModel | ProteomesAPIModel>
  >(
    stringifyUrl(apiUrls.search.searchPrefix(namespace), {
      query: `${modifiedQuery}`,
      size: 0,
    })
  );

  const hasTaxonSuggestion =
    Number(headers?.['x-total-results']) &&
    Number(headers?.['x-total-results']) !== total;

  if (query !== modifiedQuery && searchValue) {
    const searchByOrganism = query.includes('organism');
    return (
      <small>
        {searchByOrganism && !query.includes('proteome') ? (
          <>
            {hasTaxonSuggestion ? (
              <>
                {' '}
                or expand search to &quot;<b>{searchValue}</b>&quot; to{' '}
                <SearchLink query={modifiedQuery} namespace={namespace}>
                  include lower taxonomic ranks
                </SearchLink>
              </>
            ) : (
              ''
            )}
            {namespace !== Namespace.proteomes && (
              <ProteomeSuggestion
                organismID={searchValue}
                query={query}
                namespace={namespace}
              />
            )}
          </>
        ) : (
          <OrganismSuggestion
            query={modifiedQuery}
            taxonID={searchValue}
            total={total}
            namespace={namespace}
          />
        )}
      </small>
    );
  }
  return null;
};

export default TaxonomyLevelsSuggestion;
