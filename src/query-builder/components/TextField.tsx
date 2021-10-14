import { useEffect, useState, FC } from 'react';

import initializer from '../utils/fieldInitializer';

import { QueryBit, SearchTermType } from '../types/searchTypes';

export type TextFieldTypes = {
  field: SearchTermType;
  handleChange: (queryBit: QueryBit, reset?: boolean) => void;
  initialValue?: QueryBit;
};

const TextField: FC<TextFieldTypes> = ({
  field,
  handleChange,
  initialValue,
}) => {
  const [value, setValue] = useState(
    () => initializer(field, initialValue) as string
  );

  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed.length) {
      // Query is faster with this hack: using 'database' instead
      // Remove last '-' from the the prefix, and don't include '*'
      const queryBit =
        field.valuePrefix && field.term === 'xref' && trimmed === '*'
          ? { database: `${field.valuePrefix.replace(/-$/, '')}` }
          : {
              [field.term]: `${field.valuePrefix || ''}${trimmed}`,
            };
      handleChange(queryBit, field.term === 'xref');
    }
  }, [field, value, handleChange]);

  return (
    <label>
      {field.label}
      <input
        type={field.dataType === 'integer' ? 'number' : 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={field.example}
      />
    </label>
  );
};

export default TextField;
