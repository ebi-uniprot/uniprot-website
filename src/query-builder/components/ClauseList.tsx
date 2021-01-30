import { useCallback, memo, FC, Dispatch, SetStateAction } from 'react';
import { TreeSelect } from 'franklin-sites';

import LogicalOperator from './LogicalOperator';
import Field from './Field';

import {
  Clause,
  SearchTermType,
  Operator,
  QueryBit,
} from '../types/searchTypes';

type HandleLogicChange = (clauseId: number, value: Operator) => void;
type HandleFieldSelect = (clauseId: number, value: SearchTermType) => void;
type HandleQueryChange = (
  clauseId: number,
  updatedQueryBit: QueryBit,
  reset?: boolean
) => void;
type RemoveClause = (clauseId: number) => void;

type ClauseItemProps = {
  clause: Clause;
  searchTerms: SearchTermType[];
  handleLogicChange: HandleLogicChange;
  handleFieldSelect: HandleFieldSelect;
  handleQueryChange: HandleQueryChange;
  removeClause: RemoveClause;
};

const ClauseItem = memo<ClauseItemProps>(
  ({
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
      <div className="query-builder__clause" data-testid="search__clause">
        <LogicalOperator
          value={clause.logicOperator}
          handleChange={(value: Operator) =>
            handleLogicChange(clause.id, value)
          }
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
        {fieldItems.map((siblingTerm) => (
          <div className="query-builder__inputs" key={siblingTerm.id}>
            <Field
              field={siblingTerm}
              handleChange={handleChange}
              initialValue={clause.queryBits}
            />
          </div>
        ))}
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
  }
);

type ClauseListProps = {
  clauses: Clause[];
  setClauses: Dispatch<SetStateAction<Clause[]>>;
  searchTerms: SearchTermType[];
  removeClause: RemoveClause;
};

const ClauseList: FC<ClauseListProps> = ({
  clauses,
  setClauses,
  searchTerms,
  removeClause,
}) => {
  const handleLogicChange = useCallback<HandleLogicChange>(
    (clauseId, value) => {
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clauseId !== clause.id) {
            return clause;
          }
          return {
            ...clause,
            logicOperator: value,
          };
        })
      );
    },
    [setClauses]
  );

  const handleFieldSelect = useCallback<HandleFieldSelect>(
    (clauseId, searchTerm) => {
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clauseId !== clause.id) {
            return clause;
          }
          return {
            ...clause,
            searchTerm,
            // reset queryBits on change of field
            queryBits: searchTerm.values?.length
              ? { [searchTerm.term]: searchTerm.values[0].value }
              : {},
          };
        })
      );
    },
    [setClauses]
  );

  const handleQueryChange = useCallback<HandleQueryChange>(
    (clauseId, updatedQueryBit, reset = false) => {
      setClauses((clauseList) =>
        clauseList.map((clause) => {
          if (clauseId !== clause.id) {
            return clause;
          }
          return {
            ...clause,
            queryBits: reset
              ? updatedQueryBit
              : {
                  ...clause.queryBits,
                  ...updatedQueryBit,
                },
          };
        })
      );
    },
    [setClauses]
  );

  return (
    <>
      {clauses.map((clause) => (
        <ClauseItem
          key={clause.id}
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
