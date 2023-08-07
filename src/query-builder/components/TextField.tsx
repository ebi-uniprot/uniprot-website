import { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import { FieldProps } from './Field';

const TextField = ({ field, handleChange, initialValue }: FieldProps) => {
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
        placeholder={
          field.example || 'Enter a term to search, or the wildcard "*"'
        }
        translate={field.example ? 'no' : undefined}
      />
    </label>
  );
};

export default TextField;
