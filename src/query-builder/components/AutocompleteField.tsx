import React, { useEffect, useState } from 'react';

import initializer from '../utils/fieldInitializer';

import AutocompleteWrapper from './AutocompleteWrapper';

import { QueryBit, SearchTermType } from '../types/searchTypes';

const AutocompleteField: React.FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  const [value, setValue] = useState(() => initializer(field, initialValue));
  const [selectedId, setSelectedId] = useState<string | null>();

  const { autoComplete, term, label, id, autoCompleteQueryTerm } = field;

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
