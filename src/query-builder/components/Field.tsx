import { FC } from 'react';

import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';
import EvidenceField from './EvidenceField';
import AutocompleteField from './AutocompleteField';

import { QueryBit, SearchTermType } from '../types/searchTypes';

export type FieldProps = {
  field: SearchTermType;
  handleChange: (updatedQueryBit: QueryBit, reset?: boolean) => void;
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
    case dataType === 'enum' || dataType === 'boolean':
      GenericField = EnumField;
      break;
    case dataType === 'date':
    case dataType === 'integer' && fieldType === 'range':
      GenericField = RangeField;
      break;
    case dataType === 'string' && fieldType === 'evidence':
      GenericField = EvidenceField;
      break;
    case dataType === 'string':
    case dataType === 'integer':
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

export default Field;
