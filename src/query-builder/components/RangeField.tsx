import React from 'react';

import { SearchTermType } from '../types/searchTypes';

const RangeField: React.FC<{
  field: SearchTermType;
  type?: string;
  handleChange: (value: string, isFrom: boolean) => void;
  rangeFrom?: string;
  rangeTo?: string;
}> = ({ field, type, handleChange, rangeFrom = '', rangeTo = '' }) => (
  <>
    <label htmlFor={`from_input_${field.id}`}>
      From
      <input
        id={`from_input_${field.id}`}
        data-testid="range-field-from-input"
        type={type}
        onChange={(e) => handleChange(e.target.value, true)}
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
        onChange={(e) => handleChange(e.target.value, false)}
        placeholder="100"
        value={rangeTo}
      />
    </label>
  </>
);

export default RangeField;
