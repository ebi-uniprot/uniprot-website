import React, { Component, FormEvent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageIntro } from 'franklin-sites';

import {
  Clause,
  SearchTermType,
  Operator,
  Namespace,
} from '../../uniprotkb/types/searchTypes';

import AdvancedSearch from './AdvancedSearch';

import { RootState, RootAction } from '../../app/state/rootInitialState';
import * as searchActions from '../../uniprotkb/state/searchActions';

import { stringify } from '../utils/queryStringProcessor';

import { Location, LocationToPath } from '../../app/config/urls';

import '../../uniprotkb/components/search/styles/search-container.scss';

const queryBuilderPath = LocationToPath[Location.UniProtKBQueryBuilder];

type Props = {
  dispatchUpdateQueryString: (type: string) => void;
  namespace: Namespace;
  clauses: Clause[];
  dispatchUpdateClauses: (clauses: Clause[]) => void;
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

  handleSubmitClick(event: FormEvent | MouseEvent) {
    event.preventDefault();

    const { history, clauses, dispatchUpdateQueryString } = this.props;
    const queryString = stringify(clauses);
    dispatchUpdateQueryString(queryString);
    history.push({
      pathname: '/uniprotkb',
      search: queryString && `query=${queryString}`,
    });
  }

  handleQueryStringChange(queryString: string) {
    this.setState({ queryString });
  }

  render() {
    const { queryString } = this.state;

    return (
      <>
        <PageIntro title="Advanced search" />
        <AdvancedSearch
          {...this.props}
          queryString={queryString}
          handleAdvancedSubmitClick={this.handleSubmitClick}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  clauses: state.query.clauses,
  namespace: state.query.namespace,
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
