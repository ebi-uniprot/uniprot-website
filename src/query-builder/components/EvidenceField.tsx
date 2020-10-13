import React, { useEffect, useState } from 'react';
import { QueryBit, SearchTermType } from '../types/searchTypes';
import initializer from '../utils/fieldInitializer';

const EvidenceField: React.FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  const [value, setValue] = useState(() => initializer(field, initialValue));

  useEffect(() => {
    if (value.length > 0) {
      handleChange({ [field.id]: `(${field.term}:${value?.trim()})` });
    }
  }, [field, value, handleChange]);

  return (
    <label htmlFor="evidence_select">
      Evidence
      <select
        id="evidence_select"
        data-testid="evidence-select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {field.evidenceGroups?.map((group) => (
          <optgroup label={group.groupName} key={group.groupName}>
            {group.items.map((item: { code: string; name: string }) => (
              <option value={item.code} key={item.code}>
                {item.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
};

export default EvidenceField;
