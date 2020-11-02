import React, { useCallback } from 'react';
import { TreeSelect } from 'franklin-sites';
import LogicalOperator from './LogicalOperator';
import Field from './Field';
import {
  Clause,
  SearchTermType,
  Operator,
  QueryBit,
} from '../types/searchTypes';

const ClauseItem: React.FC<{
  clause: Clause;
  searchTerms: SearchTermType[];
  handleLogicChange: (clauseId: string, value: Operator) => void;
  handleFieldSelect: (clauseId: string, value: SearchTermType) => void;
  handleQueryChange: (
    clauseId: string,
    updatedQueryBit: QueryBit,
    reset?: boolean
  ) => void;
  removeClause: (clauseId: string) => void;
}> = ({
  clause,
  searchTerms,
  handleLogicChange,
  handleFieldSelect,
  handleQueryChange,
  removeClause,
}) => {
  const handleChange = useCallback(
    (queryBit: QueryBit, reset?: boolean) => {
      handleQueryChange(clause.id, queryBit, reset);
    },
    [clause.id, handleQueryChange]
  );

  if (!clause.searchTerm) {
    return null;
  }
  const fieldItems = clause.searchTerm.siblings
    ? clause.searchTerm.siblings
    : [clause.searchTerm];

  return (
    <div className="advanced-search__clause" data-testid="search__clause">
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
        label={clause.searchTerm.label}
        autocomplete
      />
      {fieldItems.map((siblingTerm) => {
        return (
          <div className="advanced-search__inputs" key={siblingTerm.id}>
            <Field
              field={siblingTerm}
              handleChange={handleChange}
              initialValue={clause.queryBits}
            />
          </div>
        );
      })}
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
  setClauses: React.Dispatch<React.SetStateAction<Clause[]>>;
  searchTerms: SearchTermType[];
  removeClause: (clauseId: string) => void;
};

const ClauseList: React.FC<ClauseListProps> = ({
  clauses,
  setClauses,
  searchTerms,
  removeClause,
}) => {
  const handleFieldSelect = useCallback(
    (clauseId: string, searchTerm: SearchTermType) => {
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              searchTerm,
              // reset queryBits on change of field
              queryBits: {},
            };
          }
          return clause;
        })
      );
    },
    [setClauses]
  );

  const handleLogicChange = useCallback(
    (clauseId: string, value: Operator) => {
      setClauses((clauseList) =>
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
    },
    [setClauses]
  );

  const handleQueryChange = useCallback(
    (clauseId: string, updatedQueryBit: QueryBit, reset = false) => {
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              queryBits: reset
                ? updatedQueryBit
                : {
                    ...clause.queryBits,
                    ...updatedQueryBit,
                  },
            };
          }
          return clause;
        })
      );
    },
    [setClauses]
  );

  return (
    <>
      {clauses.map((clause) => (
        <MemoizedClauseItem
          key={`clause_${clause.id}`}
          clause={clause}
          searchTerms={searchTerms}
          handleLogicChange={handleLogicChange}
          handleFieldSelect={handleFieldSelect}
          handleQueryChange={handleQueryChange}
          removeClause={removeClause}
        />
      ))}
    </>
  );
};

export default ClauseList;
