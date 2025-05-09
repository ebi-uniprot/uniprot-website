import { useEffect, useState } from 'react';

import { QueryBit, SearchTermType } from '../types/searchTypes';
import initializer from '../utils/fieldInitializer';

export type GoEvidenceFieldProps = {
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
};

const GoEvidenceField = ({
  field,
  handleChange,
  initialValue,
}: GoEvidenceFieldProps) => {
  const [value, setValue] = useState(
    () => initializer(field, initialValue) as string
  );

  useEffect(() => {
    const trimmed = value?.trim();
    if (trimmed) {
      // GO has term:go for both GO-ID and evidence so use go_evidence for the query bit key instead
      const queryBitKey =
        field.id === 'go_evidence' ? 'go_evidence' : field.term;
      handleChange({ [queryBitKey]: trimmed });
    }
  }, [field, value, handleChange]);

  return (
    <label>
      Evidence
      <select value={value} onChange={(e) => setValue(e.target.value)}>
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

export default GoEvidenceField;
