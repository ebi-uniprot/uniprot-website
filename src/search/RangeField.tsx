import React, { Fragment } from 'react';
import { SearchTermType } from './types/searchTypes';

type RangeFieldProps = {
  field: SearchTermType;
  type?: string;
  handleChange: (value: string, isFrom: boolean) => void;
  rangeFrom?: string;
  rangeTo?: string;
};

const RangeField = ({
  field,
  type,
  handleChange,
  rangeFrom = '',
  rangeTo = '',
}: RangeFieldProps) => (
  <Fragment>
    <label htmlFor={`from_input_${field.id}`}>
      From
      <input
        id={`from_input_${field.id}`}
        data-testid="range-field-from-input"
        type={type}
        onChange={e => handleChange(e.target.value, true)}
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
        onChange={e => handleChange(e.target.value, false)}
        placeholder="100"
        value={rangeTo}
      />
    </label>
  </Fragment>
);
export default RangeField;
