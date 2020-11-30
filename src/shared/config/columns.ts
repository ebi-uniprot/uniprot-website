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
import {
  UniParcColumn,
  defaultColumns as defaultUniParcColumns,
  mustHave as mustHaveUniParc,
} from '../../uniparc/config/UniParcColumnConfiguration';

export type Column = UniProtKBColumn | UniRefColumn | UniParcColumn;

export const nsToDefaultColumns: Partial<Record<Namespace, Column[]>> = {
  [Namespace.uniprotkb]: defaultUniProtKBColumns,
  [Namespace.uniref]: defaultUniRefColumns,
  [Namespace.uniparc]: defaultUniParcColumns,
};

export const nsToMustHaveColumns: Partial<Record<Namespace, Column[]>> = {
  [Namespace.uniprotkb]: mustHaveUniProtKB,
  [Namespace.uniref]: mustHaveUniRef,
  [Namespace.uniparc]: mustHaveUniParc,
};
