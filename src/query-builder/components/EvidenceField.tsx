import React, { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import { QueryBit, SearchTermType } from '../types/searchTypes';

const EvidenceField: React.FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
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
