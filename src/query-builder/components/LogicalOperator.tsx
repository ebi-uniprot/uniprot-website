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
}) =>
  isFirst ? (
    <span className="query-builder__logic" />
  ) : (
    <select
      className="query-builder__logic"
      value={value}
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
