export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: string[];
  cardColumns: string[];
  facets: any[];
  nextUrl: string;
  isFetching: boolean;
  isFetched: { [url: string]: boolean };
  results: any[];
  totalNumberResults: number;
  viewMode: ViewMode;
};

const resultsInitialState = {
  tableColumns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  cardColumns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  // cardColumns: [
  //   'accession',
  //   'id',
  //   'protein_name',
  //   'gene_names',
  //   'organism',
  //   'keyword',
  //   'cc:function',
  // ],
  results: [],
  facets: [],
  isFetching: false,
  isFetched: {},
  nextUrl: '',
  totalNumberResults: 0,
  viewMode: ViewMode.CARD,
};

export default resultsInitialState;
