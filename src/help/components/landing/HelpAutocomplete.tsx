import { ChangeEvent, useState } from 'react';
import { Card, InfoList, SearchInput } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import CleanHighlightMarkDown from '../../utils/CleanHighlightMarkDown';

import { help as helpURL } from '../../../shared/config/apiUrls';

import { HelpSearchResponse } from '../../adapters/helpConverter';

import styles from './styles/help-autocomplete.module.scss';

const HelpAutocomplete = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const dataObject = useDataApi<HelpSearchResponse>(
    searchValue && helpURL.search({ query: searchValue })
  );

  const articles = dataObject?.data?.results.map((article) => {
    const titleMatch = article.matches?.title?.[0];
    const contentMatch = article.matches?.content?.[0];
    return {
      title: titleMatch ? (
        <CleanHighlightMarkDown md={titleMatch} />
      ) : (
        article.title
      ),
      content: contentMatch && <CleanHighlightMarkDown md={contentMatch} />,
    };
  });

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
      {!!articles?.length && (
        <Card>
          <InfoList infoData={articles} />
        </Card>
      )}
    </div>
  );
};

export default HelpAutocomplete;
