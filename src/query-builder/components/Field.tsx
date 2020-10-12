import React, { useEffect, useState } from 'react';
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

const AutocompleteField: React.FC<{
  searchTerm: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: string;
}> = ({ searchTerm, handleChange, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [selectedId, setSelectedId] = useState<string | null>();

  const { autoComplete, term, label, id, autoCompleteQueryTerm } = searchTerm;

  const handleSelect = (path: string, autocompleteSelectedId?: string) => {
    setValue(path);
    setSelectedId(autocompleteSelectedId);
  };

  useEffect(() => {
    if (selectedId) {
      handleChange({ [id]: `(${autoCompleteQueryTerm}:"${selectedId}")` });
    } else {
      handleChange({ [id]: `(${term}:${value})` });
    }
  }, [id, term, autoCompleteQueryTerm, selectedId, value, handleChange]);

  return (
    <>
      {autoComplete && (
        <AutocompleteWrapper
          url={autoComplete}
          onSelect={handleSelect}
          title={label}
          value={value}
        />
      )}
    </>
  );
};

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
  if (dataType === DataType.string && field.autoComplete) {
    return <AutocompleteField searchTerm={field} handleChange={handleChange} />;
  }
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
