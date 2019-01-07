import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from './state/actions';
import ResultsTable from './ResultsTable';
import { unpackQueryUrl } from '../utils/apiUrls';

export class Results extends Component {
  componentDidMount() {
    const {
      location: { search: queryFromUrl },
      queryString,
      history,
    } = this.props;
    if (queryFromUrl) {
      unpackQueryUrl(queryFromUrl);
      console.log('queryString = unpack(queryFromUrl)');
      console.log('dispatch setQueryString');
      return;
    }
    this.fetchResults();
  }

  componentDidUpdate(prevProps) {
    const { queryString: prevQueryString } = prevProps;
    const { queryString } = this.props;
    if (prevQueryString !== queryString) {
      this.fetchResults();
    }
  }

  fetchResults() {
    const {
      queryString, columns, dispatchFetchResults, history,
    } = this.props;
    const encodedQueryString = encodeURI(queryString);
    history.replace({ to: '/uniprotkb', search: `query=${encodedQueryString}` });
    dispatchFetchResults(encodedQueryString, columns);
  }

  render() {
    const { results, isFetching } = this.props;
    if (isFetching) {
      return <h3>Loading...</h3>;
    }
    return (
      <Fragment>
        <ResultsTable results={results} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  queryString: state.query.queryString,
  columns: state.results.columns,
  results: state.results.results,
  isFetching: state.results.isFetching,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: (query, columns) => dispatch(fetchResults(query, columns)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
