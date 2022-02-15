import { partition } from 'lodash-es';
import qs from 'query-string';
import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { IDMappingColumn } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { InvalidParamValues } from '../../uniprotkb/utils/resultsUtils';
import { Column, nsToDefaultColumns } from '../config/columns';
import { Namespace } from '../types/namespaces';
import { ColumnConfigurations } from './useColumns';
import useLocalStorage from './useLocalStorage';
import useNS from './useNS';

const useColumnNames = (
  displayIdMappingColumns?: boolean
): [
  Column[],
  Dispatch<SetStateAction<Column[]>>,
  boolean,
  InvalidParamValues | undefined
] => {
  const ns = useNS() || Namespace.uniprotkb;
  const { fields: columnNamesFromUrl } = qs.parse(useLocation().search);
  const [columnNamesFromStorage, setColumnNamesFromStorage] = useLocalStorage<
    Column[]
  >(`table columns for ${ns}` as const, nsToDefaultColumns(ns));

  let columnNames: Column[] = columnNamesFromStorage;
  let error: InvalidParamValues | undefined;
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
