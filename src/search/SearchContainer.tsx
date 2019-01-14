import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MainSearch } from 'franklin-sites';
import {
  selectField,
  updateInputValue,
  updateEvidence,
  updateRangeValue,
  updateLogicOperator,
  updateQueryString,
  submitAdvancedQuery,
  addClause,
  removeClause,
  fetchSearchTerms,
  fetchEvidencesIfNeeded,
} from './state/actions';
import {
  Clause, FieldType, Operator, EvidenceType,
} from './types/searchTypes';
import AdvancedSearch from './AdvancedSearch';

import './styles/SearchContainer.scss';
import { RootState } from '../state/initialState';
import { SearchState } from './state/initialState';

interface SearchProps extends RouteComponentProps, SearchState {
  queryString: string;
  dispatchFetchSearchTerms: () => void;
  dispatchfetchEvidencesIfNeeded: (type: string) => void;
  dispatchSubmitAdvancedQuery: () => void;
  dispatchUpdateQueryString: (type: string) => void;
  dispatchAddClause: () => void;
}

interface SearchContainerState {
  showAdvanced: boolean;
}

export class Search extends Component<SearchProps, SearchContainerState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      showAdvanced: false,
    };
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleAdvancedSubmitClick = this.handleAdvancedSubmitClick.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchSearchTerms, dispatchfetchEvidencesIfNeeded } = this.props;
    dispatchFetchSearchTerms();
    dispatchfetchEvidencesIfNeeded(EvidenceType.GO);
    dispatchfetchEvidencesIfNeeded(EvidenceType.ANNOTATION);
  }

  toggleAdvanced() {
    const { showAdvanced } = this.state;
    this.setState({ showAdvanced: !showAdvanced });
  }

  handleAdvancedSubmitClick() {
    const { dispatchSubmitAdvancedQuery, history } = this.props;
    dispatchSubmitAdvancedQuery();
    history.push('/uniprotkb');
  }

  handleSubmitClick(searchTerm: string) {
    const { dispatchUpdateQueryString, history } = this.props;
    dispatchUpdateQueryString(searchTerm);
    history.push('/uniprotkb');
  }

  render() {
    const { queryString, namespace, dispatchAddClause } = this.props;
    const { showAdvanced } = this.state;
    let search;
    if (showAdvanced) {
      search = (
        <AdvancedSearch
          namespace={namespace}
          dispatchAddClause={dispatchAddClause}
          handleAdvancedSubmitClick={this.handleAdvancedSubmitClick}
        />
      );
    } else {
      search = <MainSearch handleSearchSubmit={this.handleSubmitClick} searchTerm={queryString} />;
    }
    return (
      <Fragment>
        {search}
        <button type="button" onClick={this.toggleAdvanced} className="adv-search-toggle">
          {showAdvanced ? 'Back to quick search' : 'Advanced search'}
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  clauses: state.query.clauses,
  queryString: state.query.queryString,
  searchTerms: state.query.searchTerms.data,
  namespace: state.query.namespace,
  evidences: state.query.evidences,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFieldSelect: (clauseId: string, field: FieldType) => dispatch(selectField(clauseId, field)),
  handleInputChange: (clauseId: string, value: string) => dispatch(updateInputValue(clauseId, value)),
  handleEvidenceChange: (clauseId: string, value: string) => dispatch(updateEvidence(clauseId, value)),
  handleRangeInputChange: (clauseId: string, value: number, from: boolean) => dispatch(updateRangeValue(clauseId, value, from)),
  handleLogicChange: (clauseId: string, value: Operator) => dispatch(updateLogicOperator(clauseId, value)),
  handleRemoveClause: (clauseId: string) => dispatch(removeClause(clauseId)),
  dispatchAddClause: () => dispatch(addClause()),
  dispatchfetchEvidencesIfNeeded: evidencesType => dispatch(fetchEvidencesIfNeeded(evidencesType)),
  dispatchFetchSearchTerms: () => dispatch(fetchSearchTerms()),
  dispatchSubmitAdvancedQuery: () => dispatch(submitAdvancedQuery()),
  dispatchUpdateQueryString: (queryString: string) => dispatch(updateQueryString(queryString)),
});

const SearchContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Search),
);

export default SearchContainer;
