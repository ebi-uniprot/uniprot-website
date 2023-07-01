import { useEffect, useState } from 'react';
import qs from 'query-string';

import { SearchTextLink } from './SearchSuggestions';
import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';

import { SearchResults } from '../../types/results';
import { Namespace } from '../../types/namespaces';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

const OrganismSuggestion = ({
  query,
  taxonID,
}: {
  query: string;
  taxonID: string;
}) => {
  const [organismExists, setOrganismExists] = useState(false);

  const { data } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${qs.stringify({
      query: `organism_id:${taxonID}`,
    })}`
  );

  useEffect(() => {
    if (data?.results.length) {
      setOrganismExists(true);
    }
  }, [data]);

  if (organismExists && !query.includes('proteome')) {
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
