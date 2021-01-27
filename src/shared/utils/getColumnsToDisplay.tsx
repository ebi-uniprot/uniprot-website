import { SortableColumn } from '../../uniprotkb/types/columnTypes';
import { SortDirection } from '../../uniprotkb/types/resultsTypes';
import { Column } from '../config/columns';
import { Namespace } from '../types/namespaces';
import { UniProtKBColumnConfiguration } from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import UniRefColumnConfiguration from '../../uniref/config/UniRefColumnConfiguration';
import UniParcColumnConfiguration from '../../uniparc/config/UniParcColumnConfiguration';
import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';

export type APIModel = UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;

// TODO: create a "Column" type to cover the different column types
// and a Column renderer type with label: string and a render definition.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColumnConfigurations: Partial<Record<Namespace, Map<any, any>>> = {
  [Namespace.uniprotkb]: UniProtKBColumnConfiguration,
  [Namespace.uniref]: UniRefColumnConfiguration,
  [Namespace.uniparc]: UniParcColumnConfiguration,
};

const convertRow = (row: APIModel, namespace: Namespace) => {
  switch (namespace) {
    case Namespace.uniprotkb:
      return uniProtKbConverter(row as UniProtkbAPIModel);
    case Namespace.uniref:
      return row as UniRefLiteAPIModel;
    case Namespace.uniparc:
      return row as UniParcAPIModel;
    default:
      return null;
  }
};

const getColumnsToDisplay = (
  namespace: Namespace,
  columns: Column[],
  sortableColumnToSortColumn: Map<Column, string>,
  sortColumn: SortableColumn,
  sortDirection: SortDirection
) =>
  columns.map((columnName) => {
    const columnConfig = ColumnConfigurations[namespace]?.get(columnName);
    if (columnConfig) {
      return {
        label: columnConfig.label,
        name: columnName,
        render: (row: APIModel) =>
          columnConfig.render(convertRow(row, namespace)),
        sortable: sortableColumnToSortColumn.has(columnName),
        sorted: columnName === sortColumn && sortDirection, // TODO this doesn't seem to update the view
      };
    }
    return {
      label: columnName,
      name: columnName,
      render: () => (
        <div className="warning">{`${columnName} has no config yet`}</div>
      ),
      sortable: false,
      sorted: false,
    };
  }) || [];

export default getColumnsToDisplay;
