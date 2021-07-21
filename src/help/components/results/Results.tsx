import { ChangeEvent, useState, useEffect, useMemo, ReactNode } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { DataList, HelpIcon, Loader, SearchInput } from 'franklin-sites';
import qs from 'query-string';
import cn from 'classnames';
import { debounce } from 'lodash-es';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ResultsFacets from '../../../shared/components/results/ResultsFacets';
import HelpCard from './HelpCard';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help } from '../../../shared/config/apiUrls';

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
    help.search(location.search)
  );

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
        dataRenderer={(article) => <HelpCard data={article} />}
      />
    );
  }

  return (
    <SideBarLayout sidebar={<ResultsFacets dataApiObject={dataObject} />}>
      <div className={styles['results-header']}>
        <HelperImage className={styles.helper} />
        <h2 className={cn('tiny', styles.title)}>
          <HelpIcon width="0.7em" height="0.7em" /> Help search results
        </h2>
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
