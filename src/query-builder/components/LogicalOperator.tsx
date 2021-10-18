import cn from 'classnames';

import { Operator } from '../types/searchTypes';

const operators: Operator[] = ['AND', 'OR', 'NOT'];

export type LogicalOperatorProps = {
  value: Operator;
  handleChange: (value: Operator) => void;
  isFirst: boolean;
};

const LogicalOperator = ({
  value,
  handleChange,
  isFirst,
}: LogicalOperatorProps) => (
  <select
    className={cn('query-builder__logic', {
      'query-builder__logic--diluted': isFirst && value === 'AND',
    })}
    value={value}
    onChange={(e) => handleChange(e.target.value as Operator)}
    aria-label="logical operator"
  >
    {operators.map((op) =>
      isFirst && op === 'OR' ? null : (
        <option value={op} key={op}>
          {isFirst && op === 'AND' ? '' : op}
        </option>
      )
    )}
  </select>
);

export default LogicalOperator;
