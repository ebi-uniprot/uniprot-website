import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { partition } from 'lodash-es';

import useLocalStorage from './useLocalStorage';
import useNS from './useNS';

import { Column, nsToDefaultColumns } from '../config/columns';
import { parseQueryString } from '../utils/url';

import { ColumnConfigurations } from './useColumns';
import { Namespace } from '../types/namespaces';
import { IDMappingColumn } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { InvalidParamValue } from '../../uniprotkb/utils/resultsUtils';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';

type UseColumnNameArgs = {
  namespaceOverride?: Namespace | undefined;
  displayIdMappingColumns?: boolean;
  getSequence?: boolean;
  displayPeptideSearchMatchColumns?: boolean;
};

type UseColumnNameReturn = {
  columnNames: Column[];
  setColumnNames: Dispatch<SetStateAction<Column[]>>;
  fromUrl: boolean;
  invalidUrlColumnNames: InvalidParamValue | undefined;
};

const useColumnNames = ({
  namespaceOverride,
  displayIdMappingColumns,
  getSequence,
  displayPeptideSearchMatchColumns,
}: UseColumnNameArgs = {}): UseColumnNameReturn => {
  const ns = useNS(namespaceOverride) || Namespace.uniprotkb;
  const { fields: columnNamesFromUrl } = parseQueryString(useLocation().search);
  const [columnNamesFromStorage, setColumnNames] = useLocalStorage<Column[]>(
    `table columns for ${ns}` as const,
    nsToDefaultColumns(ns)
  );

  let columnNames: Column[] = columnNamesFromStorage;
  let invalidUrlColumnNames: InvalidParamValue | undefined;
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
      invalidUrlColumnNames = { parameter: 'columns', value: invalidColumns };
    }
    columnNames = validColumns as Column[];
    fromUrl = true;
  }
  if (displayIdMappingColumns && ns !== Namespace.idmapping) {
    columnNames = [IDMappingColumn.from, ...columnNames];
  }

  if (displayPeptideSearchMatchColumns && ns === Namespace.uniprotkb) {
    // Make this the second column, right after the accession
    const accessionIndex = columnNames.indexOf(UniProtKBColumn.accession);
    columnNames = [
      ...columnNames.slice(0, accessionIndex + 1),
      UniProtKBColumn.match,
      ...columnNames.slice(accessionIndex + 1),
    ];
  }

  if (getSequence && !columnNames.includes(UniProtKBColumn.sequence)) {
    columnNames = [UniProtKBColumn.sequence, ...columnNames];
  }

  return { columnNames, setColumnNames, fromUrl, invalidUrlColumnNames };
};

export default useColumnNames;
