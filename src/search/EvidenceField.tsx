import React, { Fragment } from 'react';
import { EvidenceDataPoint } from './types/searchTypes';

type EvidenceFieldProps = {
  value: string | undefined;
  handleChange: (value: string) => void;
  data: EvidenceDataPoint[];
};

const EvidenceField: React.FC<EvidenceFieldProps> = ({
  value = '',
  handleChange,
  data = [],
}) => {
  if (!data) {
    return null;
  }

  return (
    <Fragment>
      <label htmlFor="evidence_select">
        Evidence
        <select
          id="evidence_select"
          data-testid="evidence-select"
          value={value}
          onChange={e => handleChange(e.target.value)}
        >
          {data.map(group => (
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
    </Fragment>
  );
};

export default EvidenceField;
