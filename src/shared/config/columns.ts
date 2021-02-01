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
import {
  UniParcColumn,
  defaultColumns as defaultUniParcColumns,
  primaryKeyColumn as primaryKeyColumnUniParc,
} from '../../uniparc/config/UniParcColumnConfiguration';
import {
  ProteomesColumn,
  defaultColumns as defaultProteomesColumns,
  primaryKeyColumn as primaryKeyColumnProteomes,
} from '../../proteomes/config/ProteomesColumnConfiguration';

export type Column =
  | UniProtKBColumn
  | UniRefColumn
  | UniParcColumn
  | ProteomesColumn;

// TODO when all namespaces have been implemented remove the Partial utility type
export const nsToDefaultColumns: Partial<Record<Namespace, Column[]>> = {
  [Namespace.uniprotkb]: defaultUniProtKBColumns,
  [Namespace.uniref]: defaultUniRefColumns,
  [Namespace.uniparc]: defaultUniParcColumns,
  [Namespace.proteomes]: defaultProteomesColumns,
};

// TODO when all namespaces have been implemented remove the Partial utility type
export const nsToPrimaryKeyColumn: Partial<Record<Namespace, Column>> = {
  [Namespace.uniprotkb]: primaryKeyColumnUniProtKB,
  [Namespace.uniref]: primaryKeyColumnUniRef,
  [Namespace.uniparc]: primaryKeyColumnUniParc,
  [Namespace.proteomes]: primaryKeyColumnProteomes,
};
