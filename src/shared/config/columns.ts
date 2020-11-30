import { Namespace } from '../types/namespaces';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import {
  defaultColumns as defaultUniProtKBColumns,
  mustHave as mustHaveUniProtKB,
} from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import {
  UniRefColumn,
  defaultColumns as defaultUniRefColumns,
  mustHave as mustHaveUniRef,
} from '../../uniref/config/UniRefColumnConfiguration';

export type Column = UniProtKBColumn | UniRefColumn;

export const nsToDefaultColumns: Partial<Record<Namespace, Column[]>> = {
  [Namespace.uniprotkb]: defaultUniProtKBColumns,
  [Namespace.uniref]: defaultUniRefColumns,
};

export const nsToMustHaveColumns: Partial<Record<Namespace, Column[]>> = {
  [Namespace.uniprotkb]: mustHaveUniProtKB,
  [Namespace.uniref]: mustHaveUniRef,
};
