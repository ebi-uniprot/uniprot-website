import { QueryBit, SearchTermType } from '../types/searchTypes';

const initializer = (field: SearchTermType, initialValue?: QueryBit) => {
  if (!(initialValue && initialValue[field.term])) {
    console.log(field.term, 'no initial value');
    return '';
  }
  const match = new RegExp(`^\\(${field.term}:(\\w*)\\)$`).exec(
    initialValue[field.term]
  );
  if (!match) {
    console.log(field.term, 'invalid queryBit');
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
      console.log(field.term, 'invalid value (regex)');
      return '';
    }
  }
  // enum matching
  if (field.values && Array.isArray(field.values)) {
    if (field.values.map(({ value }) => value).includes(value)) {
      console.log(field.term, 'invalid value (values)');
    }
  }

  return value;
};

export default initializer;
