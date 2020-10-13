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
  if (field.id === 'id_all') {
    return initialValue?.id_all || '';
  }
  if (!(initialValue && initialValue[field.id])) {
    console.log(field.id, 'no initial value');
    return '';
  }
  const match = new RegExp(`^\\(${field.term}:(\\w*)\\)$`).exec(
    initialValue[field.id]
  );
  if (!match) {
    console.log(field.id, 'invalid queryBit');
    return '';
  }
  const [, value] = match;

  // NOTE: is all the following basically just a clause value validator?
  // regular expression matching
  if (field.regex && field.regex !== undefined) {
    const { regex } = field;
    let re: RegExp;
    if (regex.startsWith('(?i)')) {
      re = new RegExp(regex.replace('(?i)', 'i'));
    } else {
      re = new RegExp(regex);
    }
    if (!re.test(value)) {
      console.log(field.id, 'invalid value (regex)');
      return '';
    }
  }
  // enum matching
  if (field.values && Array.isArray(field.values)) {
    if (field.values.map(({ value }) => value).includes(value)) {
      console.log(field.id, 'invalid value (values)');
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
