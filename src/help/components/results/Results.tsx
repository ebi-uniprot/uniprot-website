import cn from 'classnames';
import {
  DataListWithLoader,
  HelpIcon,
  Loader,
  SearchInput,
} from 'franklin-sites';
import { debounce } from 'lodash-es';
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import HTMLHead from '../../../shared/components/HTMLHead';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import { SingleColumnLayout } from '../../../shared/components/layouts/SingleColumnLayout';
import sharedApiUrls from '../../../shared/config/apiUrls/apiUrls';
import usePagination from '../../../shared/hooks/usePagination';
import { stringifyQuery } from '../../../shared/utils/url';
import helpApiUrls from '../../config/apiUrls';
import { HelpAPIModel, HelpUIModel } from '../../types/apiModel';
import HelpCard from './HelpCard';
import HelpResultFacets from './HelpResultFacets';
import styles from './styles/results.module.scss';

const dataRenderer = (article: HelpAPIModel) => (
  <HelpCard
    id={article.id}
    title={article.title}
    titleMatch={article.matches?.title?.[0]}
    contentMatch={article.matches?.content?.[0]}
    releaseDate={article.releaseDate}
  />
);

const getIdKey = (article: HelpAPIModel) => article.id;

type Props = {
  inPanel?: boolean;
};

const Results = ({ inPanel }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>(() => {
    const sp = new URLSearchParams(location.search);
    const query = sp.get('query');
    if (!query || query === '*') {
      return '';
    }
    return query;
  });

  const isReleaseNotes = location.pathname.includes('release-notes');
  const parsed = Object.fromEntries(new URLSearchParams(location.search));

  const {
    initialLoading,
    progress,
    allResults,
    hasMoreData,
    handleLoadMoreRows,
  } = usePagination<HelpAPIModel, HelpUIModel>(
    isReleaseNotes
      ? sharedApiUrls.releaseNotes.search({ ...parsed })
      : helpApiUrls.search({
          ...parsed,
          queryFacets: parsed.facets,
          facets: 'category',
        })
  );

  const replaceLocation = useMemo(
    () =>
      debounce((searchValue: string, isReleaseNotes) => {
        navigate(
          {
            pathname:
              LocationToPath[
                isReleaseNotes
                  ? Location.ReleaseNotesResults
                  : Location.HelpResults
              ],
            search: stringifyQuery(location.search, {
              query: searchValue || '*',
            }),
          },
          { replace: true }
        );
      }, 500),
    [navigate, location.search]
  );

  useEffect(() => {
    replaceLocation(searchValue, isReleaseNotes);

    return replaceLocation.cancel;
  }, [replaceLocation, searchValue, isReleaseNotes]);

  const searchNode = (
    <div className={styles['results-header']}>
      <strong className={cn('tiny', styles.title)}>
        <HelpIcon width="0.7em" height="0.7em" />{' '}
        {isReleaseNotes ? 'Release notes ' : 'Help '}search results
      </strong>
      <SearchInput
        isLoading={initialLoading}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
        placeholder="Search"
        value={searchValue}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    </div>
  );

  let main: ReactNode = null;

  if (initialLoading) {
    main = <Loader progress={progress} />;
  } else {
    main = (
      <DataListWithLoader<HelpUIModel>
        getIdKey={getIdKey}
        data={allResults}
        loading={initialLoading}
        dataRenderer={dataRenderer}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
      />
    );
  }

  if (isReleaseNotes) {
    return (
      <SingleColumnLayout>
        <HTMLHead title="Release Notes" />
        <h1 className="big">Release Notes</h1>
        {searchNode}
        {main}
      </SingleColumnLayout>
    );
  }

  if (inPanel) {
    return <>{main}</>;
  }

  return (
    <SidebarLayout
      sidebar={
        <>
          <h1>Help results</h1>
          <HelpResultFacets />
        </>
      }
      noOverflow
    >
      {/* TODO: check and change this title when implementing Help */}
      <HTMLHead
        title={`${searchValue} in UniProt ${
          isReleaseNotes ? 'release notes' : 'help'
        } search`}
      />
      {searchNode}
      {main}
    </SidebarLayout>
  );
};

export default Results;
