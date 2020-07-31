import React from 'react';
import { Operator } from '../../types/searchTypes';

const operators: Operator[] = [Operator.AND, Operator.OR, Operator.NOT];

const LogicalOperator = ({
  value,
  handleChange,
}: {
  value: Operator;
  handleChange: (value: Operator) => void;
}) => (
  <select
    className="advanced-search__logic"
    value={value}
    data-testid="advanced-search-logic-select"
    onChange={(e) => handleChange(e.target.value as Operator)}
  >
    {operators.map((op) => (
      <option value={op} key={op}>
        {op}
      </option>
    ))}
  </select>
);

export default LogicalOperator;
