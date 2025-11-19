import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import apiUrls from '../../config/apiUrls/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { SearchResults } from '../../types/results';
import { stringifyUrl } from '../../utils/url';
import { SearchLink } from './SearchTextLink';

const OrganismSuggestion = ({
  query,
  taxonID,
  total,
  namespace,
}: {
  query: string;
  taxonID: string;
  total: number;
  namespace: Namespace;
}) => {
  const { headers } = useDataApi<
    SearchResults<UniProtkbAPIModel | UniParcAPIModel | ProteomesAPIModel>
  >(
    stringifyUrl(apiUrls.search.searchPrefix(namespace), {
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
        or restrict search to organism with taxon ID &quot;<b>{taxonID}</b>
        &quot; to{' '}
        <SearchLink query={query} namespace={namespace}>
          exclude lower taxonomic ranks
        </SearchLink>
      </>
    );
  }
  return null;
};

export default OrganismSuggestion;
