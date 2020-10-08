import React from 'react';

import { SearchTermType } from '../types/searchTypes';

const TextField: React.FC<{
  field: SearchTermType;
  type: string;
  value?: string;
  handleChange: (value: string) => void;
}> = ({ field, type, handleChange, value = '' }) => (
  <label htmlFor={`input_${field.term}`}>
    {field.label}
    <input
      id={`input_${field.term}`}
      type={type}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={field.example}
    />
  </label>
);

export default TextField;
