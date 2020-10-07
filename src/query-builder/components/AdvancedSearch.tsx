import React, { FC, FormEvent, MouseEvent, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { PageIntro } from 'franklin-sites';
import ClauseList from './ClauseList';
import {
  Evidence,
  Clause,
  SearchTermType,
  EvidenceDataPoint,
} from '../types/searchTypes';
import useDataApi from '../../shared/hooks/useDataApi';
import apiUrls from '../../shared/config/apiUrls';
import { createEmptyClause, createPreSelectedClauses } from '../utils/clause';
import { stringify } from '../utils/queryStringProcessor';
import { Namespace } from '../../shared/types/namespaces';

import '../../uniprotkb/components/search/styles/search-container.scss';
import './styles/advanced-search.scss';

const AdvancedSearch: FC = () => {
  const history = useHistory();

  // To be replaced by getting it from url
  const [clauses, setClauses] = useState<Clause[]>(createPreSelectedClauses());
  const [namespace] = useState<Namespace>(Namespace.uniprotkb);

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

  // Handle that better...
  const evidences = {
    [Evidence.GO]: goEvidenceData,
    [Evidence.ANNOTATION]: annotationEvidenceData,
  };

  const addClause = () => {
    setClauses((clauses) => [...clauses, createEmptyClause()]);
  };

  const removeClause = (clauseId: string) => {
    setClauses((clauses) => {
      if (clauses.length === 1) {
        return [createEmptyClause()];
      }
      return clauses.filter((clause) => clause.id !== clauseId);
    });
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
    <>
      <PageIntro title="Advanced search" />

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
            removeClause={removeClause}
            clauses={clauses}
            setClauses={setClauses}
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
    </>
  );
};

export default withRouter(AdvancedSearch);
