import { useEffect, useState } from 'react';

import { SearchTextLink } from './SearchTextLink';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls/apiUrls';
import { stringifyUrl } from '../../utils/url';

import { SearchResults } from '../../types/results';
import { Namespace } from '../../types/namespaces';
import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';

const ProteomeSuggestion = ({
  query,
  organismID,
}: {
  query: string;
  organismID: string;
}) => {
  const [proteomeInfo, setProteomeInfo] = useState<ProteomesAPIModel>();

  const { data } = useDataApi<SearchResults<ProteomesAPIModel>>(
    stringifyUrl(apiUrls.search.searchPrefix(Namespace.proteomes), {
      query: `organism_id:${organismID}`,
      fields: 'upid',
    })
  );

  useEffect(() => {
    if (data?.results.length) {
      setProteomeInfo(data.results[0]);
    }
  }, [data]);

  if (proteomeInfo?.id) {
    return (
      <>
        {' '}
        or restrict to reference proteome{' '}
        <SearchTextLink
          query={`${query} AND (proteome:${proteomeInfo.id})`}
          text={proteomeInfo.id}
        />
      </>
    );
  }
  return null;
};

export default ProteomeSuggestion;
