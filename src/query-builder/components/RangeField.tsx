import React, { useEffect, useState } from 'react';

import { QueryBit, SearchTermType } from '../types/searchTypes';

const RangeField: React.FC<{
  field: SearchTermType;
  type?: string;
  handleChange: (queryBit: QueryBit) => void;
  initialRangeFrom?: string;
  initialRangeTo?: string;
}> = ({
  field,
  type,
  handleChange,
  initialRangeFrom = '',
  initialRangeTo = '',
}) => {
  const [rangeFrom, setRangeFrom] = useState(initialRangeFrom);
  const [rangeTo, setRangeTo] = useState(initialRangeTo);

  useEffect(() => {
    if (rangeFrom.length > 0 && rangeTo.length > 0) {
      handleChange({
        [field.id]: `(${
          field.term
        }:[${rangeFrom.trim()} TO ${rangeTo.trim()}])`,
      });
    }
  }, [field, handleChange, rangeFrom, rangeTo]);

  return (
    <>
      <label htmlFor={`from_input_${field.id}`}>
        From
        <input
          id={`from_input_${field.id}`}
          data-testid="range-field-from-input"
          type={type}
          onChange={(e) => setRangeFrom(e.target.value)}
          placeholder="0"
          value={rangeFrom}
        />
      </label>
      <label htmlFor={`to_input_${field.id}`}>
        To
        <input
          id={`to_input_${field.id}`}
          data-testid="range-field-to-input"
          type={type}
          onChange={(e) => setRangeTo(e.target.value)}
          placeholder="100"
          value={rangeTo}
        />
      </label>
    </>
  );
};

export default RangeField;
