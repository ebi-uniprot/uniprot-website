import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Facets, PageIntro } from 'franklin-sites';
import { default as queryStringModule } from 'query-string';
import * as resultsActions from './state/actions';
import * as searchActions from '../search/state/actions';
import { Clause, Namespace } from '../search/types/searchTypes';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsTable from './ResultsTable';
import infoMappings from '../info/InfoMappings';
import { RootState, RootAction } from '../state/state-types';
import {
  SortDirectionsType,
  SortableColumns,
  SelectedRows,
  SelectedFacet,
  SortType,
} from './types/resultsTypes';

interface ResultsProps extends RouteComponentProps {
  queryString: string;
  namespace: Namespace;
  selectedFacets: SelectedFacet[];
  dispatchFetchResults: (
    queryString: string,
    columns: string[],
    selectedFacets: SelectedFacet[],
    sortBy: SortableColumns | undefined,
    sortDirection: keyof SortDirectionsType | undefined
  ) => void;
  dispatchUpdateQueryString: (type: string) => void;
  dispatchUpdateColumnSort: (column: SortableColumns) => void;
  dispatchAddFacet: (facetName: string, facetValue: string) => void;
  dispatchRemoveFacet: (facetName: string, facetValue: string) => void;
  dispatchReset: () => void;
  clauses?: Clause[];
  columns: string[];
  sort: SortType;
  results: any[];
  facets: any[];
  isFetching: boolean;
}

type ResultsContainerState = {
  selectedRows: SelectedRows;
};

export class Results extends Component<ResultsProps, ResultsContainerState> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = { selectedRows: {} };
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    const {
      location: { search: queryParamFromUrl },
      queryString,
      selectedFacets,
      dispatchFetchResults,
      dispatchUpdateQueryString,
      columns,
      history,
      sort: { column, direction },
    } = this.props;
    const queryFromUrl = queryStringModule.parse(queryParamFromUrl).query;
    if (
      queryFromUrl &&
      queryFromUrl !== queryString &&
      typeof queryFromUrl === 'string'
    ) {
      dispatchUpdateQueryString(queryFromUrl);
      return;
    }
    dispatchFetchResults(
      queryString,
      columns,
      selectedFacets,
      column,
      direction
    );
  }

  componentDidUpdate(prevProps: ResultsProps) {
    const {
      dispatchFetchResults,
      queryString,
      selectedFacets,
      columns,
      history,
      sort: { column, direction },
    } = this.props;
    if (
      queryString !== prevProps.queryString ||
      selectedFacets !== prevProps.selectedFacets ||
      columns !== prevProps.columns ||
      column !== prevProps.sort.column ||
      direction !== prevProps.sort.direction
    ) {
      history.push({ pathname: '/uniprotkb', search: `query=${queryString}` });
      dispatchFetchResults(
        queryString,
        columns,
        selectedFacets,
        column,
        direction
      );
    }
  }

  componentWillUnmount() {
    const { dispatchReset } = this.props;
    dispatchReset();
  }

  handleRowSelect(rowId: string) {
    const { selectedRows: prevSelectedRows } = this.state;
    if (rowId in prevSelectedRows) {
      const { [rowId]: value, ...selectedRows } = prevSelectedRows;
      this.setState({ selectedRows });
    } else {
      prevSelectedRows[rowId] = true;
      this.setState({ selectedRows: prevSelectedRows });
    }
  }

  render() {
    const {
      results,
      facets,
      isFetching,
      selectedFacets,
      columns,
      dispatchAddFacet,
      dispatchRemoveFacet,
      dispatchUpdateColumnSort,
      namespace,
      sort,
    } = this.props;
    const { selectedRows } = this.state;
    if (isFetching) {
      return <h3>Loading...</h3>;
    }
    const { name, links, info } = infoMappings[namespace];
    return (
      <Fragment>
        <SideBarLayout
          title={
            <PageIntro title={name} links={links}>
              {info}
            </PageIntro>
          }
          sidebar={
            <Facets
              data={facets}
              selectedFacets={selectedFacets}
              addFacet={dispatchAddFacet}
              removeFacet={dispatchRemoveFacet}
            />
          }
          content={
            <ResultsTable
              results={results}
              columnNames={columns}
              handleRowSelect={this.handleRowSelect}
              selectedRows={selectedRows}
              handleHeaderClick={dispatchUpdateColumnSort}
              sort={sort}
            />
          }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  namespace: state.query.namespace,
  queryString: state.query.queryString,
  columns: state.results.columns,
  selectedFacets: state.results.selectedFacets,
  results: state.results.results,
  facets: state.results.facets,
  isFetching: state.results.isFetching,
  sort: state.results.sort,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchResults: (
        query: string,
        columns: string[],
        selectedFacets: SelectedFacet[],
        sortBy: SortableColumns | undefined,
        sortDirection: keyof SortDirectionsType | undefined
      ) =>
        resultsActions.fetchResults(
          query,
          columns,
          selectedFacets,
          sortBy,
          sortDirection
        ),
      dispatchAddFacet: (facetName: string, facetValue: string) =>
        resultsActions.addFacet(facetName, facetValue),
      dispatchRemoveFacet: (facetName: string, facetValue: string) =>
        resultsActions.removeFacet(facetName, facetValue),
      dispatchUpdateQueryString: (queryString: string) =>
        searchActions.updateQueryString(queryString),
      dispatchUpdateColumnSort: (column: SortableColumns) =>
        resultsActions.updateColumnSort(column),
      dispatchReset: () => searchActions.reset(),
    },
    dispatch
  );

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results)
);

export default ResultsContainer;
