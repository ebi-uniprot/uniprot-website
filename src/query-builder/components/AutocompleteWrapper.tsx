import { FC, useEffect, useCallback, useState } from 'react';
import { Autocomplete } from 'franklin-sites';

import fetchData from '../../shared/utils/fetchData';
import { getSuggesterUrl } from '../../shared/config/apiUrls';
import useSafeState from '../../shared/hooks/useSafeState';

type AutocompleteWrapperProps = {
  url: string;
  onSelect: (path: string, id?: string) => void;
  title: string;
  placeholder?: string;
  value?: string;
  clearOnSelect?: boolean;
};

type Suggestion = {
  value: string;
  id: string;
};

export type Suggestions = {
  dictionary: string;
  query: string;
  suggestions: Suggestion[];
};

type SelectValue = {
  id: string;
  itemLabel: string;
  pathLabel: string;
  apiId?: string;
};

const minAPISuggesterChars = 3;

export const prepareData = (suggestions: Suggestion[]) =>
  suggestions.map(
    (suggestion: Suggestion): SelectValue => ({
      pathLabel: `${suggestion.value} [${suggestion.id}]`,
      itemLabel: suggestion.value,
      apiId: suggestion.id,
      id: suggestion.id,
    })
  );

const AutocompleteWrapper: FC<AutocompleteWrapperProps> = ({
  url,
  onSelect,
  title,
  placeholder = '',
  value,
  clearOnSelect = false,
}) => {
  const [data, setData] = useSafeState<SelectValue[]>([]);
  const [previousTextInputValue, setPreviousTextInputValue] = useState('');
  const [loading, setLoading] = useSafeState(false);

  const handleSelect = useCallback(
    (inputValue: SelectValue | string) => {
      if (typeof inputValue === 'string') {
        onSelect(inputValue);
      } else {
        onSelect(inputValue.pathLabel, inputValue.apiId);
      }
    },
    [onSelect]
  );

  const fetchOptions = useCallback(
    (textInputValue: string) => {
      if (textInputValue.length < minAPISuggesterChars) {
        setData([]);
      } else {
        const suggesterUrl = getSuggesterUrl(url, textInputValue);
        setLoading(true);
        fetchData<Suggestions>(suggesterUrl)
          .then((response) => {
            setData(prepareData(response.data.suggestions));
            setLoading(false);
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.error(e));
      }
    },
    [setData, setLoading, url]
  );

  useEffect(() => {
    fetchOptions(previousTextInputValue);
  }, [fetchOptions, previousTextInputValue]);

  const handleChange = useCallback(
    (textInputValue: string) => {
      handleSelect(textInputValue);
      setPreviousTextInputValue(textInputValue.trim());
    },
    [handleSelect]
  );

  return (
    <label>
      {title}
      <Autocomplete
        data={data}
        onSelect={handleSelect}
        onChange={handleChange}
        filter={false}
        value={value}
        placeholder={placeholder}
        minCharsToShowDropdown={minAPISuggesterChars}
        clearOnSelect={clearOnSelect}
        isLoading={loading}
      />
    </label>
  );
};

export default AutocompleteWrapper;
