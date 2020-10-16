import React, { useEffect, useState } from 'react';

import AutocompleteWrapper from './AutocompleteWrapper';

import initializer from '../utils/fieldInitializer';

import { QueryBit, SearchTermType } from '../types/searchTypes';

const AutocompleteField: React.FC<{
  field: SearchTermType;
  handleChange: (queryBit: QueryBit, reset?: boolean) => void;
  initialValue?: QueryBit;
}> = ({ field, handleChange, initialValue }) => {
  const [value, setValue] = useState(
    () => initializer(field, initialValue) as string
  );
  const [selectedId, setSelectedId] = useState<string | null>();

  const { autoComplete, term, label, id, autoCompleteQueryTerm } = field;

  const handleSelect = (path: string, autocompleteSelectedId?: string) => {
    setValue(path);
    setSelectedId(autocompleteSelectedId);
  };

  useEffect(() => {
    if (selectedId && autoCompleteQueryTerm) {
      handleChange({ [autoCompleteQueryTerm]: selectedId }, true);
    } else if (value) {
      handleChange({ [term]: value }, true);
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
