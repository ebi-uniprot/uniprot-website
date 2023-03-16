import { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import { QueryBit, SearchTermType } from '../types/searchTypes';

export type ExperimentalEvidenceFieldProps = {
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
};

const experimentalEvidenceValues = [
  {
    name: 'Any',
    value: 'false',
  },
  {
    name: 'Experimental',
    value: 'true',
  },
];

const ExperimentalEvidenceField = ({
  field,
  handleChange,
  initialValue,
}: ExperimentalEvidenceFieldProps) => {
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
      Evidence
      <select onChange={(e) => setValue(e.target.value)} value={value}>
        {experimentalEvidenceValues.map((item) => (
          <option value={item.value} key={`select_${item.value}`}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ExperimentalEvidenceField;
