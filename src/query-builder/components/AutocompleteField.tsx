import { type FC, useEffect, useState } from 'react';

import { type QueryBit, type SearchTermType } from '../types/searchTypes';
import initializer from '../utils/fieldInitializer';
import AutocompleteWrapper from './AutocompleteWrapper';

const AutocompleteField: FC<
  React.PropsWithChildren<{
    field: SearchTermType;
    handleChange: (queryBit: QueryBit, reset?: boolean) => void;
    initialValue?: QueryBit;
  }>
> = ({ field, handleChange, initialValue }) => {
  const [value, setValue] = useState(
    () => initializer(field, initialValue) as string
  );
  const [selectedId, setSelectedId] = useState<string | undefined>(
    () => initializer(field, initialValue, true) as string
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
    } else if (value && term) {
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
