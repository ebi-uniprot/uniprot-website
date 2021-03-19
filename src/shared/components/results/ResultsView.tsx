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
import ProteomesCard from '../../../proteomes/components/results/ProteomesCard';
import CitationCard from '../../../supporting-data/citations/components/results/CitationCard';
import LocationsCard from '../../../supporting-data/locations/components/results/LocationsCard';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';
import { TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../../supporting-data/keywords/adapters/keywordsConverter';
import {
  CitationsAPIModel,
  CitationXRefDB,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../../supporting-data/locations/adapters/locationsConverter';

import { getAPIQueryUrl } from '../../config/apiUrls';

// columns for table views
import UniProtKBColumnConfiguration from '../../../uniprotkb/config/UniProtKBColumnConfiguration';
import UniRefColumnConfiguration from '../../../uniref/config/UniRefColumnConfiguration';
import UniParcColumnConfiguration from '../../../uniparc/config/UniParcColumnConfiguration';
import ProteomesColumnConfiguration from '../../../proteomes/config/ProteomesColumnConfiguration';
import TaxonomyColumnConfiguration from '../../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import KeywordsColumnConfiguration from '../../../supporting-data/keywords/config/KeywordsColumnConfiguration';
import CitationsColumnConfiguration from '../../../supporting-data/citations/config/CitationsColumnConfiguration';
import DiseasesColumnConfiguration from '../../../supporting-data/diseases/config/DiseasesColumnConfiguration';
import DatabaseColumnConfiguration from '../../../supporting-data/database/config/DatabaseColumnConfiguration';
import LocationsColumnConfiguration from '../../../supporting-data/locations/config/LocationsColumnConfiguration';

import useDataApi from '../../hooks/useDataApi';
import useNS from '../../hooks/useNS';
import usePrefetch from '../../hooks/usePrefetch';
import useUserPreferences from '../../hooks/useUserPreferences';

import fieldsForUniProtKBCards from '../../../uniprotkb/config/UniProtKBCardConfiguration';

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
import { Column, nsToDefaultColumns } from '../../config/columns';
import { ViewMode } from './ResultsContainer';

import './styles/warning.scss';
import './styles/results-view.scss';

type APIModel =
  | UniProtkbAPIModel
  | UniRefLiteAPIModel
  | UniParcAPIModel
  | ProteomesAPIModel
  | TaxonomyAPIModel
  | KeywordsAPIModel
  | CitationsAPIModel
  | DiseasesAPIModel
  | DatabaseAPIModel
  | LocationsAPIModel;

const convertRow = (row: APIModel, namespace: Namespace) => {
  switch (namespace) {
    // Main namespaces
    case Namespace.uniprotkb:
      return uniProtKbConverter(row as UniProtkbAPIModel);
    case Namespace.uniref:
      return row as UniRefLiteAPIModel;
    case Namespace.uniparc:
      return row as UniParcAPIModel;
    case Namespace.proteomes:
      return row as ProteomesAPIModel;
    // Supporting data
    case Namespace.taxonomy:
      return row as TaxonomyAPIModel;
    case Namespace.keywords:
      return row as KeywordsAPIModel;
    case Namespace.citations:
      return row as CitationsAPIModel;
    case Namespace.diseases:
      return row as DiseasesAPIModel;
    case Namespace.database:
      return row as DatabaseAPIModel;
    case Namespace.locations:
      return row as LocationsAPIModel;
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unrecognised namespace: "${namespace}"`);
      return null;
  }
};

export const getIdKeyFor = (
  namespace: Namespace
): ((data: APIModel) => string) => {
  switch (namespace) {
    // Main namespaces
    case Namespace.uniprotkb:
      return (data) => (data as UniProtkbAPIModel).primaryAccession;
    case Namespace.uniref:
      return (data) => (data as UniRefLiteAPIModel).id;
    case Namespace.uniparc:
      return (data) => (data as UniParcAPIModel).uniParcId;
    case Namespace.proteomes:
      return (data) => (data as ProteomesAPIModel).id;
    // Supporting data
    case Namespace.taxonomy:
      return (data) => `${(data as TaxonomyAPIModel).taxonId}`;
    case Namespace.keywords:
      return (data) => (data as KeywordsAPIModel).keyword.id;
    case Namespace.citations:
      // TODO: find what are the citations' unique keys
      return (data) =>
        (data as CitationsAPIModel).citation.citationCrossReferences?.find(
          (xref) => xref.database === CitationXRefDB.PubMed
        )?.id || 'key <string to be removed eventually>';
    case Namespace.diseases:
      return (data) => (data as DiseasesAPIModel).id;
    case Namespace.database:
      return (data) => (data as DatabaseAPIModel).id;
    case Namespace.locations:
      return (data) => (data as LocationsAPIModel).id;
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
  [Namespace.taxonomy]: TaxonomyColumnConfiguration,
  [Namespace.keywords]: KeywordsColumnConfiguration,
  [Namespace.citations]: CitationsColumnConfiguration,
  [Namespace.diseases]: DiseasesColumnConfiguration,
  [Namespace.database]: DatabaseColumnConfiguration,
  [Namespace.locations]: LocationsColumnConfiguration,
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
    case Namespace.proteomes: {
      return (cardData) => (
        <ProteomesCard
          data={cardData as ProteomesAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.citations: {
      return (cardData) => (
        <CitationCard
          data={cardData as CitationsAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.locations: {
      return (cardData) => (
        <LocationsCard
          data={cardData as LocationsAPIModel}
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
  handleEntrySelection: (rowId: string) => void;
  sortableColumnToSortColumn: Map<Column, string>;
};

const ResultsView: FC<ResultsTableProps> = ({
  selectedEntries,
  handleEntrySelection,
  sortableColumnToSortColumn,
}) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const [viewMode] = useUserPreferences<ViewMode>('view-mode', ViewMode.CARD);
  const [columns] = useUserPreferences<Column[]>(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns[namespace]
  );

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

  let queryColumns = viewMode === ViewMode.CARD ? undefined : columns;
  if (viewMode === ViewMode.CARD) {
    // TODO: Do similar things for the rest of namespaces
    if (namespace === Namespace.uniprotkb) {
      queryColumns = fieldsForUniProtKBCards;
    }
  }

  const initialApiUrl = getAPIQueryUrl({
    namespace,
    query,
    // TODO: Do similar things for the rest of namespaces
    columns: queryColumns,
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

  const { data, loading, progress, headers } = useDataApi<{
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
    return <Loader progress={progress} />;
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
  const loadComponent = (
    <Loader progress={progress !== 1 ? progress : undefined} />
  );

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
          loaderComponent={loadComponent}
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
          loaderComponent={loadComponent}
        />
      )}
    </div>
  );
};

export default ResultsView;
