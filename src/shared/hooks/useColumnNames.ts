import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { partition } from 'lodash-es';
import qs from 'query-string';

import useLocalStorage from './useLocalStorage';
import useNS from './useNS';

import { Column, nsToDefaultColumns } from '../config/columns';
import { ColumnConfigurations } from './useColumns';

import { Namespace } from '../types/namespaces';
import { IDMappingColumn } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { InvalidParamValue } from '../../uniprotkb/utils/resultsUtils';

const useColumnNames = (
  namespaceOverride: Namespace | undefined,
  displayIdMappingColumns?: boolean
): [
  Column[],
  Dispatch<SetStateAction<Column[]>>,
  boolean,
  InvalidParamValue | undefined
] => {
  const ns = useNS(namespaceOverride) || Namespace.uniprotkb;
  const { fields: columnNamesFromUrl } = qs.parse(useLocation().search);
  const [columnNamesFromStorage, setColumnNamesFromStorage] = useLocalStorage<
    Column[]
  >(`table columns for ${ns}` as const, nsToDefaultColumns(ns));

  let columnNames: Column[] = columnNamesFromStorage;
  let error: InvalidParamValue | undefined;
  let fromUrl = false;

  if (columnNamesFromUrl && ns && ns !== Namespace.idmapping) {
    const columnsAsArray = Array.isArray(columnNamesFromUrl)
      ? columnNamesFromUrl
      : columnNamesFromUrl?.split(',');
    const columnConfig = ColumnConfigurations[ns];
    const columns = new Set(columnConfig?.keys());
    const [validColumns, invalidColumns] = partition(columnsAsArray, (column) =>
      columns.has(column)
    );
    if (invalidColumns?.length) {
      error = { parameter: 'columns', value: invalidColumns };
    }
    columnNames = validColumns as Column[];
    fromUrl = true;
  }
  if (displayIdMappingColumns && ns !== Namespace.idmapping) {
    columnNames = [IDMappingColumn.from, ...columnNames];
  }
  return [columnNames, setColumnNamesFromStorage, fromUrl, error];
};

export default useColumnNames;
