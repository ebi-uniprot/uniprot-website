import React, { useCallback, useMemo } from 'react';
import { TreeSelect } from 'franklin-sites';
import LogicalOperator from './LogicalOperator';
import Field from './Field';
import {
  Clause,
  SearchTermType,
  Operator,
  ItemType,
  QueryBit,
} from '../types/searchTypes';

const modifyTree = (items: SearchTermType[]): SearchTermType[] => {
  return items.map((item) => {
    const { itemType } = item;
    if (itemType === ItemType.siblingGroup) {
      return {
        ...item,
        items: undefined,
        siblings: item.items ? modifyTree(item.items) : undefined,
      };
    }
    return {
      ...item,
      items: item.items ? modifyTree(item.items) : undefined,
    };
  });
};

const ClauseItem: React.FC<{
  clause: Clause;
  searchTerms: SearchTermType[];
  handleLogicChange: (clauseId: string, value: Operator) => void;
  handleFieldSelect: (clauseId: string, value: SearchTermType) => void;
  handleQueryChange: (clauseId: string, updatedQueryBit: QueryBit) => void;
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
    (queryBit: QueryBit) => {
      handleQueryChange(clause.id, queryBit);
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
        value={clause.searchTerm}
        autocomplete
      />
      {fieldItems.map((siblingTerm) => {
        return (
          <div className="advanced-search__inputs" key={siblingTerm.id}>
            <Field field={siblingTerm} handleChange={handleChange} />
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
  // Convert "items" to "siblings" for "sibling_group" types
  const treeSelectData = useMemo(() => {
    return modifyTree(searchTerms);
  }, [searchTerms]);

  const handleFieldSelect = useCallback(
    (clauseId: string, searchTerm: SearchTermType) => {
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              searchTerm,
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
    (clauseId: string, updatedQueryBit: QueryBit) => {
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              queryBits: {
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
          searchTerms={treeSelectData}
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
