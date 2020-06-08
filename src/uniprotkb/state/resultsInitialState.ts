import { Column } from '../types/columnTypes';
import { FieldData, ColumnSelectTab } from '../types/resultsTypes';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: Column[];
  fields: {
    data: FieldData;
    isFetching: boolean;
  };
};

export const defaultTableColumns = [
  Column.accession,
  Column.reviewed,
  Column.id,
  Column.proteinName,
  Column.geneNames,
  Column.organismName,
];

const resultsInitialState = {
  tableColumns: defaultTableColumns,
  fields: {
    data: {
      [ColumnSelectTab.data]: [],
      [ColumnSelectTab.links]: [],
    },
    isFetching: false,
  },
};

export default resultsInitialState;
