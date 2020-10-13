import React from 'react';

import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';
import EvidenceField from './EvidenceField';
import AutocompleteField from './AutocompleteField';

import {
  DataType,
  FieldType,
  QueryBit,
  SearchTermType,
} from '../types/searchTypes';

type FieldProps = {
  field: SearchTermType;
  handleChange: (updatedQueryBit: QueryBit) => void;
};

const Field = ({ field, handleChange }: FieldProps) => {
  const { dataType, fieldType } = field;

  if (dataType === DataType.enum || dataType === DataType.boolean) {
    return <EnumField field={field} handleChange={handleChange} />;
  }
  if (dataType === DataType.date) {
    return <RangeField field={field} handleChange={handleChange} type="date" />;
  }
  if (dataType === DataType.string && fieldType === FieldType.evidence) {
    return <EvidenceField field={field} handleChange={handleChange} />;
  }
  if (dataType === DataType.string && field.autoComplete) {
    return <AutocompleteField field={field} handleChange={handleChange} />;
  }
  if (dataType === DataType.string) {
    return <TextField field={field} handleChange={handleChange} type="text" />;
  }
  if (dataType === DataType.integer && fieldType === FieldType.range) {
    return (
      <RangeField field={field} handleChange={handleChange} type="number" />
    );
  }
  if (dataType === DataType.integer) {
    return (
      <TextField field={field} handleChange={handleChange} type="number" />
    );
  }
  return null;
};

export default Field;
