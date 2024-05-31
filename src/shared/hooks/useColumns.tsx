import {
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BinIcon, Button } from 'franklin-sites';

import useDataApi from './useDataApi';
import useNS from './useNS';
import useColumnNames from './useColumnNames';
import useDatabaseInfoMaps from './useDatabaseInfoMaps';

import apiUrls from '../config/apiUrls/apiUrls';
import { getIdKeyForData } from '../utils/getIdKey';
import {
  getParamsFromURL,
  getSortableColumnToSortColumn,
  getLocationObjForParams,
} from '../../uniprotkb/utils/resultsUtils';
import * as logging from '../utils/logging';

import { mainNamespaces, Namespace } from '../types/namespaces';
import { Column, ColumnConfigurations } from '../config/columns';
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

import { DatabaseInfoMaps } from '../../uniprotkb/utils/database';

import { MappingAPIModel } from '../../tools/id-mapping/types/idMappingSearchResults';
import { Basket } from './useBasket';
import { showTooltip } from '../utils/tooltip';

export type ColumnDescriptor<Datum = APIModel> = {
  name: string;
  label: ReactNode;
  render: (row: Datum) => ReactNode;
  sortable?: true;
  sorted?: SortDirection;
  tooltip?: ReactNode;
};

type CommonColumn<Datum> = {
  label?: ReactNode;
  name: string;
  render: (datum: Datum) => ReactNode;
  tooltip?: ReactNode;
  width?: string;
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
        render: (row: APIModel) => {
          try {
            return columnConfig.render(
              convertRow(row, namespace, databaseInfoMaps)
            );
          } catch (error) {
            if (!('inactiveReason' in row)) {
              logging.warn(
                `unable to render "${columnName}" in "${namespace}" for entry "${getIdKeyForData(
                  row
                )(row)}" `
              );
            } // otherwise, OK to fail, it's an inactive entry
            return null;
          }
        },
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
  setSelectedEntries?: Dispatch<SetStateAction<string[]>>,
  displayPeptideSearchMatchColumns?: boolean
): [
  ColumnDescriptor[] | undefined,
  ((columnName: string) => void) | null,
  MutableRefObject<HTMLDivElement>
] => {
  const history = useHistory();
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const location = useLocation();
  const { columnNames } = useColumnNames({
    namespaceOverride,
    displayIdMappingColumns,
    displayPeptideSearchMatchColumns,
  });
  const databaseInfoMaps = useDatabaseInfoMaps();
  const tooltipOnHoverRef = useRef<HTMLDivElement>(null);
  const { search: queryParamFromUrl } = location;
  const [{ query, selectedFacets, sortColumn, sortDirection }] =
    getParamsFromURL(queryParamFromUrl);

  const { data: dataResultFields, loading } = useDataApi<ReceivedFieldData>(
    // For now, assume no configure endpoint for supporting data
    // TODO: change this when the backend is fixed https://www.ebi.ac.uk/panda/jira/browse/TRM-26571
    namespace !== 'id-mapping' && mainNamespaces.has(namespace)
      ? apiUrls.configure.resultsFields(namespace)
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
      const removeColumn: ColumnDescriptor<APIModel> = {
        name: 'remove',
        label: null,
        render: (datum) => (
          <Button
            variant="tertiary"
            onClick={() => {
              const id = getIdKeyForData(datum)(datum);
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

  useEffect(() => {
    // Detect mouseover events on column header and show tooltip
    const onHover = (e: MouseEvent) => {
      const eventTarget = e.target as HTMLElement;
      const { columnName } = eventTarget.dataset;
      if (columns && columnName) {
        const info = columns.find(({ name }) => name === columnName);
        if (info?.tooltip) {
          showTooltip(0, 0, info.tooltip, eventTarget);
        }
      }
    };
    const wrapper = tooltipOnHoverRef.current;
    wrapper?.addEventListener('mouseover', onHover);
    return () => wrapper?.removeEventListener('mouseover', onHover);
  });

  const updateColumnSort = useCallback(
    (columnName: string) => {
      if (
        // No sorting for id mapping
        namespace === Namespace.idmapping ||
        // No sorting for unisave
        namespace === Namespace.unisave
      ) {
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

      // TODO: this changes the URL from encoded to decoded which is different to the facet behavior
      history.push(
        // eslint-disable-next-line uniprot-website/use-config-location
        getLocationObjForParams({
          pathname: history.location.pathname,
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
  return [columns, updateColumnSort, tooltipOnHoverRef];
};

export default useColumns;
