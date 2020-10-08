import React from 'react';
import { EvidenceDataPoint } from '../types/searchTypes';

const EvidenceField: React.FC<{
  value?: string;
  handleChange: (value: string) => void;
  data?: EvidenceDataPoint[];
}> = ({ value, handleChange, data = [] }) => {
  if (!data) {
    return null;
  }
  return (
    <label htmlFor="evidence_select">
      Evidence
      <select
        id="evidence_select"
        data-testid="evidence-select"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {data.map((group) => (
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
