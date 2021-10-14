import {
  DataType,
  FieldType,
  QueryBit,
  SearchTermType,
} from '../types/searchTypes';

const integerRange = /^\[(\*|-?\d+) TO (\*|-?\d+)\]$/;
const dateRange = /^\[(\*|\d{4}-\d{2}-\d{2}) TO (\*|\d{4}-\d{2}-\d{2})\]$/;

const initializer = (
  field: SearchTermType,
  initialValue?: QueryBit
): string | [from: string, to: string] => {
  // specific case for free text search
  if (field.term === 'All') {
    return initialValue?.All || '';
  }

  if (initialValue && field.id === 'go_evidence') {
    return initialValue.go_evidence;
  }

  if (field.term === 'xref' && initialValue?.database) {
    return '*';
  }

  // Deal with autocomplete fields (they use 'autoCompleteQueryTerm')
  // instead of 'term'
  if (
    initialValue &&
    field.autoCompleteQueryTerm &&
    initialValue[field.autoCompleteQueryTerm]
  ) {
    return initialValue[field.autoCompleteQueryTerm];
  }

  // no value? bail
  if (!(initialValue && initialValue[field.term])) {
    return '';
  }

  const value = initialValue[field.term];

  // NOTE: is all the following basically just a clause value validator?
  // regular expression matching

  // regex is present in the field description? try to match extracted value
  if (field.regex && field.regex !== undefined) {
    const { regex } = field;

    const cleanRegex = regex.replace('(?i)', '');
    const re = new RegExp(cleanRegex, regex === cleanRegex ? undefined : 'i');

    // doesn't match regular expression? bail
    if (!re.test(value)) {
      return '';
    }
  }
  // possible values are present in the field description? check is included
  if (field.values && Array.isArray(field.values)) {
    if (!field.values.map(({ value }) => value).includes(value)) {
      // isn't included in possible values? bail
      return '';
    }
  }

  if (field.fieldType === 'range') {
    const [, from = '', to = ''] =
      value.match(field.dataType === 'date' ? dateRange : integerRange) || [];
    return [from, to];
  }

  return value;
};

export default initializer;
