import cn from 'classnames';

import { Operator } from '../types/searchTypes';

const operators: Operator[] = [Operator.AND, Operator.OR, Operator.NOT];

const LogicalOperator = ({
  value,
  handleChange,
  isFirst,
}: {
  value: Operator;
  handleChange: (value: Operator) => void;
  isFirst: boolean;
}) => (
  <select
    className={cn('query-builder__logic', {
      'query-builder__logic--diluted': isFirst && value === Operator.AND,
    })}
    value={value}
    onChange={(e) => handleChange(e.target.value as Operator)}
    aria-label="logical operator"
  >
    {operators.map((op) =>
      isFirst && op === Operator.OR ? null : (
        <option value={op} key={op}>
          {isFirst && op === Operator.AND ? '' : op}
        </option>
      )
    )}
  </select>
);

export default LogicalOperator;
