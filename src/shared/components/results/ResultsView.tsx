import { useState, useEffect, useRef, useMemo, FC, ReactNode } from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
} from 'franklin-sites';
import { useHistory, useLocation } from 'react-router-dom';

// card renderers for card views
import UniProtKBCard from '../../../uniprotkb/components/results/UniProtKBCard';
import UniRefCard from '../../../uniref/components/results/UniRefCard';
import UniParcCard from '../../../uniparc/components/results/UniParcCard';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';

import { getAPIQueryUrl } from '../../config/apiUrls';
// columns for table views
import UniProtKBColumnConfiguration from '../../../uniprotkb/config/UniProtKBColumnConfiguration';
import UniRefColumnConfiguration from '../../../uniref/config/UniRefColumnConfiguration';
import UniParcColumnConfiguration from '../../../uniparc/config/UniParcColumnConfiguration';
import ProteomesColumnConfiguration from '../../../proteomes/config/ProteomesColumnConfiguration';

import useDataApi from '../../hooks/useDataApi';
import useNS from '../../hooks/useNS';
import usePrefetch from '../../hooks/usePrefetch';

import getNextURLFromHeaders from '../../utils/getNextURLFromHeaders';
import {
  getParamsFromURL,
  getLocationObjForParams,
} from '../../../uniprotkb/utils/resultsUtils';
import {
  getEntryPathFor,
  SearchResultsLocations,
} from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { SortDirection } from '../../../uniprotkb/types/resultsTypes';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import { Column } from '../../config/columns';
import { ViewMode } from './ResultsContainer';

import './styles/warning.scss';
import './styles/results-view.scss';

type APIModel =
  | UniProtkbAPIModel
  | UniRefLiteAPIModel
  | UniParcAPIModel
  | ProteomesAPIModel;

const convertRow = (row: APIModel, namespace: Namespace) => {
  switch (namespace) {
    case Namespace.uniprotkb:
      return uniProtKbConverter(row as UniProtkbAPIModel);
    case Namespace.uniref:
      return row as UniRefLiteAPIModel;
    case Namespace.uniparc:
      return row as UniParcAPIModel;
    case Namespace.proteomes:
      return row as ProteomesAPIModel;
    default:
      return null;
  }
};

const getIdKeyFor = (namespace: Namespace): ((data: APIModel) => string) => {
  switch (namespace) {
    case Namespace.uniprotkb:
      return (data) => (data as UniProtkbAPIModel).primaryAccession;
    case Namespace.uniref:
      return (data) => (data as UniRefLiteAPIModel).id;
    case Namespace.uniparc:
      return (data) => (data as UniParcAPIModel).uniParcId;
    case Namespace.proteomes:
      return (data) => (data as ProteomesAPIModel).id;
    default:
      // eslint-disable-next-line no-console
      console.warn(`getIdKey method not implemented for ${namespace} yet`);
      return () => '';
  }
};

// TODO: create a "Column" type to cover the different column types
// and a Column renderer type with label: string and a render definition.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColumnConfigurations: Partial<Record<Namespace, Map<any, any>>> = {
  [Namespace.uniprotkb]: UniProtKBColumnConfiguration,
  [Namespace.uniref]: UniRefColumnConfiguration,
  [Namespace.uniparc]: UniParcColumnConfiguration,
  [Namespace.proteomes]: ProteomesColumnConfiguration,
};

const cardRenderer = (
  namespace: Namespace,
  selectedEntries: string[],
  handleEntrySelection: (rowId: string) => void
): ((data: APIModel) => ReactNode) => {
  const getIdKey = getIdKeyFor(namespace);
  switch (namespace) {
    case Namespace.uniprotkb: {
      return (cardData) => (
        <UniProtKBCard
          data={cardData as UniProtkbAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.uniref: {
      return (cardData) => (
        <UniRefCard
          data={cardData as UniRefLiteAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.uniparc: {
      return (cardData) => (
        <UniParcCard
          data={cardData as UniParcAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    default:
      return () => (
        <div className="warning">{`${namespace} has no card renderer yet`}</div>
      );
  }
};

type ColumnDescriptor = {
  name: string;
  label: ReactNode;
  render: (row: APIModel) => ReactNode;
  sortable?: true;
  sorted?: SortDirection;
};
const getColumnsToDisplay = (
  namespace: Namespace,
  columns: Column[] | undefined,
  sortableColumnToSortColumn: Map<Column, string>,
  sortColumn: SortableColumn,
  sortDirection: SortDirection
): ColumnDescriptor[] =>
  columns?.map((columnName) => {
    const columnConfig = ColumnConfigurations[namespace]?.get(columnName);
    if (columnConfig) {
      const columnDescriptor = {
        label: columnConfig.label,
        name: columnName,
        render: (row: APIModel) =>
          columnConfig.render(convertRow(row, namespace)),
      };
      if (sortableColumnToSortColumn.has(columnName)) {
        return {
          ...columnDescriptor,
          sortable: true,
          sorted: columnName === sortColumn ? sortDirection : undefined,
        };
      }
      return columnDescriptor;
    }
    return {
      label: columnName,
      name: columnName,
      render: () => (
        <div className="warning">{`${columnName} has no config yet`}</div>
      ),
    };
  }) || [];

type ResultsTableProps = {
  selectedEntries: string[];
  columns: Column[] | undefined;
  viewMode: ViewMode;
  handleEntrySelection: (rowId: string) => void;
  sortableColumnToSortColumn: Map<Column, string>;
};

const ResultsView: FC<ResultsTableProps> = ({
  selectedEntries,
  columns,
  viewMode,
  handleEntrySelection,
  sortableColumnToSortColumn,
}) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const prevNamespace = useRef<Namespace>(namespace);
  useEffect(() => {
    // will set it *after* the current render
    prevNamespace.current = namespace;
  });
  const prevColumns = useRef<Column[] | undefined>(columns);
  useEffect(() => {
    // will set it *after* the current render
    prevColumns.current = columns;
  });

  const history = useHistory();
  const location = useLocation();

  const { search: queryParamFromUrl } = location;
  const {
    query,
    selectedFacets,
    sortColumn,
    sortDirection,
    direct,
  } = getParamsFromURL(queryParamFromUrl);

  const initialApiUrl = getAPIQueryUrl({
    namespace,
    query,
    columns,
    selectedFacets,
    // Not really interested in the facets here, so try to reduce payload
    facets: null,
    sortColumn,
    sortDirection,
  });
  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({ total: 0, nextUrl: undefined }));
  usePrefetch(metaData.nextUrl);
  const [allResults, setAllResults] = useState<APIModel[]>([]);

  useEffect(() => {
    setAllResults([]);
    setMetaData({ total: 0, nextUrl: undefined });
    setUrl(initialApiUrl);
  }, [initialApiUrl]);

  const { data, loading, headers } = useDataApi<{
    results: APIModel[];
  }>(url);

  const prevViewMode = useRef<ViewMode>(viewMode);
  useEffect(() => {
    prevViewMode.current = viewMode;
  });

  const [getIdKey, getEntryPathForEntry] = useMemo(() => {
    const getIdKey = getIdKeyFor(namespace);
    const getEntryPath = getEntryPathFor(namespace);
    return [getIdKey, (entry: APIModel) => getEntryPath(getIdKey(entry))];
  }, [namespace]);

  // redirect to entry directly when only 1 result and query marked as "direct"
  useEffect(() => {
    if (direct && metaData.total === 1 && allResults.length === 1) {
      const uniqueItem = allResults[0];
      history.replace(getEntryPathForEntry(uniqueItem));
    }
  }, [history, direct, metaData, allResults, getEntryPathForEntry]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: +(headers?.['x-totalrecords'] || 0),
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers]);

  if (
    // if loading the first page of results
    (loading && url === initialApiUrl) ||
    // or we just switched namespace (a bit hacky workaround to force unmount)
    prevNamespace.current !== namespace ||
    // or we just switched view mode (hacky too)
    prevViewMode.current !== viewMode ||
    // or we just changed the displayed columns (hacky too...)
    prevColumns.current !== columns
  ) {
    return <Loader />;
  }

  const { total, nextUrl } = metaData;

  const handleLoadMoreRows = () => nextUrl && setUrl(nextUrl);

  const updateColumnSort = (columnName: string) => {
    const sortColumn = sortableColumnToSortColumn.get(columnName as Column);
    if (!sortColumn) {
      return;
    }

    // Change sort direction
    const updatedSortDirection =
      !sortDirection || sortDirection === SortDirection.descend
        ? SortDirection.ascend
        : SortDirection.descend;

    history.push(
      getLocationObjForParams({
        pathname: SearchResultsLocations[namespace],
        query,
        selectedFacets,
        sortColumn,
        sortDirection: updatedSortDirection,
      })
    );
  };

  const hasMoreData = total > allResults.length;

  return (
    <div className="results-view">
      {viewMode === ViewMode.CARD ? (
        // Card view
        <DataListWithLoader<APIModel>
          getIdKey={getIdKey}
          data={allResults}
          dataRenderer={cardRenderer(
            namespace,
            selectedEntries,
            handleEntrySelection
          )}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
          loaderComponent={<Loader />}
        />
      ) : (
        // Column view
        <DataTableWithLoader
          getIdKey={getIdKey}
          columns={getColumnsToDisplay(
            namespace,
            columns,
            sortableColumnToSortColumn,
            sortColumn,
            sortDirection
          )}
          data={allResults}
          selected={selectedEntries}
          onSelectRow={handleEntrySelection}
          onHeaderClick={updateColumnSort}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
          loaderComponent={<Loader />}
        />
      )}
    </div>
  );
};

export default ResultsView;
