// TODO: fix import order
import { ChangeEvent, useState } from 'react';
import { DataList, SearchInput } from 'franklin-sites';

import useDataApi from '../../shared/hooks/useDataApi';

import HelpCompactResult from './shared/HelpCompactResult';

import { help as helpURL } from '../../shared/config/apiUrls';

import { HelpSearchResponse } from '../adapters/helpConverter';
import { getIdKey } from './results/Results';

const HelpLandingPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const dataObject = useDataApi<HelpSearchResponse>(
    searchValue && helpURL.search({ query: searchValue })
  );

  return (
    <>
      <h1>Help center</h1>
      <div>
        <SearchInput
          isLoading={dataObject.loading}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value)
          }
          placeholder="Search"
          value={searchValue}
          autoFocus
        />

        {dataObject?.data?.results && (
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
        )}
      </div>
    </>
  );
};

export default HelpLandingPage;
