import React, { useEffect, useState } from 'react';

import { QueryBit, SearchTermType } from '../types/searchTypes';

// const createSimpleSubquery = (
//   searchTerm: SearchTermType,
//   queryInput: Input
// ) => {
//   const { itemType, term, valuePrefix } = searchTerm;
//   const { stringValue = '', id } = queryInput;
//   const stringValueTrimmed = stringValue.trim();
//   if (!stringValueTrimmed) {
//     throw new Error('Value not provided in query');
//   }
//   if (term === 'All') {
//     return stringValueTrimmed;
//   }
//   const termString = createTermString(term, itemType, stringValueTrimmed);
//   const valueString = createValueString(
//     term,
//     valuePrefix,
//     stringValueTrimmed,
//     id
//   );
//   return `(${termString}${valueString})`;
// };

const TextField: React.FC<{
  field: SearchTermType;
  type: string;
  initialValue?: string;
  handleChange: (queryBit: QueryBit) => void;
}> = ({ field, type, handleChange, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value.length > 0) {
      handleChange({ [field.id]: `(${field.term}:${value?.trim()})` });
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
