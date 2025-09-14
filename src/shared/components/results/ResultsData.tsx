import cn from 'classnames';
import {
  DataListWithLoader,
  DataTableWithLoader,
  EllipsisReveal,
  Loader,
  Message,
} from 'franklin-sites';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { generatePath, Link, useLocation } from 'react-router';

import {
  getEntryPathFor,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import UniProtKBGroupBy from '../../../uniprotkb/components/results/UniProtKBGroupBy';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import getCardRenderer from '../../config/resultsCardRenderers';
import { Basket } from '../../hooks/useBasket';
import useColumns, { ColumnDescriptor } from '../../hooks/useColumns';
import { useSmallScreen } from '../../hooks/useMatchMedia';
import useNS from '../../hooks/useNS';
import { PaginatedResults } from '../../hooks/usePagination';
import useResultsToEntryRedirect from '../../hooks/useResultsToEntryRedirect';
import useViewMode from '../../hooks/useViewMode';
import { APIModel } from '../../types/apiModel';
import { Namespace, SearchableNamespace } from '../../types/namespaces';
import { getIdKeyForData } from '../../utils/getIdKey';
import ExternalLink from '../ExternalLink';
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
}: Props) => {
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const { viewMode } = useViewMode(namespaceOverride, disableCardToggle);
  const [{ query, direct, groupBy }] = getParamsFromURL(useLocation().search);
  const [columns, updateColumnSort, tooltipOnHoverRef] = useColumns(
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
  } = resultsDataObject;

  const smallScreen = useSmallScreen();

  const firstResult = allResults?.[0];

  // All complex values that only change when the namespace changes and data changes
  const [getIdKey, getEntryPathForEntry, cardRenderer] = useMemo(() => {
    const getIdKey = getIdKeyForData(firstResult);
    const getEntryPath = getEntryPathFor(namespace as SearchableNamespace);
    return [
      getIdKey,
      (entry: APIModel) => getEntryPath(getIdKey(entry)),
      getCardRenderer(namespace),
    ];
  }, [firstResult, namespace]);

  useEffect(() => {
    // Reset selected entries when switching view mode
    setSelectedEntries?.([]);
  }, [setSelectedEntries, viewMode]);

  useResultsToEntryRedirect(
    direct,
    hasMoreData,
    allResults,
    getEntryPathForEntry,
    getIdKey,
    query
  );

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
  if (groupBy && namespace === Namespace.uniprotkb) {
    // Group By view
    content = <UniProtKBGroupBy total={resultsDataObject.total} />;
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
        className={cn('hotjar-margin', styles['results-data'])}
      />
    );
  } else {
    // Table view
    // Check if there is content to avoid showing empty table header for no results
    content =
      resultsDataObject.total || allResults.length ? (
        <EllipsisReveal.Provider>
          <DataTableWithLoader
            getIdKey={getIdKey}
            columns={columns}
            data={allResults}
            loading={loading}
            onSelectionChange={
              smallScreen ? undefined : setSelectedItemFromEvent
            }
            onHeaderClick={updateColumnSort}
            onLoadMoreItems={handleLoadMoreRows}
            hasMoreData={hasMoreData}
            loaderComponent={loadComponent}
            className={cn('hotjar-margin', styles['results-data'])}
          />
        </EllipsisReveal.Provider>
      ) : null;
  }

  return (
    <div ref={tooltipOnHoverRef}>
      {/* Display warning for wildcard searches. It is not related to any warning from ID mapping */}
      {warnings && !displayIdMappingColumns && (
        <Message level="warning">
          <small>
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
          </small>
        </Message>
      )}

      {namespace === Namespace.proteomes ? (
        <Message level="warning" className="uniprot-grid-cell--span-12">
          We will be improving our pipelines for the selection of Reference
          Proteomes over the next few months (September 2025–February 2026).
          <br />
          This might affect your data analysis,{' '}
          <ExternalLink url="https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html">
            please read this short article
          </ExternalLink>{' '}
          if you want to know more.
        </Message>
      ) : null}
      {content}
    </div>
  );
};

export default ResultsData;
