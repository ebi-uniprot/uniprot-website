import { SearchTextLink } from './SearchSuggestions';
import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';

import { SearchResults } from '../../types/results';
import { Namespace } from '../../types/namespaces';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

const OrganismSuggestion = ({
  query,
  taxonID,
  total,
}: {
  query: string;
  taxonID: string;
  total: number;
}) => {
  const searchParams = new URLSearchParams({
    query: `organism_id:${taxonID}`,
    size: '0',
  });

  const { headers } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${searchParams}`
  );

  const isValidSuggestion =
    headers?.['x-total-results'] &&
    Number(headers?.['x-total-results']) !== total;

  if (isValidSuggestion && !query.includes('proteome')) {
    return (
      <>
        {' '}
        or restrict search to &quot;<b>{taxonID}</b>&quot; to{' '}
        <SearchTextLink query={query} text="exclude lower taxonomic ranks" />
      </>
    );
  }
  return null;
};

export default OrganismSuggestion;
