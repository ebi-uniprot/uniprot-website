import { Namespace } from '../../shared/types/namespaces';
import { UniRefColumn } from '../../uniref/config/UniRefColumnConfiguration';
import { UniProtKBColumn } from '../types/columnTypes';
import { FieldData, ColumnSelectTab } from '../types/resultsTypes';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  // TODO delete this once column selection is updated
  tableColumns: Partial<Record<Namespace, UniProtKBColumn[] | UniRefColumn[]>>;
  fields: {
    data: FieldData;
    isFetching: boolean;
  };
};

export const uniProtKBdefaultTableColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.id,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.geneNames,
  UniProtKBColumn.organismName,
];

const resultsInitialState = {
  tableColumns: {
    [Namespace.uniprotkb]: uniProtKBdefaultTableColumns,
  },
  fields: {
    data: {
      [ColumnSelectTab.data]: [],
      [ColumnSelectTab.links]: [],
    },
    isFetching: false,
  },
};

export default resultsInitialState;
