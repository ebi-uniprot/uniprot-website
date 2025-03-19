import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import apiUrls from '../../config/apiUrls/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { SearchResults } from '../../types/results';
import { stringifyUrl } from '../../utils/url';
import { SearchTextLink } from './SearchTextLink';

const OrganismSuggestion = ({
  query,
  taxonID,
  total,
}: {
  query: string;
  taxonID: string;
  total: number;
}) => {
  const { headers } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    stringifyUrl(apiUrls.search.searchPrefix(Namespace.uniprotkb), {
      query: `organism_id:${taxonID}`,
      size: 0,
    })
  );

  const hasOrganismSuggestion =
    Number(headers?.['x-total-results']) &&
    Number(headers?.['x-total-results']) !== total;

  if (hasOrganismSuggestion && !query.includes('proteome')) {
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
