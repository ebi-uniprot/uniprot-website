import { FC } from 'react';

import RangeField from './RangeField';
import EnumOrBooleanField from './EnumOrBooleanField';
import TextField from './TextField';
import GoEvidenceField from './GoEvidenceField';
import ExperimentalEvidenceField from './ExperimentalEvidenceField';
import AutocompleteField from './AutocompleteField';

import { QueryBit, SearchTermType } from '../types/searchTypes';

export type FieldProps = {
  field: SearchTermType;
  handleChange: (updatedQueryBit: QueryBit, reset?: boolean) => void;
  initialValue?: QueryBit;
};

const Field: FC<React.PropsWithChildren<FieldProps>> = ({
  field,
  handleChange,
  initialValue,
}: FieldProps) => {
  const { dataType, fieldType, autoComplete } = field;
  let GenericField: FC<React.PropsWithChildren<FieldProps>>;

  switch (true) {
    case Boolean(autoComplete):
      GenericField = AutocompleteField;
      break;
    case dataType === 'enum' || dataType === 'boolean':
      GenericField = EnumOrBooleanField;
      break;
    case dataType === 'date':
    case dataType === 'integer' && fieldType === 'range':
      GenericField = RangeField;
      break;
    case dataType === 'string' && fieldType === 'experimental_evidence':
      GenericField = ExperimentalEvidenceField;
      break;
    case dataType === 'string' && fieldType === 'evidence':
      GenericField = GoEvidenceField;
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
