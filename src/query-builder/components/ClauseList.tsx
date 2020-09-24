import React, { useCallback, useState } from 'react';
import { TreeSelect } from 'franklin-sites';
import EvidenceField from './EvidenceField';
import LogicalOperator from './LogicalOperator';
import Field from './Field';
import {
  Clause,
  SearchTermType,
  Operator,
  Evidence,
  Evidences,
  dataType,
} from '../types/searchTypes';

// .itemType
// single: a simple/single type item: such as accession, gene created, this is default type.
// Comment: this item type is for comment/annotation search
// Feature: this item type is for feature/annotation search
// Database: this type is for cross reference search
// goterm: for go term search
// Group: this item type is a group type, grouping a list of search items

const ClauseItem: React.FC<{
  clause: Clause;
  searchTerms: SearchTermType[];
  evidences: Evidences;
  handleLogicChange: (clauseId: string, value: Operator) => void;
  handleFieldSelect: (clauseId: string, value: SearchTermType) => void;
  handleInputChange: (clauseId: string, value: string, id?: string) => void;
  handleRangeInputChange: (
    clauseId: string,
    value: string,
    from?: boolean
  ) => void;
  handleEvidenceChange: (clauseId: string, value: string) => void;
  removeClause: (clauseId: string) => void;
}> = ({
  clause,
  searchTerms,
  evidences,
  handleLogicChange,
  handleFieldSelect,
  handleInputChange,
  handleRangeInputChange,
  handleEvidenceChange,
  removeClause,
}) => {
  if (!clause.searchTerm) {
    return null;
  }

  let evidencesData;
  if (clause.searchTerm.hasEvidence && evidences) {
    const evidencesType =
      clause.searchTerm.term === Evidence.GO
        ? Evidence.GO
        : Evidence.ANNOTATION;
    evidencesData = evidences[evidencesType] || [];
  }

  return (
    <div className="advanced-search__clause">
      <LogicalOperator
        value={clause.logicOperator}
        handleChange={(value: Operator) => handleLogicChange(clause.id, value)}
      />
      <TreeSelect
        data={searchTerms}
        onSelect={(value: SearchTermType) =>
          handleFieldSelect(clause.id, value)
        }
        autocompletePlaceholder="Search for field"
        value={clause.searchTerm}
        autocomplete
      />
      <Field
        field={clause.searchTerm}
        handleInputChange={(value: string, id?: string) =>
          handleInputChange(clause.id, value, id)
        }
        handleRangeInputChange={(value: string, from?: boolean) =>
          handleRangeInputChange(clause.id, value, from)
        }
        queryInput={clause.queryInput}
      />
      {evidencesData && (
        <EvidenceField
          handleChange={(value: string) =>
            handleEvidenceChange(clause.id, value)
          }
          value={clause.queryInput.evidenceValue}
          data={evidencesData}
        />
      )}
      <button
        type="button"
        className="button tertiary button-remove"
        data-testid="clause-list-button-remove"
        onClick={() => removeClause(clause.id)}
      >
        Remove
      </button>
    </div>
  );
};

const MemoizedClauseItem = React.memo(ClauseItem);

type ClauseListProps = {
  clauses: Clause[];
  searchTerms: SearchTermType[];
  evidences: Evidences;
  removeClause: (clauseId: string) => void;
};

const ClauseList: React.FC<ClauseListProps> = ({
  clauses,
  searchTerms,
  evidences,
  removeClause,
}) => {
  const [clauseList, setClauseList] = useState(clauses);

  const handleFieldSelect = useCallback(
    (clauseId: string, searchTerm: SearchTermType) => {
      setClauseList((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              searchTerm,
              queryInput:
                searchTerm.dataType === dataType.enum &&
                searchTerm.values &&
                searchTerm.values.length
                  ? { stringValue: searchTerm.values[0].value }
                  : {},
            };
          }
          return clause;
        })
      );
    },
    []
  );

  const handleLogicChange = useCallback((clauseId: string, value: Operator) => {
    setClauseList((clauseList) =>
      clauseList.map((clause) => {
        if (clause.id === clauseId) {
          return {
            ...clause,
            logicOperator: value,
          };
        }
        return clause;
      })
    );
  }, []);

  const handleInputChange = useCallback(
    (clauseId: string, value: string, id?: string) => {
      setClauseList((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              queryInput: {
                ...clause.queryInput,
                stringValue: value,
                id,
              },
            };
          }
          return clause;
        })
      );
    },
    []
  );

  const handleEvidenceChange = useCallback(
    (clauseId: string, value: string) => {
      setClauseList((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              queryInput: {
                ...clause.queryInput,
                evidenceValue: value,
              },
            };
          }
          return clause;
        })
      );
    },
    []
  );

  const handleRangeInputChange = useCallback(
    (clauseId: string, value: string, from?: boolean) => {
      setClauseList((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              queryInput: {
                ...clause.queryInput,
                [from ? 'rangeFrom' : 'rangeTo']: value,
              },
            };
          }
          return clause;
        })
      );
    },
    []
  );

  return (
    <>
      {clauseList.map((clause) => (
        <MemoizedClauseItem
          key={`clause_${clause.id}`}
          clause={clause}
          searchTerms={searchTerms}
          evidences={evidences}
          handleLogicChange={handleLogicChange}
          handleFieldSelect={handleFieldSelect}
          handleInputChange={handleInputChange}
          handleRangeInputChange={handleRangeInputChange}
          handleEvidenceChange={handleEvidenceChange}
          removeClause={removeClause}
        />
      ))}
    </>
  );
};

export default ClauseList;
