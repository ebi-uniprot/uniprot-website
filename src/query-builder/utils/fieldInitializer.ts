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
  if (field.id === 'id_all') {
    return initialValue?.id_all || '';
  }
  // no value? bail
  if (!(initialValue && initialValue[field.id])) {
    return '';
  }
  // parse and validate presence of queryBit
  const match = new RegExp(`^\\(${field.term}:(\\w*)\\)$`).exec(
    initialValue[field.id]
  );
  // invalid? bail
  if (!match) {
    return '';
  }
  const [, value] = match;

  // NOTE: is all the following basically just a clause value validator?
  // regular expression matching

  // regex is present in the field description? try to match extracted value
  if (field.regex && field.regex !== undefined) {
    const { regex } = field;
    let re: RegExp;
    if (regex.startsWith('(?i)')) {
      re = new RegExp(regex.replace('(?i)', 'i'));
    } else {
      re = new RegExp(regex);
    }
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

  if (field.fieldType === FieldType.range) {
    const [, from = '', to = ''] =
      value.match(
        field.dataType === DataType.date ? dateRange : integerRange
      ) || [];
    return [from, to];
  }

  return value;
};

export default initializer;
