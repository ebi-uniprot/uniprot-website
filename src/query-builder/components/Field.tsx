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
};

const Field: FC<FieldProps> = ({ field, handleChange }: FieldProps) => {
  const { dataType, fieldType } = field;

  let GenericField: FC<FieldProps & { initialValue?: QueryBit }>;

  switch (true) {
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
    case dataType === DataType.string && field.autoComplete:
      GenericField = AutocompleteField;
      break;
    case dataType === DataType.string:
    case dataType === DataType.integer:
    default:
      GenericField = TextField;
  }

  return <GenericField field={field} handleChange={handleChange} />;
};

export default Field;
