import { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';
import { FieldProps } from './Field';

const RangeField = ({ field, handleChange, initialValue }: FieldProps) => {
  const [[from, to], setRange] = useState<[from: string, to: string]>(() => {
    const range = initializer(field, initialValue);
    return Array.isArray(range) ? range : ['', ''];
  });

  useEffect(() => {
    const fromTrimmed = from.trim();
    const toTrimmed = to.trim();
    if ((fromTrimmed || toTrimmed) && field.term) {
      handleChange({
        [field.term]: `[${fromTrimmed || '*'} TO ${toTrimmed || '*'}]`,
      });
    }
  }, [field, handleChange, from, to]);

  return (
    <>
      <label>
        From
        <input
          data-testid="range-field-from-input"
          type={field.dataType === 'date' ? 'date' : 'number'}
          onChange={({ target: { value: from } }) =>
            setRange(([, to]) => [from, to])
          }
          placeholder="0"
          value={from === '*' ? '' : from}
          aria-label="range input, from value"
        />
      </label>
      <label>
        To
        <input
          data-testid="range-field-to-input"
          type={field.dataType === 'date' ? 'date' : 'number'}
          onChange={({ target: { value: to } }) =>
            setRange(([from]) => [from, to])
          }
          placeholder="100"
          value={to === '*' ? '' : to}
          aria-label="range input, to value"
        />
      </label>
    </>
  );
};

export default RangeField;
