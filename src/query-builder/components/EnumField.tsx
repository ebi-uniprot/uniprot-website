import React, { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import { QueryBit, SearchTermType } from '../types/searchTypes';

const EnumField: React.FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  // should initialValue be initialised to the first item?
  const [value, setValue] = useState(() => initializer(field, initialValue));

  useEffect(() => {
    if (value.length > 0) {
      handleChange({ [field.id]: `(${field.term}:${value?.trim()})` });
    }
  }, [field, value, handleChange]);

  return (
    <label htmlFor={`select_${field.term}`}>
      {field.label}
      <select
        onChange={(e) => setValue(e.target.value)}
        id={`select_${field.term}`}
        data-testid="enum-field-select"
        value={value}
      >
        {field.values &&
          field.values.map((item) => (
            <option value={item.value} key={`select_${item.value}`}>
              {item.name}
            </option>
          ))}
      </select>
    </label>
  );
};

export default EnumField;
