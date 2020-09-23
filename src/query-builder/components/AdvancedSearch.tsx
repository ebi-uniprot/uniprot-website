import React, { FC, FormEvent, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ClauseList from './ClauseList';
import {
  Evidence,
  Clause,
  SearchTermType,
  Operator,
  EvidenceDataPoint,
} from '../types/searchTypes';
import useDataApi from '../../shared/hooks/useDataApi';
import apiUrls from '../../shared/config/apiUrls';
import { createEmptyClause, createPreSelectedClauses } from '../utils/clause';
import { stringify } from '../utils/queryStringProcessor';
import { Namespace } from '../../shared/types/namespaces';

import './styles/advanced-search.scss';

type AdvancedSearchProps = {
  queryString: string;
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
};
const AdvancedSearch: FC<AdvancedSearchProps> = (props) => {
  // Use namespace hook here when ready
  const { data: searchTermsData } = useDataApi<SearchTermType[]>(
    apiUrls.advancedSearchTerms
  );

  const history = useHistory();

  // To be replaced by getting it from url
  const [clauses, setClauses] = useState<Clause[]>(createPreSelectedClauses());
  const [namespace, setNamespace] = useState<Namespace>(Namespace.uniprotkb);

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

  // Handle that better...
  const evidences = {
    [Evidence.GO]: goEvidenceData,
    [Evidence.ANNOTATION]: annotationEvidenceData,
  };

  const addClause = () => {
    setClauses((clauses) => [...clauses, createEmptyClause()]);
  };

  const handleSubmitClick = (event: FormEvent | MouseEvent) => {
    event.preventDefault();
    const queryString = stringify(clauses);
    history.push({
      pathname: '/uniprotkb',
      search: queryString && `query=${queryString}`,
    });
  };

  return (
    <form
      className="advanced-search"
      onSubmit={handleSubmitClick}
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
          clauses={clauses}
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
          onClick={addClause}
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
