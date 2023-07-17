import { useEffect, useState } from 'react';

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
  const [organismExists, setOrganismExists] = useState(false);

  const searchParams = new URLSearchParams({
    query: `organism_id:${taxonID}`,
  });

  const { data } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    `${apiUrls.search(Namespace.uniprotkb)}?${searchParams}`
  );

  useEffect(() => {
    if (data?.results.length && data?.results.length !== total) {
      setOrganismExists(true);
    }
  }, [data, total]);

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
