import { ChangeEvent, useState, useEffect, useMemo, ReactNode } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { DataList, HelpIcon, Loader, SearchInput } from 'franklin-sites';
import qs from 'query-string';
import cn from 'classnames';
import { debounce } from 'lodash-es';

import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ResultsFacets from '../../../shared/components/results/ResultsFacets';
import HelpCard from './HelpCard';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';

import { LocationToPath, Location } from '../../../app/config/urls';
import { HelpAPIModel, HelpSearchResponse } from '../../adapters/helpConverter';

import styles from './styles/results.module.scss';

import HelperImage from './svgs/helper.svg';

const getIdKey = (article: HelpAPIModel) => article.id;

const Results = ({ history, location }: RouteChildrenProps) => {
  const [searchValue, setSearchValue] = useState<string>(() => {
    const { query } = qs.parse(location.search);
    const searchValue = Array.isArray(query) ? query.join(' ') : query;
    if (!searchValue || searchValue === '*') {
      return '';
    }
    return searchValue;
  });

  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    helpURL.search(location.search)
  );

  const fallBackAppliedFacets = useMemo(() => {
    const { facets } = qs.parse(location.search);
    const facetValues =
      (Array.isArray(facets) ? facets.join(',') : facets) || '';
    return {
      loading: false,
      data: facetValues
        ? {
            facets: [
              {
                label: 'Category',
                name: 'category',
                allowMultipleSelection: true,
                values: facetValues.split(',').map((value) => ({
                  value: value.replace('category:', ''),
                  count: 0,
                })),
              },
            ],
          }
        : undefined,
    };
  }, [location.search]);

  const replaceLocation = useMemo(
    () =>
      debounce((searchValue: string) => {
        history.replace({
          pathname: LocationToPath[Location.HelpResults],
          search: qs.stringify({
            ...qs.parse(history.location.search),
            query: searchValue || '*',
          }),
        });
      }, 500),
    [history]
  );

  useEffect(() => {
    replaceLocation(searchValue);

    return replaceLocation.cancel;
  }, [replaceLocation, searchValue]);

  let main: ReactNode = null;

  if (dataObject.loading && !dataObject.data) {
    main = <Loader progress={dataObject.progress} />;
  } else if (dataObject.error || !dataObject.data) {
    main = <ErrorHandler status={dataObject.status} />;
  } else {
    main = (
      <DataList
        getIdKey={getIdKey}
        data={dataObject.data.results}
        dataRenderer={(article) => (
          <HelpCard
            id={article.id}
            title={article.title}
            titleMatch={article.matches?.title?.[0]}
            contentMatch={article.matches?.content?.[0]}
          />
        )}
      />
    );
  }

  return (
    <SideBarLayout
      sidebar={
        <>
          <h1 className="big">Help results</h1>
          <ResultsFacets
            dataApiObject={
              dataObject.data?.facets ? dataObject : fallBackAppliedFacets
            }
          />
        </>
      }
    >
      {/* TODO: check and chage this title when implementing Help */}
      <HTMLHead title={`${searchValue} in UniProt help`} />
      <div className={styles['results-header']}>
        <HelperImage className={styles.helper} />
        <strong className={cn('tiny', styles.title)}>
          <HelpIcon width="0.7em" height="0.7em" /> Help search results
        </strong>
        <SearchInput
          isLoading={dataObject.loading}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value)
          }
          placeholder="Search"
          value={searchValue}
          autoFocus
        />
      </div>

      {main}
    </SideBarLayout>
  );
};

export default Results;
