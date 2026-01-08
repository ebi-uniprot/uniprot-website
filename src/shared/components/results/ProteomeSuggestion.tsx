import { Button, Dropdown, ExternalLink } from 'franklin-sites';
import { useEffect, useState } from 'react';

import { Location, LocationToPath } from '../../../app/config/urls';
import { type ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';
import apiUrls from '../../config/apiUrls/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { type SearchResults } from '../../types/results';
import { stringifyUrl } from '../../utils/url';
import EntryTypeIcon from '../entry/EntryTypeIcon';
import { SearchLink } from './SearchTextLink';
import styles from './styles/proteome-suggestion.module.scss';

const PROTEOME_LIST_SIZE = 7;

const ProteomeSuggestion = ({
  organismID,
  query,
  namespace,
}: {
  organismID: string;
  query: string;
  namespace: Namespace;
}) => {
  const [proteomeInfo, setProteomeInfo] = useState<
    ProteomesAPIModel | ProteomesAPIModel[]
  >();

  const { data, headers } = useDataApi<SearchResults<ProteomesAPIModel>>(
    stringifyUrl(apiUrls.search.searchPrefix(Namespace.proteomes), {
      query: `organism_id:${organismID}`,
      fields: 'upid,organism',
      size: PROTEOME_LIST_SIZE,
    })
  );

  useEffect(() => {
    if (data?.results.length) {
      if (namespace === Namespace.uniprotkb) {
        setProteomeInfo(data.results[0]);
      } else if (namespace === Namespace.uniparc) {
        setProteomeInfo(data.results);
      }
    }
  }, [data, namespace]);

  if (!Array.isArray(proteomeInfo) && proteomeInfo?.id) {
    return (
      <>
        {' '}
        {/* //TODO: After 2026_02: remove word "reference " */}
        or restrict search to reference proteome{' '}
        <SearchLink
          query={`${query} AND (proteome:${proteomeInfo.id})`}
          namespace={namespace}
        >
          {proteomeInfo.id}
        </SearchLink>
      </>
    );
  } else if (
    Array.isArray(proteomeInfo) &&
    proteomeInfo.length > 0 &&
    headers?.['x-total-results']
  ) {
    return (
      <>
        {' '}
        or restrict search to{' '}
        <Dropdown
          // eslint-disable-next-line react/no-unstable-nested-components
          visibleElement={(onClick: () => unknown) => (
            <Button
              variant="tertiary"
              onClick={onClick}
              className={styles['proteome-dropdown-button']}
            >
              one of {headers['x-total-results']} proteomes
            </Button>
          )}
        >
          <ul>
            {proteomeInfo.map(({ id, proteomeType, taxonomy, strain }) => (
              <li key={id}>
                <SearchLink
                  query={`${query} AND (proteome:${id})`}
                  namespace={namespace}
                >
                  <span>
                    <EntryTypeIcon entryType={proteomeType} />
                    {id} - {taxonomy.scientificName}{' '}
                    {strain ? `(${strain})` : null}{' '}
                  </span>
                </SearchLink>
              </li>
            ))}
            {Number(headers['x-total-results']) > PROTEOME_LIST_SIZE && (
              <li>
                <ExternalLink
                  url={stringifyUrl(LocationToPath[Location.ProteomesResults], {
                    query: `organism_id:${organismID}`,
                  })}
                >
                  View all {headers['x-total-results']} in the Proteomes
                  database
                </ExternalLink>
              </li>
            )}
          </ul>
        </Dropdown>
      </>
    );
  }
  return null;
};

export default ProteomeSuggestion;
