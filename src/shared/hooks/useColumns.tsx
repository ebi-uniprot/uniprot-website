import {
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BinIcon, Button } from 'franklin-sites';

import useDataApi from './useDataApi';
import useNS from './useNS';
import useDatabaseInfoMaps from './useDatabaseInfoMaps';
import useColumnNames from './useColumnNames';

import apiUrls from '../config/apiUrls';
import { SearchResultsLocations } from '../../app/config/urls';
import { getIdKeyFor } from '../utils/getIdKeyForNamespace';
import {
  getParamsFromURL,
  getSortableColumnToSortColumn,
  getLocationObjForParams,
} from '../../uniprotkb/utils/resultsUtils';
import * as logging from '../utils/logging';

import { mainNamespaces, Namespace } from '../types/namespaces';
import { Column } from '../config/columns';
import {
  ReceivedFieldData,
  SortDirection,
} from '../../uniprotkb/types/resultsTypes';
import { APIModel } from '../types/apiModel';
import { SortableColumn } from '../../uniprotkb/types/columnTypes';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';

import { TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import { CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';

import { UniRuleAPIModel } from '../../automatic-annotations/unirule/adapters/uniRuleConverter';
import { ARBAAPIModel } from '../../automatic-annotations/arba/adapters/arbaConverter';

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

import UniRuleColumnConfiguration from '../../automatic-annotations/unirule/config/UniRuleColumnConfiguration';
import ARBAColumnConfiguration from '../../automatic-annotations/arba/config/ARBAColumnConfiguration';

import { IdMappingColumnConfiguration } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';

import { MappingAPIModel } from '../../tools/id-mapping/types/idMappingSearchResults';
import { Basket } from './useBasket';
import { DatabaseInfoMaps } from '../../uniprotkb/utils/database';

export type ColumnDescriptor<Datum = APIModel> = {
  name: string;
  label: ReactNode;
  render: (row: Datum) => ReactNode;
  sortable?: true;
  sorted?: SortDirection;
};

const convertRow = (
  row: APIModel,
  namespace: Namespace | 'id-mapping',
  databaseInfoMaps?: DatabaseInfoMaps | null
) => {
  switch (namespace) {
    // Main namespaces
    case Namespace.uniprotkb:
      return (
        databaseInfoMaps &&
        uniProtKbConverter(row as UniProtkbAPIModel, databaseInfoMaps)
      );
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
    case Namespace.unirule:
      return row as UniRuleAPIModel;
    case Namespace.arba:
      return row as ARBAAPIModel;
    case Namespace.idmapping:
      return row as MappingAPIModel;
    default:
      logging.warn(`Unrecognised namespace: "${namespace}"`);
      return null;
  }
};

// TODO: create a "Column" type to cover the different column types
// and a Column renderer type with label: string and a render definition.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ColumnConfigurations: Partial<Record<Namespace, Map<any, any>>> = {
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
  [Namespace.unirule]: UniRuleColumnConfiguration,
  [Namespace.arba]: ARBAColumnConfiguration,
  [Namespace.idmapping]: IdMappingColumnConfiguration,
};

export const getColumnsToDisplay = (
  namespace: Namespace,
  columns: Column[] | undefined,
  sortableColumnToSortColumn?: Map<Column, string>,
  sortColumn?: SortableColumn,
  sortDirection?: SortDirection,
  databaseInfoMaps?: DatabaseInfoMaps | null
): ColumnDescriptor[] =>
  columns?.map((columnName) => {
    const columnConfig = ColumnConfigurations[namespace]?.get(columnName);
    if (columnConfig) {
      const columnDescriptor = {
        label: columnConfig.label,
        name: columnName,
        tooltip: columnConfig.tooltip,
        render: (row: APIModel) =>
          columnConfig.render(convertRow(row, namespace, databaseInfoMaps)),
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
      render: () => {
        const message = `${columnName} has no config yet`;
        logging.warn(message);
        return <div className="warning">{message}</div>;
      },
    };
  }) || [];

const useColumns = (
  namespaceOverride?: Namespace,
  displayIdMappingColumns?: boolean,
  basketSetter?: Dispatch<SetStateAction<Basket>>,
  columnsOverride?: ColumnDescriptor[],
  setSelectedEntries?: Dispatch<SetStateAction<string[]>>
): [ColumnDescriptor[] | undefined, ((columnName: string) => void) | null] => {
  const history = useHistory();
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const location = useLocation();
  const { columnNames } = useColumnNames(
    namespaceOverride,
    displayIdMappingColumns
  );
  const databaseInfoMaps = useDatabaseInfoMaps();

  const { search: queryParamFromUrl } = location;
  const [{ query, selectedFacets, sortColumn, sortDirection }] =
    getParamsFromURL(queryParamFromUrl);

  const { data: dataResultFields, loading } = useDataApi<ReceivedFieldData>(
    // For now, assume no configure endpoint for supporting data
    // TODO: change this when the backend is fixed https://www.ebi.ac.uk/panda/jira/browse/TRM-26571
    namespace !== 'id-mapping' && mainNamespaces.has(namespace)
      ? apiUrls.resultsFields(namespace)
      : null
  );

  const sortableColumnToSortColumn = useMemo(
    () => getSortableColumnToSortColumn(loading ? undefined : dataResultFields),
    [loading, dataResultFields]
  );

  const columns = useMemo(() => {
    let columns = columnsOverride;
    if (!columns && databaseInfoMaps) {
      columns = getColumnsToDisplay(
        namespace,
        columnNames,
        sortableColumnToSortColumn,
        sortColumn,
        sortDirection,
        databaseInfoMaps
      );
    }
    // If in a basket view
    if (basketSetter) {
      const getIdKey = getIdKeyFor(namespace);
      const removeColumn: ColumnDescriptor<APIModel> = {
        name: 'remove',
        label: null,
        render: (datum) => (
          <Button
            variant="tertiary"
            onClick={() => {
              const id = getIdKey(datum);
              basketSetter((currentBasket) => {
                const basketSubset = new Set(currentBasket.get(namespace));
                basketSubset?.delete(id);
                return new Map([
                  // other namespaces, untouched
                  ...currentBasket,
                  [namespace, basketSubset],
                ]);
              });
              setSelectedEntries?.((selectedEntries) =>
                selectedEntries.filter((entry) => entry !== id)
              );
            }}
          >
            <BinIcon width="1.5em" />
          </Button>
        ),
      };
      // Add a remove column at the end
      return [...(columns || []), removeColumn];
    }
    return columns;
  }, [
    columnsOverride,
    databaseInfoMaps,
    basketSetter,
    namespace,
    columnNames,
    sortableColumnToSortColumn,
    sortColumn,
    sortDirection,
    setSelectedEntries,
  ]);

  const updateColumnSort = useCallback(
    (columnName: string) => {
      // No sorting for id mapping
      if (namespace === Namespace.idmapping) {
        return;
      }
      const newSortColumn = sortableColumnToSortColumn.get(
        columnName as Column
      );
      if (!newSortColumn) {
        return;
      }

      // Change sort direction
      const updatedSortDirection =
        !sortDirection || sortDirection === SortDirection.descend
          ? SortDirection.ascend
          : SortDirection.descend;

      // TODO: this changes the URL from encoded to decoded which is different to the faucet behavior
      history.push(
        getLocationObjForParams({
          pathname: SearchResultsLocations[namespace],
          query,
          selectedFacets,
          sortColumn: newSortColumn,
          sortDirection: updatedSortDirection,
        })
      );
    },
    [
      history,
      namespace,
      query,
      selectedFacets,
      sortDirection,
      sortableColumnToSortColumn,
    ]
  );
  return [columns, updateColumnSort];
};

export default useColumns;
