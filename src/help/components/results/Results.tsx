import { ChangeEvent, useState, useEffect, useMemo, ReactNode } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { DataList, HelpIcon, Loader, SearchInput } from 'franklin-sites';
import qs from 'query-string';
import cn from 'classnames';
import { debounce } from 'lodash-es';

import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import NoResultsPage from '../../../shared/components/error-pages/NoResultsPage';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ResultsFacets from '../../../shared/components/results/ResultsFacets';
import HelpCard from './HelpCard';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';
import { parseQueryString } from '../../../shared/utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';
import { HelpAPIModel, HelpSearchResponse } from '../../adapters/helpConverter';

import styles from './styles/results.module.scss';

import HelperImage from './svgs/helper.svg';

const dataRenderer = (article: HelpAPIModel) => (
  <HelpCard
    id={article.id}
    title={article.title}
    titleMatch={article.matches?.title?.[0]}
    contentMatch={article.matches?.content?.[0]}
  />
);

const getIdKey = (article: HelpAPIModel) => article.id;

type Props = {
  inPanel?: boolean;
};

const Results = ({
  history,
  location,
  inPanel,
}: RouteChildrenProps & Props) => {
  const [searchValue, setSearchValue] = useState<string>(() => {
    const { query } = parseQueryString(location.search);
    if (!query || query === '*') {
      return '';
    }
    return query;
  });

  const parsed = parseQueryString(location.search);
  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    helpURL.search({
      ...parsed,
      queryFacets: parsed.facets,
      facets: 'category',
    })
  );

  const fallBackAppliedFacets = useMemo(() => {
    const { facets } = parseQueryString(location.search);
    const facetValues = facets || '';
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
            ...parseQueryString(history.location.search),
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
  } else if (!dataObject.data.results.length) {
    main = <NoResultsPage />;
  } else {
    main = (
      <DataList
        getIdKey={getIdKey}
        data={dataObject.data.results}
        dataRenderer={dataRenderer}
      />
    );
  }

  if (inPanel) {
    return <>{main}</>;
  }

  return (
    <SideBarLayout
      sidebar={
        <>
          <h1>Help results</h1>
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
