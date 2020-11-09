import React, { FC } from 'react';

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
  initialValue?: QueryBit;
};

const Field: FC<FieldProps> = ({
  field,
  handleChange,
  initialValue,
}: FieldProps) => {
  const { dataType, fieldType, autoComplete } = field;
  let GenericField: FC<FieldProps>;

  switch (true) {
    case Boolean(autoComplete):
      GenericField = AutocompleteField;
      break;
    case dataType === DataType.enum || dataType === DataType.boolean:
      GenericField = EnumField;
      break;
    case dataType === DataType.date:
    case dataType === DataType.integer && fieldType === FieldType.range:
      GenericField = RangeField;
      break;
    case dataType === DataType.string && fieldType === FieldType.evidence:
      GenericField = EvidenceField;
      break;
    case dataType === DataType.string:
    case dataType === DataType.integer:
      GenericField = TextField;
      break;
    default:
      return null;
  }

  return (
    <GenericField
      field={field}
      handleChange={handleChange}
      initialValue={initialValue}
    />
  );
};

Field.defaultProps = {
  initialValue: undefined,
};

export default Field;
