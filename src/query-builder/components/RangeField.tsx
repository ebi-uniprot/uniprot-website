import React, { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import { DataType, QueryBit, SearchTermType } from '../types/searchTypes';

const RangeField: React.FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  const [[from, to], setRange] = useState<[from: string, to: string]>(() => {
    const range = initializer(field, initialValue);
    return Array.isArray(range) ? range : ['', ''];
  });

  useEffect(() => {
    const fromTrimmed = from.trim();
    const toTrimmed = to.trim();
    if (fromTrimmed || toTrimmed) {
      handleChange({
        [field.term]: `[${fromTrimmed || '*'} TO ${toTrimmed || '*'}]`,
      });
    }
  }, [field, handleChange, from, to]);

  return (
    <>
      <label htmlFor={`from_input_${field.id}`}>
        From
        <input
          id={`from_input_${field.id}`}
          data-testid="range-field-from-input"
          type={field.dataType === DataType.date ? 'date' : 'number'}
          onChange={({ target: { value: from } }) =>
            setRange(([, to]) => [from, to])
          }
          placeholder="0"
          value={from === '*' ? '' : from}
        />
      </label>
      <label htmlFor={`to_input_${field.id}`}>
        To
        <input
          id={`to_input_${field.id}`}
          data-testid="range-field-to-input"
          type={field.dataType === DataType.date ? 'date' : 'number'}
          onChange={({ target: { value: to } }) =>
            setRange(([from]) => [from, to])
          }
          placeholder="100"
          value={to === '*' ? '' : to}
        />
      </label>
    </>
  );
};

export default RangeField;
