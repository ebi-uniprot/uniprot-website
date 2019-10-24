import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../ResultsContainer';
import { Column } from '../../model/types/ColumnTypes';
import { FieldData, ColumnSelectTab } from '../types/resultsTypes';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: Column[];
  cardColumns: Column[];
  facets: Facet[];
  nextUrl: string;
  results: {
    data: UniProtkbAPIModel[];
    isFetching: boolean;
    isFetched: { [url: string]: boolean };
  };
  totalNumberResults: number;
  viewMode: ViewMode;
  fields: {
    data: FieldData;
    isFetching: boolean;
  };
  summaryAccession: string | null;
};

export const defaultTableColumns = [
  Column.accession,
  Column.id,
  Column.proteinName,
  Column.geneNames,
  Column.organism,
];

const resultsInitialState = {
  tableColumns: defaultTableColumns,
  cardColumns: [
    Column.accession,
    Column.id,
    Column.proteinName,
    Column.geneNames,
    Column.organism,
    Column.keyword,
    Column.ccFunction,
    Column.sequence,
  ],
  results: {
    data: [],
    isFetching: false,
    isFetched: {},
  },
  facets: [],
  nextUrl: '',
  totalNumberResults: 0,
  viewMode: ViewMode.CARD,
  fields: {
    data: {
      [ColumnSelectTab.data]: [],
      [ColumnSelectTab.links]: [],
    },
    isFetching: false,
  },
  summaryAccession: null,
};

export default resultsInitialState;
