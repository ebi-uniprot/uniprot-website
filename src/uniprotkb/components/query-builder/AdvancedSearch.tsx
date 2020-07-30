import React, { Component, FormEvent, MouseEvent } from 'react';
import ClauseList from './ClauseList';
import {
  Namespace,
  Evidence,
  Clause,
  SearchTermType,
  Operator,
  Evidences,
} from '../../types/searchTypes';
import './styles/advanced-search.scss';

type AdvancedSearchProps = {
  searchTerms: SearchTermType[];
  queryString: string;
  namespace: Namespace;
  clauses: Clause[];
  evidences: Evidences;
  dispatchfetchEvidencesIfNeeded: (type: Evidence) => void;
  dispatchFetchSearchTermsIfNeeded: () => void;
  handleAdvancedSubmitClick: (event: FormEvent | MouseEvent) => void;
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
};
class AdvancedSearch extends Component<AdvancedSearchProps> {
  componentDidMount() {
    const {
      dispatchfetchEvidencesIfNeeded,
      dispatchFetchSearchTermsIfNeeded,
    } = this.props;
    dispatchfetchEvidencesIfNeeded(Evidence.GO);
    dispatchfetchEvidencesIfNeeded(Evidence.ANNOTATION);
    dispatchFetchSearchTermsIfNeeded();
  }

  render() {
    const {
      handleAdvancedSubmitClick,
      namespace,
      dispatchAddClause,
    } = this.props;
    return (
      <form
        className="advanced-search"
        onSubmit={handleAdvancedSubmitClick}
        data-testid="advanced-search-form"
      >
        <fieldset>
          <label htmlFor="namespace-select">
            Searching in
            <select id="namespace-select">
              <option>{namespace}</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <ClauseList {...this.props} />
        </fieldset>
        <div className="advanced-search__actions">
          <button
            type="button"
            id="add-field"
            className="button tertiary"
            data-testid="advanced-search-add-field"
            onClick={dispatchAddClause}
          >
            Add Field
          </button>
          <button type="submit" id="submit-query" className="button">
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default AdvancedSearch;
