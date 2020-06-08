import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  Clause,
  SearchTermType,
  Operator,
  Evidence,
  Evidences,
  Namespace,
} from '../../types/searchTypes';

import AdvancedSearch from './AdvancedSearch';

import { RootState, RootAction } from '../../../app/state/rootInitialState';
import * as searchActions from '../../state/searchActions';

import createQueryString from '../../utils/queryStringGenerator';

import { Location, LocationToPath } from '../../../app/config/urls';

import '../search/styles/search-container.scss';

const queryBuilderPath = LocationToPath[Location.UniProtKBQueryBuilder];

type Props = {
  dispatchUpdateQueryString: (type: string) => void;
  searchTerms: SearchTermType[];
  namespace: Namespace;
  clauses: Clause[];
  evidences: Evidences;
  dispatchUpdateClauses: (clauses: Clause[]) => void;
  dispatchfetchEvidencesIfNeeded: (type: Evidence) => void;
  dispatchFetchSearchTermsIfNeeded: () => void;
  dispatchAddClause: () => void;
  handleFieldSelect: (clauseId: string, field: SearchTermType) => void;
  handleInputChange: (clauseId: string, value: string, id?: string) => void;
  handleEvidenceChange: (clauseId: string, value: string) => void;
  handleRangeInputChange: (
    clauseId: string,
    value: string,
    from?: boolean
  ) => void;
  handleLogicChange: (clauseId: string, value: Operator) => void;
  handleRemoveClause: (clauseId: string) => void;
  dispatchSetPreSelectedClauses: () => void;
} & RouteComponentProps;

type State = {
  queryString: string;
};

export class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // const { queryString } = props;
    // this.state = { queryString };
    this.state = { queryString: '' };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleQueryStringChange = this.handleQueryStringChange.bind(this);
  }

  componentDidMount() {
    const {
      dispatchSetPreSelectedClauses,
      location: { pathname },
      history,
    } = this.props;
    if (queryBuilderPath && pathname === `${queryBuilderPath}/reset`) {
      dispatchSetPreSelectedClauses();
      history.replace(queryBuilderPath);
    }
  }

  componentDidUpdate() {
    // const { queryString: prevQueryString } = prevProps;
    // const { queryString } = this.props;
    // if (prevQueryString !== queryString) {
    //   this.setState({ queryString });
    // }
  }

  handleSubmitClick() {
    const { history, clauses, dispatchUpdateQueryString } = this.props;
    const queryString = createQueryString(clauses);
    dispatchUpdateQueryString(queryString);
    history.push({ pathname: '/uniprotkb', search: `query=${queryString}` });
  }

  handleQueryStringChange(queryString: string) {
    this.setState({ queryString });
  }

  render() {
    const { queryString } = this.state;
    const search = (
      <AdvancedSearch
        {...this.props}
        queryString={queryString}
        handleAdvancedSubmitClick={this.handleSubmitClick}
      />
    );
    return <Fragment>{search}</Fragment>;
  }
}

const mapStateToProps = (state: RootState) => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms.data,
  namespace: state.query.namespace,
  evidences: state.query.evidences,
  // queryString: state.query.queryString,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      handleFieldSelect: (clauseId: string, field: SearchTermType) =>
        searchActions.selectSearchTerm(clauseId, field),
      handleInputChange: (clauseId: string, value: string, id?: string) =>
        searchActions.updateInputValue(clauseId, value, id),
      handleEvidenceChange: (clauseId: string, value: string) =>
        searchActions.updateEvidence(clauseId, value),
      handleRangeInputChange: (
        clauseId: string,
        value: string,
        from?: boolean
      ) => searchActions.updateRangeValue(clauseId, value, from),
      handleLogicChange: (clauseId: string, value: Operator) =>
        searchActions.updateLogicOperator(clauseId, value),
      handleRemoveClause: (clauseId: string) =>
        searchActions.removeClause(clauseId),
      dispatchAddClause: () => searchActions.addClause(),
      dispatchfetchEvidencesIfNeeded: (evidencesType) =>
        searchActions.fetchEvidencesIfNeeded(evidencesType),
      dispatchFetchSearchTermsIfNeeded: () =>
        searchActions.fetchSearchTermsIfNeeded(),
      dispatchSubmitAdvancedQuery: () => searchActions.submitAdvancedQuery(),
      dispatchUpdateClauses: (clauses) => searchActions.updateClauses(clauses),
      dispatchUpdateQueryString: (queryString) =>
        searchActions.updateQueryString(queryString),
      dispatchSetPreSelectedClauses: () =>
        searchActions.setPreSelectedClauses(),
    },
    dispatch
  );

const AdvancedSearchContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Search)
);

export default AdvancedSearchContainer;
