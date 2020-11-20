import defaultTableColumns, { AllColumns } from '../config/defaultColumns';
import useLocalStorage from '../hooks/useLocalStorage';
import { Namespace } from '../types/namespaces';

export const useTableColumnsFromLocalStorage = (namespace?: Namespace) =>
  useLocalStorage<AllColumns>(
    `table columns for ${namespace}`,
    namespace ? defaultTableColumns[namespace] : []
  );
