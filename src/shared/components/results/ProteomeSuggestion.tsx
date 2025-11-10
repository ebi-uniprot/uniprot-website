import { Button, Dropdown } from 'franklin-sites';
import { useEffect, useState } from 'react';

import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';
import apiUrls from '../../config/apiUrls/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { SearchResults } from '../../types/results';
import { stringifyUrl } from '../../utils/url';
import EntryTypeIcon from '../entry/EntryTypeIcon';
import { SearchTextLink } from './SearchTextLink';

const ProteomeSuggestion = ({
  organismID,
  namespace,
}: {
  organismID: string;
  namespace: Namespace;
}) => {
  const [proteomeInfo, setProteomeInfo] = useState<
    ProteomesAPIModel | ProteomesAPIModel[]
  >();

  const { data } = useDataApi<SearchResults<ProteomesAPIModel>>(
    stringifyUrl(apiUrls.search.searchPrefix(Namespace.proteomes), {
      query: `organism_id:${organismID}`,
      fields: 'upid,organism',
      size: 500, // to get all proteomes for UniParc
    })
  );

  useEffect(() => {
    if (data?.results.length) {
      if (namespace === Namespace.uniprotkb) {
        setProteomeInfo(data.results[0]);
      }
      if (namespace === Namespace.uniparc) {
        setProteomeInfo(data.results);
      }
    }
  }, [data, namespace]);

  if ((proteomeInfo as ProteomesAPIModel)?.id) {
    return (
      <>
        {' '}
        or restrict to reference proteome{' '}
        <SearchTextLink
          query={`proteome:${(proteomeInfo as ProteomesAPIModel).id}`}
          text={(proteomeInfo as ProteomesAPIModel).id}
          namespace={namespace}
        />
      </>
    );
  } else if (Array.isArray(proteomeInfo) && proteomeInfo.length > 0) {
    return (
      <>
        {' '}
        or restrict to{' '}
        <Dropdown
          // eslint-disable-next-line react/no-unstable-nested-components
          visibleElement={(onClick: () => unknown) => (
            <Button variant="tertiary" onClick={onClick} className="small">
              one of {proteomeInfo.length} proteomes
            </Button>
          )}
        >
          <ul>
            {proteomeInfo.map(({ id, proteomeType, taxonomy, strain }) => (
              <li key={id}>
                <SearchTextLink
                  query={`proteome:${id}`}
                  text={
                    <span>
                      <EntryTypeIcon entryType={proteomeType} />
                      {id} - {taxonomy.scientificName}{' '}
                      {strain ? `(${strain})` : null}{' '}
                    </span>
                  }
                  namespace={namespace}
                />
              </li>
            ))}
          </ul>
        </Dropdown>
      </>
    );
  }
  return null;
};

export default ProteomeSuggestion;
