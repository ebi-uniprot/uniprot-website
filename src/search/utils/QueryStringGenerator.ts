import { Clause } from '../types/searchTypes';

type IPrefixMap = {
  feature: string;
  comment: string;
  [key: string]: string;
};

const doubleQuote = (string: string) => `"${string}"`;

const getItemTypePrefix = (itemType: string) => {
  const itemTypeToPrefixMap: IPrefixMap = {
    feature: 'ft_',
    comment: 'cc_',
  };
  return itemTypeToPrefixMap[itemType] || '';
};

const getItemTypeEvidencePrefix = (itemType: string) => {
  const itemTypeToEvidencePrefixMap: IPrefixMap = {
    feature: 'ftev_',
    comment: 'ccev_',
  };
  return itemTypeToEvidencePrefixMap[itemType] || '';
};

const getItemTypeRangePrefix = (itemType: string) =>
  itemType === 'feature' ? 'ftlen_' : '';

const createTermString = (
  term: string | undefined,
  itemType: string,
  id: string | undefined,
  termSuffix: boolean | undefined,
  stringValue: string = ''
) => {
  if (term === undefined) {
    throw new Error('term is undefined');
  }
  if (term === 'xref' && stringValue === '*') {
    return 'database:';
  }
  if (termSuffix) {
    return id ? `${term}_id:` : `${term}_name:`;
  }
  const itemTypePrefix = getItemTypePrefix(itemType);
  return `${itemTypePrefix}${term}${term ? ':' : ''}`;
};

const createValueString = (
  term: string | undefined,
  valuePrefix: string | undefined,
  stringValue: string,
  id: string | undefined
) => {
  if (term === undefined) {
    throw new Error('term is undefined');
  }
  if (id) {
    return doubleQuote(id);
  }

  let valueString = stringValue;
  if (term === 'xref') {
    if (!valuePrefix) {
      throw new Error('valuePrefix not provided in xref query');
    }
    // The API will run more quickly when all database entries are
    // requested by the user if xref-X:* becomes database:X
    else if (stringValue === '*') {
      valueString = valuePrefix;
    }
    // We are testing for term=xref and valuePrefix=any because the
    // search API expects the valuePrefix to be ommited in this case.
    // eg xref:foo rather than xref_any:foo
    else if (valuePrefix !== 'any') {
      valueString = `${valuePrefix}-${stringValue}`;
    }
  }

  return valueString.includes(' ') ? doubleQuote(valueString) : valueString;
};

const createSimpleSubquery = (clause: Clause) => {
  if (clause.searchTerm.itemType === 'group') {
    throw Error('Cannot create a query with a group term.');
  }
  const { itemType, term, valuePrefix, termSuffix } = clause.searchTerm;
  const { stringValue = '', id } = clause.queryInput;
  const stringValueTrimmed = stringValue.trim();
  if (!stringValueTrimmed) {
    throw new Error('Value not provided in query');
  }
  if (term === 'All') {
    return stringValueTrimmed;
  }
  const termString = createTermString(
    term,
    itemType,
    id,
    termSuffix,
    stringValueTrimmed
  );
  const valueString = createValueString(
    term,
    valuePrefix,
    stringValueTrimmed,
    id
  );
  return `(${termString}${valueString})`;
};

const createRangeSubquery = (clause: Clause) => {
  const { term, itemType } = clause.searchTerm;
  const { rangeFrom = '', rangeTo = '' } = clause.queryInput;
  const itemTypeRangePrefix = getItemTypeRangePrefix(itemType);
  return `(${itemTypeRangePrefix}${term}:[${rangeFrom.trim()} TO ${rangeTo.trim()}])`;
};

const getEvidenceSubquery = (clause: Clause) => {
  const { evidenceValue = '' } = clause.queryInput;
  const { term, itemType } = clause.searchTerm;
  if (!evidenceValue) {
    throw new Error('Evidence value not provided');
  }
  const itemTypeEvidencePrefix = getItemTypeEvidencePrefix(itemType);
  return `(${itemTypeEvidencePrefix}${term}:${evidenceValue.trim()})`;
};

const createQueryString = (clauses: Clause[] = []): string =>
  clauses.reduce((queryAccumulator: string, clause: Clause) => {
    const query = [];
    const {
      id,
      stringValue = '',
      rangeFrom = '',
      rangeTo = '',
      evidenceValue = '',
    } = clause.queryInput;
    if (id || stringValue.trim()) {
      query.push(createSimpleSubquery(clause));
    }
    if (rangeFrom.trim() || rangeTo.trim()) {
      query.push(createRangeSubquery(clause));
    }
    if (evidenceValue.trim()) {
      query.push(getEvidenceSubquery(clause));
    }
    let queryJoined = query.join(' AND ');
    if (query.length > 1) {
      queryJoined = `(${queryJoined})`;
    }

    let logicOperator = '';
    if (queryAccumulator.length > 0 && query.length > 0) {
      logicOperator = ` ${clause.logicOperator} `;
    } else if (
      queryAccumulator.length === 0 &&
      clause.logicOperator === 'NOT'
    ) {
      logicOperator = `${clause.logicOperator} `;
    }

    return `${queryAccumulator}${logicOperator}${queryJoined}`;
  }, '');

export default createQueryString;
