import React, { useEffect, useState } from 'react';
import { QueryBit, SearchTermType } from '../types/searchTypes';
import AutocompleteWrapper from './AutocompleteWrapper';

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
    } else if (value) {
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

export default AutocompleteField;
