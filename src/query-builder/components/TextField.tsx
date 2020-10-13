import React, { useEffect, useState } from 'react';

import { QueryBit, SearchTermType } from '../types/searchTypes';

const getStringValue = (value: string, prefix?: string) =>
  value.includes(' ')
    ? `"${prefix ? `${prefix}` : ''}${value?.trim()}"`
    : `${prefix ? `${prefix}` : ''}${value?.trim()}`;

const TextField: React.FC<{
  field: SearchTermType;
  type: string;
  initialValue?: string;
  handleChange: (queryBit: QueryBit) => void;
}> = ({ field, type, handleChange, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value.length > 0) {
      if (field.term === 'All') {
        handleChange({
          [field.id]: value?.trim(),
        });
      } else if (
        field.valuePrefix &&
        field.term === 'database' &&
        value.trim() === '*'
      ) {
        // Query is faster with this hack
        handleChange({
          [field.id]: `(${field.term}:${field.valuePrefix})`,
        });
      } else {
        handleChange({
          [field.id]: `(${field.term}:${getStringValue(
            value,
            field.valuePrefix
          )})`,
        });
      }
    }
  }, [field, value, handleChange]);

  return (
    <label htmlFor={`input_${field.term}`}>
      {field.label}
      <input
        id={`input_${field.term}`}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={field.example}
      />
    </label>
  );
};

export default TextField;
