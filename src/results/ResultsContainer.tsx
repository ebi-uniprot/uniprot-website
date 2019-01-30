import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { default as queryStringModule } from 'query-string';
import { Facets } from 'franklin-sites';
import * as resultsActions from './state/actions';
import * as searchActions from '../search/state/actions';
import { Clause } from '../search/types/searchTypes';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsTable from './ResultsTable';
import { RootState, RootAction } from '../state/state-types';
import { selectedRows } from './types/resultsTypes';

interface IResultsProps extends RouteComponentProps {
  queryString: string;
  selectedFacets: [];
  dispatchFetchResults: (
    queryString: string,
    columns: Array<string>,
    selectedFacets: [],
    sortBy: string,
    sortDirection: string
  ) => void;
  dispatchUpdateQueryString: (type: string) => void;
  dispatchUpdateColumnSort: (column: string) => void;
  dispatchAddFacet: (facetName: string, facetValue: string) => void;
  dispatchRemoveFacet: (facetName: string, facetValue: string) => void;
  clauses?: Array<Clause>;
  columns: Array<string>;
  sort: { column: string; direction: string };
  results: [];
  facets: [];
  isFetching: boolean;
}

type ResultsContainerState = {
  selectedRows: selectedRows;
};

export class Results extends Component<IResultsProps, ResultsContainerState> {
  constructor(props: IResultsProps) {
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
      sort: { column, direction }
    } = this.props;
    dispatchFetchResults(
      queryString,
      columns,
      selectedFacets,
      column,
      direction
    );
  }

  componentDidUpdate(prevProps: IResultsProps) {
    const {
      location: { search: queryParamFromUrl },
      dispatchFetchResults,
      queryString,
      selectedFacets,
      columns,
      history,
      sort: { column, direction }
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
      sort
    } = this.props;
    const { selectedRows } = this.state;
    if (isFetching) {
      return <h3>Loading...</h3>;
    }
    return (
      <SideBarLayout
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
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  queryString: state.query.queryString,
  columns: state.results.columns,
  selectedFacets: state.results.selectedFacets,
  results: state.results.results,
  facets: state.results.facets,
  isFetching: state.results.isFetching,
  sort: state.results.sort
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchResults: (
        query,
        columns,
        selectedFacets,
        sortBy,
        sortDirection
      ) =>
        resultsActions.fetchResults(
          query,
          columns,
          selectedFacets,
          sortBy,
          sortDirection
        ),
      dispatchAddFacet: (facetName, facetValue) =>
        resultsActions.addFacet(facetName, facetValue),
      dispatchRemoveFacet: (facetName, facetValue) =>
        resultsActions.removeFacet(facetName, facetValue),
      dispatchUpdateQueryString: queryString =>
        searchActions.updateQueryString(queryString),
      dispatchUpdateColumnSort: column =>
        resultsActions.updateColumnSort(column)
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
