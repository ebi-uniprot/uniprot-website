// TODO: fix import order
import { ChangeEvent, useState } from 'react';
import { Card, DataList, SearchInput } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import HelpCompactResult from '../shared/HelpCompactResult';

import { help as helpURL } from '../../../shared/config/apiUrls';

import { HelpSearchResponse } from '../../adapters/helpConverter';
import { getIdKey } from '../results/Results';

import styles from './styles/help-autocomplete.module.scss';

const HelpAutocomplete = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const dataObject = useDataApi<HelpSearchResponse>(
    searchValue && helpURL.search({ query: searchValue })
  );

  return (
    <div className={styles['help-autocomplete']}>
      <SearchInput
        isLoading={dataObject.loading}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
        placeholder="Search"
        value={searchValue}
        autoFocus
      />
      {!!dataObject?.data?.results.length && (
        <Card>
          <DataList
            getIdKey={getIdKey}
            data={dataObject.data.results}
            dataRenderer={(article) => (
              <HelpCompactResult
                id={article.id}
                title={article.title}
                titleMatch={article.matches?.title?.[0]}
                contentMatch={article.matches?.content?.[0]}
              />
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default HelpAutocomplete;
