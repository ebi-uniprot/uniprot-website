import React, { Fragment } from 'react';
import { SearchTermType } from './types/searchTypes';

type EnumFieldProps = {
  field: SearchTermType;
  handleChange: (value: string) => void;
  value: string | undefined;
};

const EnumField: React.FC<EnumFieldProps> = ({
  field,
  handleChange,
  value,
}) => (
  <Fragment>
    <label htmlFor={`select_${field.term}`}>
      {field.label}
      <select
        onChange={e => handleChange(e.target.value)}
        id={`select_${field.term}`}
        data-testid="enum-field-select"
        value={value}
      >
        {field.values &&
          field.values.map(item => (
            <option value={item.value} key={`select_${item.value}`}>
              {item.name}
            </option>
          ))}
      </select>
    </label>
  </Fragment>
);

export default EnumField;
