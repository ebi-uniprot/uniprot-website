import React, { useState, useEffect, useRef, FC } from 'react';
import { DataTable, DataList, Loader } from 'franklin-sites';
import { useHistory, useLocation } from 'react-router-dom';

import UniProtKBCard from './UniProtKBCard';
import UniRefCard from '../../../uniref/components/results/UniRefCard';

import uniProtKbConverter, {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../../adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';

import { ViewMode } from '../../state/resultsInitialState';

import apiUrls, { getAPIQueryUrl } from '../../../shared/config/apiUrls';
import UniProtKBColumnConfiguration from '../../config/UniProtKBColumnConfiguration';
import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../../../uniref/config/UniRefColumnConfiguration';

import useDataApi from '../../../shared/hooks/useDataApi';
import useNS from '../../../shared/hooks/useNS';

import getNextUrlFromResponse from '../../utils/queryUtils';
import {
  getParamsFromURL,
  getLocationObjForParams,
  getSortableColumnToSortColumn,
} from '../../utils/resultsUtils';

import { Namespace } from '../../../shared/types/namespaces';
import { SortDirection, ReceivedFieldData } from '../../types/resultsTypes';
import { SortableColumn, UniProtKBColumn } from '../../types/columnTypes';

import './styles/warning.scss';
import './styles/results-view.scss';
import { AllColumns } from '../../../shared/components/results/ResultsContainer';

type ResultsTableProps = {
  selectedEntries: string[];
  columns: AllColumns;
  viewMode: ViewMode;
  handleEntrySelection: (rowId: string) => void;
};

const convertRow = (
  row: UniProtkbAPIModel | UniRefLiteAPIModel,
  namespace: Namespace
) => {
  switch (namespace) {
    case Namespace.uniprotkb:
      return uniProtKbConverter(row as UniProtkbAPIModel) as UniProtkbUIModel;
    case Namespace.uniref:
      return row as UniRefLiteAPIModel;
    default:
      return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColumnConfigurations: Partial<Record<Namespace, Map<any, any>>> = {
  [Namespace.uniprotkb]: UniProtKBColumnConfiguration,
  [Namespace.uniref]: UniRefColumnConfiguration,
};

const ResultsView: FC<ResultsTableProps> = ({
  selectedEntries,
  columns,
  viewMode,
  handleEntrySelection,
}) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const history = useHistory();
  const location = useLocation();

  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const initialApiUrl = getAPIQueryUrl({
    namespace,
    query,
    columns,
    selectedFacets,
    sortColumn,
    sortDirection,
  });
  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl: string | undefined;
  }>({ total: 0, nextUrl: undefined });
  const [allResults, setAllResults] = useState<UniProtkbAPIModel[]>([]);
  const [sortableColumnToSortColumn, setSortableColumnToSortColumn] = useState<
    Map<UniProtKBColumn | UniRefColumn, string>
  >();

  const { data, headers } = useDataApi<{
    results: UniProtkbAPIModel[];
  }>(url);
  const { data: dataResultFields } = useDataApi<ReceivedFieldData>(
    apiUrls.resultsFields
  );
  // TODO handle error

  const prevViewMode = useRef<ViewMode>();
  useEffect(() => {
    prevViewMode.current = viewMode;
  });

  useEffect(() => {
    setAllResults([]);
    setMetaData({ total: 0, nextUrl: undefined });
    setUrl(initialApiUrl);
  }, [initialApiUrl]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: headers['x-totalrecords'],
      nextUrl: getNextUrlFromResponse(headers.link),
    }));
  }, [data, headers]);

  useEffect(() => {
    if (!dataResultFields) return;
    setSortableColumnToSortColumn(
      getSortableColumnToSortColumn(dataResultFields)
    );
  }, [dataResultFields]);

  if (
    allResults.length === 0 ||
    !sortableColumnToSortColumn ||
    sortableColumnToSortColumn.size === 0 ||
    prevViewMode.current !== viewMode
  ) {
    return <Loader />;
  }

  const { total, nextUrl } = metaData;

  const handleLoadMoreRows = () => nextUrl && setUrl(nextUrl);

  const updateColumnSort = (column: SortableColumn) => {
    const sortableColumn = sortableColumnToSortColumn.get(column);
    if (!sortableColumn) return;

    // Change sort direction
    const updatedSortDirection =
      !sortDirection || sortDirection === SortDirection.descend
        ? SortDirection.ascend
        : SortDirection.descend;

    history.push(
      getLocationObjForParams({
        pathname: `/${namespace}`,
        query,
        selectedFacets,
        sortColumn: sortableColumn,
        sortDirection: updatedSortDirection,
      })
    );
  };

  const hasMoreData = total > allResults.length;
  let dataView;
  if (viewMode === ViewMode.CARD) {
    dataView = (
      <DataList
        getIdKey={({
          primaryAccession,
          id,
        }: {
          primaryAccession?: string;
          id: string;
        }) => primaryAccession || id}
        data={allResults}
        dataRenderer={(dataItem: UniProtkbAPIModel | UniRefLiteAPIModel) => {
          switch (namespace) {
            case Namespace.uniref: {
              const data = dataItem as UniRefLiteAPIModel;
              return (
                <UniRefCard
                  data={data}
                  selected={selectedEntries.includes(data.id)}
                  handleEntrySelection={handleEntrySelection}
                />
              );
            }
            case Namespace.uniprotkb:
            default: {
              const data = dataItem as UniProtkbAPIModel;
              return (
                <UniProtKBCard
                  data={data}
                  selected={selectedEntries.includes(data.primaryAccession)}
                  handleEntrySelection={handleEntrySelection}
                />
              );
            }
          }
        }}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={<Loader />}
        scrollDataAttribute="sidebar-content"
      />
    );
  } else {
    // viewMode === ViewMode.TABLE
    const columnsToDisplay =
      columns.map((columnName) => {
        const columnConfig = ColumnConfigurations[namespace]?.get(columnName);
        if (columnConfig) {
          return {
            label: columnConfig.label,
            name: columnName,
            render: (row: UniProtkbAPIModel | UniRefLiteAPIModel) => {
              const convertedRow = convertRow(row, namespace);
              return columnConfig.render(convertedRow);
            },
            sortable: sortableColumnToSortColumn.has(columnName),
            sorted: columnName === sortColumn && sortDirection, // TODO this doesn't seem to update the view
          };
        }
        return {
          label: columnName,
          name: columnName,
          render: () => (
            <div className="warning">{`${columnName} has no config`}</div>
          ),
          sortable: false,
          sorted: false,
        };
      }) || [];
    dataView = (
      <DataTable
        getIdKey={({ primaryAccession }: { primaryAccession: string }) =>
          primaryAccession
        }
        columns={columnsToDisplay}
        data={allResults}
        selectable
        selected={selectedEntries}
        onSelect={handleEntrySelection}
        onHeaderClick={updateColumnSort}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={<Loader />}
        scrollDataAttribute="sidebar-content"
      />
    );
  }
  return <div className="results-view">{dataView}</div>;
};

export default ResultsView;
