import { type FC } from 'react';

import { type QueryBit, type SearchTermType } from '../types/searchTypes';
import AutocompleteField from './AutocompleteField';
import EnumOrBooleanField from './EnumOrBooleanField';
import ExperimentalEvidenceField from './ExperimentalEvidenceField';
import GoEvidenceField from './GoEvidenceField';
import RangeField from './RangeField';
import TextField from './TextField';

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
