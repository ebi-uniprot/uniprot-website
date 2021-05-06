import { useEffect, useState, FC } from 'react';

import initializer from '../utils/fieldInitializer';

import { DataType, QueryBit, SearchTermType } from '../types/searchTypes';

const TextField: FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  const [value, setValue] = useState(
    () => initializer(field, initialValue) as string
  );

  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed.length) {
      if (field.valuePrefix && field.term === 'xref' && trimmed === '*') {
        // Query is faster with this hack
        // NOTE: Is this even working?..
        // Remove last '-' from the the prefix, and don't include '*'
        handleChange({ xref: `${field.valuePrefix.replace(/-$/, '')}` });
      } else {
        handleChange({
          [field.term]: `${field.valuePrefix || ''}${trimmed}`,
        });
      }
    }
  }, [field, value, handleChange]);

  return (
    <label>
      {field.label}
      <input
        type={field.dataType === DataType.integer ? 'number' : 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={field.example}
      />
    </label>
  );
};

export default TextField;
