import React, { useCallback, useMemo } from 'react';
import { TreeSelect } from 'franklin-sites';
import EvidenceField from './EvidenceField';
import LogicalOperator from './LogicalOperator';
import Field from './Field';
import {
  Clause,
  SearchTermType,
  Operator,
  DataType,
  ItemType,
} from '../types/searchTypes';

// .itemType
// single: a simple/single type item: such as accession, gene created, this is default type.
// Comment: this item type is for comment/annotation search
// Feature: this item type is for feature/annotation search
// Database: this type is for cross reference search
// goterm: for go term search
// Group: this item type is a group type, grouping a list of search items

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
            <Field
              field={siblingTerm}
              handleInputChange={(value: string, id?: string) =>
                handleInputChange(clause.id, value, id)
              }
              handleRangeInputChange={(value: string, from?: boolean) =>
                handleRangeInputChange(clause.id, value, from)
              }
              handleEvidenceChange={(value: string) =>
                handleEvidenceChange(clause.id, value)
              }
              queryInput={clause.queryInput}
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
  // Convert "items" to "siblings" for "sibling_group" types
  const treeSelectData = useMemo(() => {
    return modifyTree(searchTerms);
  }, [searchTerms]);

  const handleFieldSelect = useCallback(
    (clauseId: string, searchTerm: SearchTermType) => {
      // TODO Handle searchTerm.siblings
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clause.id === clauseId) {
            return {
              ...clause,
              searchTerm,
              queryInput:
                searchTerm.dataType === DataType.enum &&
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

  const handleInputChange = useCallback(
    (clauseId: string, value: string, id?: string) => {
      setClauses((clauseList) =>
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
    [setClauses]
  );

  const handleEvidenceChange = useCallback(
    (clauseId: string, value: string) => {
      setClauses((clauseList) =>
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
    [setClauses]
  );

  const handleRangeInputChange = useCallback(
    (clauseId: string, value: string, from?: boolean) => {
      setClauses((clauseList) =>
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
