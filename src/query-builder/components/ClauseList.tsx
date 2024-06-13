import {
  useCallback,
  memo,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { TreeSelect } from 'franklin-sites';

import LogicalOperator from './LogicalOperator';
import Field from './Field';
import { booleanValues } from './EnumOrBooleanField';

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
  isFirst: boolean;
};

const ClauseItem = memo<ClauseItemProps>(
  ({
    clause,
    searchTerms,
    handleLogicChange,
    handleFieldSelect,
    handleQueryChange,
    removeClause,
    isFirst,
  }) => {
    const handleChange = useCallback(
      (queryBit: QueryBit, reset?: boolean) => {
        handleQueryChange(clause.id, queryBit, reset);
      },
      [clause.id, handleQueryChange]
    );

    useEffect(() => {
      // Set to "AND" if it's now the first clause and was a "OR"
      if (isFirst && clause.logicOperator === 'OR') {
        handleLogicChange(clause.id, 'AND');
      }
    }, [clause.id, clause.logicOperator, handleLogicChange, isFirst]);

    if (!clause.searchTerm) {
      return null;
    }
    const fieldItems = clause.searchTerm.siblings
      ? clause.searchTerm.siblings
      : [clause.searchTerm];

    return (
      <div
        className="query-builder__clause"
        data-testid="search__clause"
        data-field={clause.searchTerm.term}
      >
        <LogicalOperator
          value={clause.logicOperator}
          handleChange={(value: Operator) =>
            handleLogicChange(clause.id, value)
          }
          isFirst={isFirst}
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

const ClauseList: FC<React.PropsWithChildren<ClauseListProps>> = ({
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

          let value;
          if (searchTerm.values?.length) {
            value = searchTerm.values[0].value;
          } else if (searchTerm.dataType === 'boolean') {
            value = booleanValues[0].value;
          }

          return {
            ...clause,
            searchTerm,
            // reset queryBits on change of field
            queryBits: value ? { [searchTerm.term]: value } : {},
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
      {clauses.map((clause, index) => (
        <ClauseItem
          key={clause.id}
          clause={clause}
          searchTerms={searchTerms}
          handleLogicChange={handleLogicChange}
          handleFieldSelect={handleFieldSelect}
          handleQueryChange={handleQueryChange}
          removeClause={removeClause}
          isFirst={index === 0}
        />
      ))}
    </>
  );
};

export default ClauseList;
