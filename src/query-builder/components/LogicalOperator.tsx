import { Operator } from '../types/searchTypes';

const operators: Operator[] = [Operator.AND, Operator.OR, Operator.NOT];

const LogicalOperator = ({
  value,
  handleChange,
}: {
  value: Operator;
  handleChange: (value: Operator) => void;
}) => (
  <select
    className="query-builder__logic"
    value={value}
    data-testid="query-builder-logic-select"
    onChange={(e) => handleChange(e.target.value as Operator)}
    aria-label="logical operator"
  >
    {operators.map((op) => (
      <option value={op} key={op}>
        {op}
      </option>
    ))}
  </select>
);

export default LogicalOperator;
