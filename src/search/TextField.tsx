import React from 'react';
import { SearchTermType } from './types/searchTypes';

type TextFieldProps = {
  field: SearchTermType;
  type: string;
  value?: string;
  handleChange: (value: string) => void;
};

const TextField = ({
  field,
  type,
  handleChange,
  value = '',
}: TextFieldProps) => (
  <div className="advanced-search__inputs" key={field.term}>
    <label htmlFor={`input_${field.term}`}>
      {field.label}
      <input
        id={`input_${field.term}`}
        type={type}
        value={value}
        onChange={e => handleChange(e.target.value)}
        placeholder={field.example}
      />
    </label>
  </div>
);

export default TextField;
