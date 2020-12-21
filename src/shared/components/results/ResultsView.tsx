import { useState, useEffect, useRef, FC } from 'react';
import { DataTable, DataList, Loader } from 'franklin-sites';
import { useHistory, useLocation, generatePath } from 'react-router-dom';

import UniProtKBCard from '../../../uniprotkb/components/results/UniProtKBCard';
import UniRefCard from '../../../uniref/components/results/UniRefCard';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';

import { getAPIQueryUrl } from '../../config/apiUrls';
import UniProtKBColumnConfiguration from '../../../uniprotkb/config/UniProtKBColumnConfiguration';
import UniRefColumnConfiguration from '../../../uniref/config/UniRefColumnConfiguration';
import UniParcColumnConfiguration from '../../../uniparc/config/UniParcColumnConfiguration';

import useDataApi from '../../hooks/useDataApi';
import useNS from '../../hooks/useNS';
import usePrefetch from '../../hooks/usePrefetch';

import getNextUrlFromResponse from '../../utils/queryUtils';
import {
  getParamsFromURL,
  getLocationObjForParams,
} from '../../../uniprotkb/utils/resultsUtils';
import { EntryLocations } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { SortDirection } from '../../../uniprotkb/types/resultsTypes';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import { Column } from '../../config/columns';
import { ViewMode } from './ResultsContainer';

import './styles/warning.scss';
import './styles/results-view.scss';

type APIModel = UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;

type ResultsTableProps = {
  selectedEntries: string[];
  columns: Column[];
  viewMode: ViewMode;
  handleEntrySelection: (rowId: string) => void;
  sortableColumnToSortColumn: Map<Column, string>;
};

const convertRow = (row: APIModel, namespace: Namespace) => {
  switch (namespace) {
    case Namespace.uniprotkb:
      return uniProtKbConverter(row as UniProtkbAPIModel);
    case Namespace.uniref:
      return row as UniRefLiteAPIModel;
    case Namespace.uniparc:
      return row as UniParcAPIModel;
    default:
      return null;
  }
};

const getIdKey = (namespace: Namespace) => {
  switch (namespace) {
    case Namespace.uniprotkb:
      return (data: UniProtkbAPIModel) => data.primaryAccession;
    case Namespace.uniref:
      return (data: UniRefLiteAPIModel) => data.id;
    case Namespace.uniparc:
      return (data: UniParcAPIModel) => data.uniParcId;
    default:
      return null;
  }
};

// TODO: create a "Column" type to cover the different column types
// and a Column renderer type with label: string and a render definition.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColumnConfigurations: Partial<Record<Namespace, Map<any, any>>> = {
  [Namespace.uniprotkb]: UniProtKBColumnConfiguration,
  [Namespace.uniref]: UniRefColumnConfiguration,
  [Namespace.uniparc]: UniParcColumnConfiguration,
};

const ResultsView: FC<ResultsTableProps> = ({
  selectedEntries,
  columns,
  viewMode,
  handleEntrySelection,
  sortableColumnToSortColumn,
}) => {
  const namespace = useNS() || Namespace.uniprotkb;
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
    columns: namespace === Namespace.uniparc ? undefined : columns,
    selectedFacets,
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

  const { data, headers } = useDataApi<{
    results: APIModel[];
  }>(url);

  const prevViewMode = useRef<ViewMode>();
  useEffect(() => {
    prevViewMode.current = viewMode;
  });

  // redirect to entry directly when only 1 result and query marked as "direct"
  useEffect(() => {
    if (direct && metaData.total === 1 && allResults.length === 1) {
      const uniqueItem = allResults[0];
      let accession = '';
      if ('primaryAccession' in uniqueItem) {
        // UniProtKB
        accession = uniqueItem.primaryAccession;
      } else if ('representativeId' in uniqueItem) {
        // UniRef
        accession = uniqueItem.id;
      } else if ('uniParcId' in uniqueItem) {
        // UniParc
        accession = uniqueItem.uniParcId;
      }
      history.replace({
        pathname: generatePath(EntryLocations[namespace], { accession }),
      });
    }
  }, [history, direct, metaData, allResults, namespace]);

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
      total: +(headers?.['x-totalrecords'] || 0),
      nextUrl: getNextUrlFromResponse(headers?.link),
    }));
  }, [data, headers]);

  if (allResults.length === 0 || prevViewMode.current !== viewMode) {
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
        getIdKey={getIdKey(namespace)}
        data={allResults}
        dataRenderer={(dataItem: APIModel) => {
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
            // case Namespace.uniparc: {
            //   const data = dataItem as UniParcAPIModel;
            //   return (
            //     <UniParcCard
            //       data={data}
            //       selected={selectedEntries.includes(data.uniParcId)}
            //       handleEntrySelection={handleEntrySelection}
            //     />
            //   );
            // }
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
            render: (row: APIModel) => {
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
        getIdKey={getIdKey(namespace)}
        columns={columnsToDisplay}
        data={allResults}
        selectable
        selected={selectedEntries}
        onSelect={handleEntrySelection}
        onHeaderClick={updateColumnSort}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={<Loader />}
      />
    );
  }
  return <div className="results-view">{dataView}</div>;
};

export default ResultsView;
