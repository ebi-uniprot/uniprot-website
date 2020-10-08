import React from 'react';
import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';
import AutocompleteWrapper from './AutocompleteWrapper';
import {
  SearchTermType,
  Input,
  DataType,
  FieldType,
} from '../types/searchTypes';
import EvidenceField from './EvidenceField';

type FieldProps = {
  field: SearchTermType;
  handleInputChange: (value: string, id?: string) => void;
  handleRangeInputChange: (value: string, from?: boolean) => void;
  handleEvidenceChange: (value: string) => void;
  queryInput: Input;
};

const Field = ({
  field,
  handleInputChange,
  handleRangeInputChange,
  handleEvidenceChange,
  queryInput,
}: FieldProps) => {
  const { dataType, fieldType } = field;

  if (dataType === DataType.enum || dataType === DataType.boolean) {
    return (
      <EnumField
        field={field}
        handleChange={handleInputChange}
        value={queryInput ? queryInput.stringValue : ''}
      />
    );
  }
  if (dataType === DataType.date) {
    return (
      <RangeField
        type="date"
        field={field}
        handleChange={handleRangeInputChange}
        rangeFrom={queryInput.rangeFrom}
        rangeTo={queryInput.rangeTo}
      />
    );
  }
  if (dataType === DataType.string && fieldType === FieldType.evidence) {
    return (
      <EvidenceField
        handleChange={(value: string) => handleEvidenceChange(value)}
        value={queryInput.evidenceValue}
        data={field.evidenceGroups}
      />
    );
  }
  if (dataType === DataType.string && field.autoComplete) {
    return (
      <AutocompleteWrapper
        url={field.autoComplete}
        onSelect={handleInputChange}
        title={field.label}
        value={queryInput.stringValue}
      />
    );
  }
  if (dataType === DataType.string) {
    return (
      <TextField
        field={field}
        handleChange={handleInputChange}
        type="text"
        value={queryInput.stringValue}
      />
    );
  }
  if (dataType === DataType.integer && fieldType === FieldType.range) {
    return (
      <RangeField
        field={field}
        type="number"
        handleChange={(value, isFrom) => handleRangeInputChange(value, isFrom)}
        rangeFrom={queryInput.rangeFrom}
        rangeTo={queryInput.rangeTo}
      />
    );
  }
  if (dataType === DataType.integer) {
    return (
      <TextField
        field={field}
        type="number"
        handleChange={(value) => handleInputChange(value)}
        value={queryInput.stringValue}
      />
    );
  }
  return null;
};

export default Field;
