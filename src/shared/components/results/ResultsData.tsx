import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
  EllipsisReveal,
  Message,
} from 'franklin-sites';
import { generatePath, Link, useHistory, useLocation } from 'react-router-dom';

import DidYouMean from './DidYouMean';
import UniProtKBViewBy from '../../../uniprotkb/components/results/UniProtKBViewBy';

import useNS from '../../hooks/useNS';
import useColumns, { ColumnDescriptor } from '../../hooks/useColumns';
import useViewMode from '../../hooks/useViewMode';
import { useSmallScreen } from '../../hooks/useMatchMedia';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import {
  getEntryPathFor,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import getCardRenderer from '../../config/resultsCardRenderers';

import { Namespace, SearchableNamespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';
import { PaginatedResults } from '../../hooks/usePagination';
import { Basket } from '../../hooks/useBasket';

import styles from './styles/results-data.module.scss';

type Props = {
  resultsDataObject: PaginatedResults;
  setSelectedEntries?: Dispatch<SetStateAction<string[]>>;
  setSelectedItemFromEvent?: (event: MouseEvent | KeyboardEvent) => void;
  namespaceOverride?: Namespace;
  columnsOverride?: ColumnDescriptor<APIModel>[];
  displayIdMappingColumns?: boolean;
  basketSetter?: Dispatch<SetStateAction<Basket>>;
  disableCardToggle?: boolean;
  displayPeptideSearchMatchColumns?: boolean;
  didYouMean?: boolean;
};

const ResultsData = ({
  resultsDataObject,
  setSelectedEntries,
  setSelectedItemFromEvent,
  namespaceOverride,
  columnsOverride,
  displayIdMappingColumns,
  basketSetter,
  disableCardToggle = false,
  displayPeptideSearchMatchColumns,
  didYouMean,
}: Props) => {
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const { viewMode } = useViewMode(namespaceOverride, disableCardToggle);
  const history = useHistory();
  const [{ query, direct, viewBy }] = getParamsFromURL(useLocation().search);
  const [columns, updateColumnSort] = useColumns(
    namespaceOverride,
    displayIdMappingColumns,
    basketSetter,
    columnsOverride,
    setSelectedEntries,
    displayPeptideSearchMatchColumns
  );
  const {
    allResults,
    initialLoading,
    handleLoadMoreRows,
    hasMoreData,
    progress,
    warnings,
    suggestions,
  } = resultsDataObject;

  const smallScreen = useSmallScreen();

  // All complex values that only change when the namespace changes
  const [getIdKey, getEntryPathForEntry, cardRenderer] = useMemo(() => {
    const getIdKey = getIdKeyFor(namespace);
    const getEntryPath = getEntryPathFor(namespace as SearchableNamespace);
    return [
      getIdKey,
      (entry: APIModel) => getEntryPath(getIdKey(entry)),
      getCardRenderer(namespace),
    ];
  }, [namespace]);

  useEffect(() => {
    // Reset selected entries when switching view mode
    setSelectedEntries?.([]);
  }, [setSelectedEntries, viewMode]);

  // redirect to entry directly when...
  useEffect(() => {
    // ... only 1 result and ...
    if (!hasMoreData && allResults.length === 1) {
      const uniqueItem = allResults[0];
      const trimmedQuery = query.toUpperCase().trim();
      let idKey;
      try {
        idKey = getIdKey(uniqueItem);
      } catch (error) {
        // TODO: this happens when the namespace and data don't match up. Fix in a future refactor.
      }
      if (
        // ... and query marked as "direct" ...
        direct ||
        // ... or the result's ID or accession matches the query ...
        idKey?.toUpperCase() === trimmedQuery ||
        // ... or matches the UniProtKB ID ...
        ('uniProtkbId' in uniqueItem && uniqueItem.uniProtkbId === trimmedQuery)
      ) {
        history.replace(getEntryPathForEntry(uniqueItem));
      }
    }
  }, [
    history,
    direct,
    hasMoreData,
    allResults,
    getEntryPathForEntry,
    getIdKey,
    query,
  ]);

  const loadComponent = (
    <Loader progress={progress !== 1 ? progress : undefined} />
  );

  const prevViewMode = useRef(viewMode);
  useEffect(() => {
    prevViewMode.current = viewMode;
  });
  const prevNamespace = useRef(namespace);
  useEffect(() => {
    prevNamespace.current = namespace;
  });

  const loading =
    initialLoading ||
    prevViewMode.current !== viewMode ||
    prevNamespace.current !== namespace ||
    !columns ||
    !updateColumnSort;

  if (
    // if loading the first page of results
    loading
  ) {
    return <Loader progress={progress} />;
  }
  let content;
  if (viewBy) {
    content = <UniProtKBViewBy resultsDataObject={resultsDataObject} />;
  } else if (viewMode === 'cards' && !displayIdMappingColumns) {
    // Card view
    content = (
      <DataListWithLoader<APIModel>
        getIdKey={getIdKey}
        data={allResults}
        loading={loading}
        dataRenderer={cardRenderer}
        onSelectionChange={smallScreen ? undefined : setSelectedItemFromEvent}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={loadComponent}
        className={styles['results-data']}
      />
    );
  } else {
    // Table view
    <EllipsisReveal.Provider>
      <DataTableWithLoader
        getIdKey={getIdKey}
        columns={columns}
        data={allResults}
        loading={loading}
        onSelectionChange={smallScreen ? undefined : setSelectedItemFromEvent}
        onHeaderClick={updateColumnSort}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={loadComponent}
        className={styles['results-data']}
      />
    </EllipsisReveal.Provider>;
  }

  return (
    <>
      {/* Display warning for wildcard searches. It is not related to any warning from ID mapping */}
      {warnings && !displayIdMappingColumns && (
        <Message level="warning">
          {warnings.map((warning) => {
            const [firstPart, linkContent, lastPart] =
              warning.message.split(/(help page)/);
            return (
              <Fragment key={warning.code}>
                {firstPart}
                <Link
                  to={generatePath(LocationToPath[Location.HelpEntry], {
                    accession: 'wildcard',
                  })}
                >
                  {linkContent}
                </Link>
                {lastPart}
              </Fragment>
            );
          })}
        </Message>
      )}

      {content}
      {!hasMoreData && didYouMean && (
        <div className={styles['did-you-mean-wrapper']}>
          <DidYouMean
            suggestions={suggestions}
            heading={<h2>Not what you were looking for?</h2>}
          />
        </div>
      )}
    </>
  );
};

export default ResultsData;
