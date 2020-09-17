import React, { FC, FormEvent, MouseEvent } from 'react';
import ClauseList from './ClauseList';
import {
  Namespace,
  Evidence,
  Clause,
  SearchTermType,
  Operator,
  EvidenceDataPoint,
} from '../../uniprotkb/types/searchTypes';
import './styles/advanced-search.scss';
import useDataApi from '../../shared/hooks/useDataApi';
import apiUrls from '../../shared/config/apiUrls';

type AdvancedSearchProps = {
  queryString: string;
  namespace: Namespace;
  clauses: Clause[];
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
const AdvancedSearch: FC<AdvancedSearchProps> = (props) => {
  // Use namespace hook here when ready
  const { data: searchTermsData } = useDataApi<SearchTermType[]>(
    apiUrls.advancedSearchTerms
  );

  // NOTE: move this to the corresponding component?
  const { data: goEvidenceData } = useDataApi<EvidenceDataPoint[]>(
    apiUrls.evidences[Evidence.GO]
  );
  // NOTE: move this to the corresponding component?
  const { data: annotationEvidenceData } = useDataApi<EvidenceDataPoint[]>(
    apiUrls.evidences[Evidence.ANNOTATION]
  );

  if (!searchTermsData || !goEvidenceData || !annotationEvidenceData) {
    return null;
  }

  const { handleAdvancedSubmitClick, namespace, dispatchAddClause } = props;

  // Handle that better...
  const evidences = {
    [Evidence.GO]: goEvidenceData,
    [Evidence.ANNOTATION]: annotationEvidenceData,
  };

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
        <ClauseList
          {...props}
          searchTerms={searchTermsData}
          evidences={evidences}
        />
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
};

export default AdvancedSearch;
