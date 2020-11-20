import { Namespace } from '../types/namespaces';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import { defaultColumns as defaultUniProtKBColumns } from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import {
  UniRefColumn,
  defaultColumns as defaultUniRefColumns,
} from '../../uniref/config/UniRefColumnConfiguration';

export type AllColumns = Array<UniProtKBColumn | UniRefColumn>;

const defaultColumns: Partial<Record<Namespace, AllColumns>> = {
  [Namespace.uniprotkb]: defaultUniProtKBColumns,
  [Namespace.uniref]: defaultUniRefColumns,
};

export default defaultColumns;
