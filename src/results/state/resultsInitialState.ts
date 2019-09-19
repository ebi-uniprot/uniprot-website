import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../ResultsContainer';
import ColumnId from '../../model/types/columnIdTypes';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: ColumnId[];
  cardColumns: ColumnId[];
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
    data: any;
    isFetching: boolean;
  };
  summaryAccession: string | null;
};

export const defaultTableColumns = [
  ColumnId.accession,
  ColumnId.id,
  ColumnId.proteinName,
  ColumnId.geneNames,
  ColumnId.organism,
];

const resultsInitialState = {
  tableColumns: defaultTableColumns,
  cardColumns: [
    ColumnId.accession,
    ColumnId.id,
    ColumnId.proteinName,
    ColumnId.geneNames,
    ColumnId.organism,
    ColumnId.keyword,
    ColumnId.ccFunction,
    ColumnId.sequence,
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
    data: [],
    isFetching: false,
  },
  summaryAccession: null,
};

export default resultsInitialState;
