import React, { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import { QueryBit, SearchTermType } from '../types/searchTypes';

// TODO add that back in
//     // The API will run more quickly when all database entries are
//     // requested by the user if xref-X:* becomes database:X
//     else if (stringValue === '*') {
//       valueString = valuePrefix;
//     }

const getStringValue = (value: string, prefix?: string) =>
  value.includes(' ')
    ? `"${prefix ? `${prefix}` : ''}${value?.trim()}"`
    : `${prefix ? `${prefix}` : ''}${value?.trim()}`;

const TextField: React.FC<{
  field: SearchTermType;
  type: string;
  initialValue?: QueryBit;
  handleChange: (queryBit: QueryBit) => void;
}> = ({ field, type, handleChange, initialValue }) => {
  const [value, setValue] = useState(() => initializer(field, initialValue));

  useEffect(() => {
    if (value.length > 0) {
      if (field.term === 'All') {
        handleChange({
          [field.id]: value?.trim(),
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
