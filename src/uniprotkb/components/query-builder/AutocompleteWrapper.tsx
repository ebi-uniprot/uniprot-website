import React, { Component } from 'react';
import { Autocomplete } from 'franklin-sites';
import { v1 } from 'uuid';
import fetchData from '../../../shared/utils/fetchData';
import { getSuggesterUrl } from '../../config/apiUrls';

type Props = {
  url: string;
  onSelect: Function;
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

type State = {
  data: SelectValue[];
  previousTextInputValue: string;
  isLoading: boolean;
};

type SelectValue = {
  id: string;
  itemLabel: string;
  pathLabel: string;
  apiId: string;
};

const minCharsToShowDropdown = 3;

class AutocompleteWrapper extends Component<Props, State> {
  static prepareData(suggestions: Suggestion[]) {
    return suggestions.map(
      (suggestion: Suggestion): SelectValue => ({
        pathLabel: `${suggestion.value} [${suggestion.id}]`,
        itemLabel: suggestion.value,
        apiId: suggestion.id,
        id: v1(),
      })
    );
  }

  id: string;

  constructor(props: Props) {
    super(props);
    this.state = { data: [], previousTextInputValue: '', isLoading: false };
    this.id = v1();
  }

  handleChange = (textInputValue: string) => {
    this.handleSelect(textInputValue);
    const { previousTextInputValue } = this.state;
    const trimmedTextInputValue = textInputValue.trim();
    // If there aren't enough characters then reset the state's data
    // and don't fetch suggestions.
    if (trimmedTextInputValue.trim().length < minCharsToShowDropdown) {
      this.setState({
        data: [],
        previousTextInputValue: trimmedTextInputValue,
      });
    }
    // If the previous text input and the current text input are
    // subsets of each other then don't reset the state's data. The
    // point of this check is to prevent the dropdown disappearing
    // and reappearing between successive suggester requests.
    // Fetch new suggestions after previousTextInputValue has been
    // set. Use the callback to prevent race conditions.
    else if (
      trimmedTextInputValue.includes(previousTextInputValue) ||
      previousTextInputValue.includes(trimmedTextInputValue)
    ) {
      this.setState({ previousTextInputValue: trimmedTextInputValue }, () =>
        this.fetchOptions(trimmedTextInputValue)
      );
    }
    // This is a "new" or "unrelated" text input so erase the old data
    // and then fetch the new suggestions after the state has been set.
    // Use the callback to prevent race conditions.
    else {
      this.setState(
        {
          data: [],
          previousTextInputValue: trimmedTextInputValue,
        },
        () => this.fetchOptions(trimmedTextInputValue)
      );
    }
  };

  fetchOptions = (textInputValue: string) => {
    const { url } = this.props;
    const suggesterUrl = getSuggesterUrl(url, textInputValue);
    this.setState({ isLoading: true });
    fetchData<Suggestions>(suggesterUrl)
      .then((response) =>
        AutocompleteWrapper.prepareData(response.data.suggestions)
      )
      .then((data) => this.setState({ data, isLoading: false }))
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  };

  handleSelect = (inputValue: SelectValue | string) => {
    const { onSelect } = this.props;
    if (typeof inputValue === 'string') {
      onSelect(inputValue);
    } else {
      onSelect(inputValue.pathLabel, inputValue.apiId);
    }
  };

  render() {
    const { data, isLoading } = this.state;
    const {
      title,
      value,
      clearOnSelect = false,
      placeholder = '',
    } = this.props;
    return (
      <label htmlFor={this.id}>
        {title}
        <Autocomplete
          id={this.id}
          data={data}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
          filter={false}
          value={value}
          placeholder={placeholder}
          minCharsToShowDropdown={minCharsToShowDropdown}
          clearOnSelect={clearOnSelect}
          isLoading={isLoading}
        />
      </label>
    );
  }
}

export default AutocompleteWrapper;
