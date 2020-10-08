import React from 'react';
import { SearchTermType } from '../types/searchTypes';

const EnumField: React.FC<{
  field: SearchTermType;
  handleChange: (value: string) => void;
  value?: string;
}> = ({ field, handleChange, value }) => (
  <label htmlFor={`select_${field.term}`}>
    {field.label}
    <select
      onChange={(e) => handleChange(e.target.value)}
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

export default EnumField;
