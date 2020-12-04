import { Namespace } from '../types/namespaces';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import {
  defaultColumns as defaultUniProtKBColumns,
  primaryKeyColumn as primaryKeyColumnUniProtKB,
} from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import {
  UniRefColumn,
  defaultColumns as defaultUniRefColumns,
  primaryKeyColumn as primaryKeyColumnUniRef,
} from '../../uniref/config/UniRefColumnConfiguration';

export type Column = UniProtKBColumn | UniRefColumn;

export const nsToDefaultColumns: Partial<Record<Namespace, Column[]>> = {
  [Namespace.uniprotkb]: defaultUniProtKBColumns,
  [Namespace.uniref]: defaultUniRefColumns,
};

export const nsToPrimaryKeyColumn: Partial<Record<Namespace, Column>> = {
  [Namespace.uniprotkb]: primaryKeyColumnUniProtKB,
  [Namespace.uniref]: primaryKeyColumnUniRef,
};
