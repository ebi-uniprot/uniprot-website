import React from 'react';
import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';
import AutocompleteWrapper from './AutocompleteWrapper';
import {
  DataType,
  FieldType,
  QueryBit,
  SearchTermType,
} from '../types/searchTypes';
import EvidenceField from './EvidenceField';

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
    return <RangeField type="date" field={field} handleChange={handleChange} />;
  }
  if (dataType === DataType.string && fieldType === FieldType.evidence) {
    return <EvidenceField handleChange={handleChange} field={field} />;
  }
  // if (dataType === DataType.string && field.autoComplete) {
  //   return (
  //     <AutocompleteWrapper
  //       url={field.autoComplete}
  //       onSelect={handleInputChange}
  //       title={field.label}
  //       value={queryInput.stringValue}
  //     />
  //   );
  // }
  if (dataType === DataType.string) {
    return <TextField field={field} handleChange={handleChange} type="text" />;
  }
  if (dataType === DataType.integer && fieldType === FieldType.range) {
    return (
      <RangeField field={field} type="number" handleChange={handleChange} />
    );
  }
  if (dataType === DataType.integer) {
    return (
      <TextField field={field} type="number" handleChange={handleChange} />
    );
  }
  return null;
};

export default Field;
