import { useEffect, useState } from 'react';

import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';
import apiUrls from '../../config/apiUrls/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { SearchResults } from '../../types/results';
import { stringifyUrl } from '../../utils/url';
import { SearchTextLink } from './SearchTextLink';

const ProteomeSuggestion = ({
  query,
  organismID,
  namespace,
}: {
  query: string;
  organismID: string;
  namespace: Namespace;
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
          namespace={namespace}
        />
      </>
    );
  }
  return null;
};

export default ProteomeSuggestion;
