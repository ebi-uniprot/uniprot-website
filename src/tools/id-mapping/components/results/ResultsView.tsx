import { useState, useEffect, useRef, useMemo, FC, ReactNode } from 'react';
import { DataTableWithLoader, Loader } from 'franklin-sites';
// import { useLocation } from 'react-router-dom';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../../../uniprotkb/adapters/uniProtkbConverter';
import {
  UniRefAPIModel,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';

// columns for table views
import UniProtKBColumnConfiguration from '../../../../uniprotkb/config/UniProtKBColumnConfiguration';
import UniRefColumnConfiguration from '../../../../uniref/config/UniRefColumnConfiguration';
import UniParcColumnConfiguration from '../../../../uniparc/config/UniParcColumnConfiguration';

import useDataApi from '../../../../shared/hooks/useDataApi';
import usePrefetch from '../../../../shared/hooks/usePrefetch';
import useUserPreferences from '../../../../shared/hooks/useUserPreferences';

import toolsURLs from '../../../config/urls';

import getNextURLFromHeaders from '../../../../shared/utils/getNextURLFromHeaders';
// import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
// import { getEntryPathFor } from '../../../../app/config/urls';
import idMappingConverter from '../../adapters/idMappingConverter';

import { Namespace } from '../../../../shared/types/namespaces';
import { SortDirection } from '../../../../uniprotkb/types/resultsTypes';
// import { SortableColumn } from '../../../../uniprotkb/types/columnTypes';
import { Column, nsToDefaultColumns } from '../../../../shared/config/columns';
import { JobTypes } from '../../../types/toolsJobTypes';
import { IDMappingNamespace } from '../../types/idMappingServerParameters';
import {
  IDMappingSearchResults,
  MappingFlat,
  MappingTo,
} from '../../types/idMappingSearchResults';
import { IDMappingColumn } from '../../types/columns';

// import './styles/warning.scss';
// import './styles/results-view.scss';

type APIModel = UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;

const convertRow = (row: APIModel, namespace: Namespace) => {
  switch (namespace) {
    // Main namespaces
    case Namespace.uniprotkb:
      return uniProtKbConverter(row as UniProtkbAPIModel);
    case Namespace.uniref:
      return row as UniRefLiteAPIModel;
    case Namespace.uniparc:
      return row as UniParcAPIModel;
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unrecognised namespace: "${namespace}"`);
      return null;
  }
};

// Note: modify original
export const getIdKeyFor = (
  namespace: IDMappingNamespace
): ((data: MappingFlat) => string) => {
  switch (namespace) {
    // Main namespaces
    case Namespace.uniprotkb:
      return (data) => (data as UniProtkbAPIModel).primaryAccession;
    case Namespace.uniref:
      return (data) => (data as UniRefAPIModel).id;
    case Namespace.uniparc:
      return (data) => (data as UniParcAPIModel).uniParcId;
    default:
      // the data is an ID
      // Note: we might need a composite key of "from to"
      return (data) => (data as MappingTo).to;
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

type ColumnDescriptor = {
  name: string;
  label: ReactNode;
  render: (row: MappingFlat) => ReactNode;
  sortable?: true;
  sorted?: SortDirection;
};
const getColumnsToDisplay = (
  namespace: Namespace | undefined,
  columns: Column[]
  // sortableColumnToSortColumn: Map<Column, string>,
  // sortColumn: SortableColumn,
  // sortDirection: SortDirection
): ColumnDescriptor[] =>
  columns.map((columnName) => {
    const columnConfig =
      namespace && ColumnConfigurations[namespace]?.get(columnName);
    if (columnConfig && namespace) {
      const columnDescriptor = {
        label: columnConfig.label,
        name: columnName,
        render: (row: MappingFlat) =>
          columnConfig.render(convertRow(row as APIModel, namespace)),
      };
      // if (sortableColumnToSortColumn.has(columnName)) {
      //   return {
      //     ...columnDescriptor,
      //     sortable: true,
      //     sorted: columnName === sortColumn ? sortDirection : undefined,
      //   };
      // }
      return columnDescriptor;
    }
    // Note this could live in ../config/IDMappingColumnConfiguration
    if (columnName === IDMappingColumn.from) {
      return {
        name: columnName,
        label: 'from',
        render: (row: MappingFlat) => row.from,
      };
    }
    if (columnName === IDMappingColumn.to) {
      return {
        name: columnName,
        label: 'to',
        render: (row: MappingFlat) => (row as MappingTo).to,
      };
    }
    return {
      label: columnName,
      name: columnName,
      render: () => (
        <div className="warning">{`${columnName} has no config yet`}</div>
      ),
    };
  });

type ResultsTableProps = {
  selectedEntries: string[];
  handleEntrySelection: (rowId: string) => void;
  // sortableColumnToSortColumn: Map<Column, string>;
  // For ID Mapping/Peptide search
  jobID: string;
  idMappingNamespace: IDMappingNamespace;
  jobType: JobTypes;
};

const ResultsView: FC<ResultsTableProps> = ({
  selectedEntries,
  handleEntrySelection,
  // sortableColumnToSortColumn,
  jobID,
  idMappingNamespace,
  jobType,
}) => {
  const [namespaceColumns] = useUserPreferences<Column[]>(
    idMappingNamespace && (`table columns for ${idMappingNamespace}` as const),
    idMappingNamespace ? nsToDefaultColumns[idMappingNamespace] : []
  );

  const columns = [
    IDMappingColumn.from,
    IDMappingColumn.to, // Don't add if namespaceColumns is not empty
    ...namespaceColumns,
  ];

  const prevColumns = useRef<Column[] | undefined>(columns);
  useEffect(() => {
    // will set it *after* the current render
    prevColumns.current = columns;
  });

  //   const history = useHistory();
  // const location = useLocation();

  // const { search: queryParamFromUrl } = location;
  // const {
  //   query,
  //   selectedFacets,
  //   sortColumn,
  //   sortDirection,
  //   direct,
  // } = getParamsFromURL(queryParamFromUrl);

  const urls = toolsURLs(jobType);

  const initialApiUrl = urls.resultUrl(jobID, {});

  //   const initialApiUrl = getAPIQueryUrl({
  //     idMappingNamespace,
  //     query,
  //     // TODO: Do similar things for the rest of namespaces
  //     columns,
  //     selectedFacets,
  //     // Not really interested in the facets here, so try to reduce payload
  //     facets: null,
  //     sortColumn,
  //     sortDirection,
  //     jobID,
  //     jobType,
  //   });
  const [url, setUrl] = useState(initialApiUrl);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({ total: 0, nextUrl: undefined }));
  usePrefetch(metaData.nextUrl);
  const [allResults, setAllResults] = useState<MappingFlat[]>([]);

  useEffect(() => {
    setAllResults([]);
    setMetaData({ total: 0, nextUrl: undefined });
    setUrl(initialApiUrl);
  }, [initialApiUrl]);

  const {
    data,
    loading,
    progress,
    headers,
  } = useDataApi<IDMappingSearchResults>(url);

  // NOTE: probably not needed
  // const [getIdKey, getEntryPathForEntry] = useMemo(() => {
  const [getIdKey] = useMemo(() => {
    const getIdKey = getIdKeyFor(idMappingNamespace);
    //   const getEntryPath = getEntryPathFor(idMappingNamespace);
    //   return [getIdKey, (entry: Mapping) => getEntryPath(getIdKey(entry))];
    return [getIdKey];
  }, [idMappingNamespace]);

  // redirect to entry directly when only 1 result and query marked as "direct"
  //   useEffect(() => {
  //     if (direct && metaData.total === 1 && allResults.length === 1) {
  //       const uniqueItem = allResults[0];
  //       history.replace(getEntryPathForEntry(uniqueItem));
  //     }
  //   }, [history, direct, metaData, allResults, getEntryPathForEntry]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    // TODO the generic should be based on the namespace
    const transformedData = idMappingConverter(results, idMappingNamespace);
    setAllResults((allRes) => [...allRes, ...transformedData]);
    setMetaData(() => ({
      total: +(headers?.['x-totalrecords'] || 0),
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers, idMappingNamespace]);

  if (
    // if loading the first page of results
    loading &&
    url === initialApiUrl
    // ||
    // or we just switched namespace (a bit hacky workaround to force unmount)
    // prevNamespace.current !== idMappingNamespace ||
    // or we just changed the displayed columns (hacky too...)
    // prevColumns.current !== columns
  ) {
    return <Loader progress={progress} />;
  }

  const { total, nextUrl } = metaData;

  const handleLoadMoreRows = () => nextUrl && setUrl(nextUrl);

  //   const updateColumnSort = (columnName: string) => {
  // const sortColumn = sortableColumnToSortColumn.get(columnName as Column);
  // if (!sortColumn) {
  //   return;
  // }

  // // Change sort direction
  // const updatedSortDirection =
  //   !sortDirection || sortDirection === SortDirection.descend
  //     ? SortDirection.ascend
  //     : SortDirection.descend;

  // history.push(
  //   getLocationObjForParams({
  //     pathname: SearchResultsLocations[idMappingNamespace],
  //     query,
  //     selectedFacets,
  //     sortColumn,
  //     sortDirection: updatedSortDirection,
  //   })
  // );
  //   };

  const hasMoreData = total > allResults.length;
  const loadComponent = (
    <Loader progress={progress !== 1 ? progress : undefined} />
  );

  const columnsToDisplay = getColumnsToDisplay(
    idMappingNamespace,
    columns
    // sortableColumnToSortColumn,
    // sortColumn,
    // sortDirection
  );

  return (
    <div className="results-view">
      <DataTableWithLoader
        getIdKey={getIdKey}
        columns={columnsToDisplay}
        data={allResults}
        selected={selectedEntries}
        onSelectRow={handleEntrySelection}
        // onHeaderClick={updateColumnSort}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={loadComponent}
      />
    </div>
  );
};

export default ResultsView;
