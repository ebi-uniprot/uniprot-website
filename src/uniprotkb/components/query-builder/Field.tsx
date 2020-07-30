import React, { Fragment } from 'react';
import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';
import AutocompleteWrapper from './AutocompleteWrapper';
import { SearchTermType, Input } from '../../types/searchTypes';

type FieldProps = {
  field: SearchTermType;
  handleInputChange: (value: string, id?: string) => void;
  handleRangeInputChange: (value: string, from?: boolean) => void;
  queryInput: Input;
};

const Field = ({
  field,
  handleInputChange,
  handleRangeInputChange,
  queryInput,
}: FieldProps) => {
  const { dataType, hasRange } = field;
  let node;
  switch (dataType) {
    case 'enum':
      node = (
        <EnumField
          field={field}
          handleChange={handleInputChange}
          value={queryInput ? queryInput.stringValue : ''}
        />
      );
      break;
    case 'date':
      node = (
        <RangeField
          type="date"
          field={field}
          handleChange={handleRangeInputChange}
          rangeFrom={queryInput.rangeFrom}
          rangeTo={queryInput.rangeTo}
        />
      );
      break;
    case 'string':
      node = (
        <Fragment>
          {field.autoComplete ? (
            <AutocompleteWrapper
              url={field.autoComplete}
              onSelect={handleInputChange}
              title={field.label}
              value={queryInput.stringValue}
            />
          ) : (
            <TextField
              field={field}
              handleChange={handleInputChange}
              type="text"
              value={queryInput.stringValue}
            />
          )}
          {hasRange && String(dataType) !== 'integer' && (
            <RangeField
              field={field}
              handleChange={handleRangeInputChange}
              type="text"
              rangeFrom={queryInput.rangeFrom}
              rangeTo={queryInput.rangeTo}
            />
          )}
        </Fragment>
      );
      break;
    case 'integer':
      if (hasRange) {
        return RangeField({
          field,
          type: 'number',
          handleChange: (value, isFrom) =>
            handleRangeInputChange(value, isFrom),
          rangeFrom: queryInput.rangeFrom,
          rangeTo: queryInput.rangeTo,
        });
      }
      return TextField({
        field,
        type: 'number',
        handleChange: (value) => handleInputChange(value),
        value: queryInput.stringValue,
      });
    default:
      return null;
  }
  return <div className="advanced-search__inputs">{node}</div>;
};

export default Field;
