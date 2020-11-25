import { defaultColumns, Column } from '../config/columns';
import useLocalStorage from '../hooks/useLocalStorage';
import { Namespace } from '../types/namespaces';

export const useTableColumnsFromLocalStorage = (namespace?: Namespace) =>
  useLocalStorage<Column[]>(
    `table columns for ${namespace}`,
    namespace ? defaultColumns[namespace] : []
  );
