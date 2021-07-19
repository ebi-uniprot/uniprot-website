import { useMemo, ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useDataApi from './useDataApi';
import useNS from './useNS';
import useLocalStorage from './useLocalStorage';

import {
  getLocationObjForParams,
  getParamsFromURL,
  getSortableColumnToSortColumn,
} from '../../uniprotkb/utils/resultsUtils';
import apiUrls from '../config/apiUrls';
import { SearchResultsLocations } from '../../app/config/urls';
import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../uniprotkb/adapters/uniProtkbConverter';

import { mainNamespaces, Namespace } from '../types/namespaces';
import { Column, nsToDefaultColumns } from '../config/columns';
import {
  ReceivedFieldData,
  SortDirection,
} from '../../uniprotkb/types/resultsTypes';
import { APIModel } from '../types/apiModel';
import { SortableColumn } from '../../uniprotkb/types/columnTypes';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';
import { TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import { CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';
import UniProtKBColumnConfiguration from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import UniRefColumnConfiguration from '../../uniref/config/UniRefColumnConfiguration';
import UniParcColumnConfiguration from '../../uniparc/config/UniParcColumnConfiguration';
import ProteomesColumnConfiguration from '../../proteomes/config/ProteomesColumnConfiguration';
import TaxonomyColumnConfiguration from '../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import KeywordsColumnConfiguration from '../../supporting-data/keywords/config/KeywordsColumnConfiguration';
import CitationsColumnConfiguration from '../../supporting-data/citations/config/CitationsColumnConfiguration';
import DiseasesColumnConfiguration from '../../supporting-data/diseases/config/DiseasesColumnConfiguration';
import DatabaseColumnConfiguration from '../../supporting-data/database/config/DatabaseColumnConfiguration';
import LocationsColumnConfiguration from '../../supporting-data/locations/config/LocationsColumnConfiguration';
import {
  IDMappingColumn,
  IdMappingColumnConfiguration,
} from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { MappingAPIModel } from '../../tools/id-mapping/types/idMappingSearchResults';

export type ColumnDescriptor<Datum = APIModel> = {
  name: string;
  label: ReactNode;
  render: (row: Datum) => ReactNode;
  sortable?: true;
  sorted?: SortDirection;
};

const convertRow = (row: APIModel, namespace: Namespace | 'id-mapping') => {
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
    case Namespace.idmapping:
      return row as MappingAPIModel;
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unrecognised namespace: "${namespace}"`);
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
  [Namespace.proteomes]: ProteomesColumnConfiguration,
  [Namespace.taxonomy]: TaxonomyColumnConfiguration,
  [Namespace.keywords]: KeywordsColumnConfiguration,
  [Namespace.citations]: CitationsColumnConfiguration,
  [Namespace.diseases]: DiseasesColumnConfiguration,
  [Namespace.database]: DatabaseColumnConfiguration,
  [Namespace.locations]: LocationsColumnConfiguration,
  [Namespace.idmapping]: IdMappingColumnConfiguration,
};

export const getColumnsToDisplay = (
  namespace: Namespace,
  columns: Column[] | undefined,
  sortableColumnToSortColumn?: Map<Column, string>,
  sortColumn?: SortableColumn,
  sortDirection?: SortDirection
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
      if (sortableColumnToSortColumn?.has(columnName)) {
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

const useColumns = (
  namespaceOverride?: Namespace,
  displayIdMappingColumns = false
): [ColumnDescriptor[], (columnName: string) => void] => {
  const history = useHistory();
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const location = useLocation();
  const [usersColumns] = useLocalStorage<Column[]>(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns(namespace)
  );

  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortColumn, sortDirection } =
    getParamsFromURL(queryParamFromUrl);

  const { data: dataResultFields, loading } = useDataApi<ReceivedFieldData>(
    // No configure endpoint for supporting data
    namespace !== 'id-mapping' && mainNamespaces.has(namespace)
      ? apiUrls.resultsFields(namespace)
      : null
  );

  const sortableColumnToSortColumn = useMemo(
    () => getSortableColumnToSortColumn(loading ? undefined : dataResultFields),
    [loading, dataResultFields]
  );

  const columns = useMemo(
    () =>
      getColumnsToDisplay(
        namespace,
        displayIdMappingColumns && namespace !== Namespace.idmapping
          ? [IDMappingColumn.from, ...usersColumns]
          : usersColumns,
        sortableColumnToSortColumn,
        sortColumn,
        sortDirection
      ),
    [
      namespace,
      usersColumns,
      sortColumn,
      sortDirection,
      sortableColumnToSortColumn,
      displayIdMappingColumns,
    ]
  );

  const updateColumnSort = (columnName: string) => {
    // No sorting for id mapping
    if (namespace === Namespace.idmapping) {
      return;
    }
    const newSortColumn = sortableColumnToSortColumn.get(columnName as Column);
    if (!newSortColumn) {
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
        sortColumn: newSortColumn,
        sortDirection: updatedSortDirection,
      })
    );
  };
  return [columns, updateColumnSort];
};

export default useColumns;
