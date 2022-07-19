import { useEffect, useState, FC } from 'react';

import AutocompleteWrapper from './AutocompleteWrapper';

import initializer from '../utils/fieldInitializer';

import { QueryBit, SearchTermType } from '../types/searchTypes';

const AutocompleteField: FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit, reset?: boolean) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  const [value, setValue] = useState(
    () => initializer(field, initialValue) as string
  );
  const [selectedId, setSelectedId] = useState<string | undefined>(
    () => initializer(field, initialValue) as string
  );

  const { autoComplete, term, label, id, autoCompleteQueryTerm } = field;

  const handleSelect = (path: string, autocompleteSelectedId?: string) => {
    setValue(path);
    setSelectedId(autocompleteSelectedId);
  };

  useEffect(() => {
    // Don't reset for GO as we need the evidence
    const reset = term !== 'go';
    if (selectedId && autoCompleteQueryTerm) {
      handleChange({ [autoCompleteQueryTerm]: selectedId }, reset);
    } else if (value) {
      handleChange({ [term]: value }, reset);
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
          placeholder={
            field.example || 'Enter a term to search, or the wildcard "*"'
          }
        />
      )}
    </>
  );
};

export default AutocompleteField;
