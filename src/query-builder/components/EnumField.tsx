import { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import { FieldProps } from './Field';

const EnumField = ({ field, handleChange, initialValue }: FieldProps) => {
  // should initialValue be initialised to the first item?
  const [value, setValue] = useState(
    () => initializer(field, initialValue) as string
  );

  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed) {
      handleChange({ [field.term]: trimmed });
    }
  }, [field, value, handleChange]);

  return (
    <label>
      {field.label}
      <select onChange={(e) => setValue(e.target.value)} value={value}>
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
