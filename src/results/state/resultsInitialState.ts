import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../ResultsContainer';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: string[];
  cardColumns: string[];
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
};

const resultsInitialState = {
  tableColumns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  cardColumns: [
    'accession',
    'id',
    'protein_name',
    'gene_names',
    'organism',
    'keyword',
    'cc:function',
    'sequence',
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
};

export default resultsInitialState;
