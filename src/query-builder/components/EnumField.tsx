import React, { useEffect, useState } from 'react';
import { QueryBit, SearchTermType } from '../types/searchTypes';

const initializer = (field: SearchTermType, initialValue?: QueryBit) => () => {
  if (!(initialValue && initialValue[field.term])) {
    console.log(field.term, 'no initial value');
    return '';
  }
  const match = new RegExp(`^\\(${'fragment'}:(\\w*)\\)$`).exec(
    initialValue[field.term]
  );
  if (!match) {
    console.log(field.term, 'invalid queryBit');
    return '';
  }
  const [, value] = match;

  // regular expression matching
  if (field.regex && field.regex !== undefined) {
    const { regex } = field;
    let re: RegExp;
    if (regex.startsWith('(?i)')) {
      re = new RegExp(regex.replace('(?i)', 'i'));
    } else {
      re = new RegExp(regex);
    }
    if (!re.test(value)) {
      console.log(field.term, 'invalid value (regex)');
      return '';
    }
  }
  // enum matching
  if (field.values && Array.isArray(field.values)) {
    if (field.values.map(({ value }) => value).includes(value)) {
      console.log(field.term, 'invalid value (values)');
    }
  }

  return value;
};

const EnumField: React.FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  // should initialValue be initialised to the first item?
  const [value, setValue] = useState(initializer(field, initialValue));

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
