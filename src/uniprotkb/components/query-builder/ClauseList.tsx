import React, { Fragment } from 'react';
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
} from '../../types/searchTypes';

// .itemType
// single: a simple/single type item: such as accession, gene created, this is default type.
// Comment: this item type is for comment/annotation search
// Feature: this item type is for feature/annotation search
// Database: this type is for cross reference search
// goterm: for go term search
// Group: this item type is a group type, grouping a list of search items

type ClauseListProps = {
  clauses: Clause[];
  searchTerms: SearchTermType[];
  evidences: Evidences;
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

const ClauseList: React.FC<ClauseListProps> = ({
  clauses,
  searchTerms,
  evidences,
  handleFieldSelect,
  handleInputChange,
  handleEvidenceChange,
  handleRangeInputChange,
  handleLogicChange,
  handleRemoveClause,
}) => (
  <Fragment>
    {clauses.map((clause) => {
      if (!clause.searchTerm) {
        return null;
      }

      let evidencesData;
      if (clause.searchTerm.hasEvidence) {
        const evidencesType =
          clause.searchTerm.term === Evidence.GO
            ? Evidence.GO
            : Evidence.ANNOTATION;
        evidencesData = evidences[evidencesType].data || [];
      }

      return (
        <div key={`clause_${clause.id}`} className="advanced-search__clause">
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
            onClick={() => handleRemoveClause(clause.id)}
          >
            Remove
          </button>
        </div>
      );
    })}
  </Fragment>
);

export default ClauseList;
