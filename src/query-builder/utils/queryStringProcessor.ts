import { Clause, Operator, ItemType, DataType } from '../types/searchTypes';

export const createTermString = (
  term: string | undefined,
  itemType: ItemType,
  stringValue = ''
) => {
  if (term === undefined) {
    throw new Error('term is undefined');
  }
  if (term === 'xref' && stringValue === '*') {
    return 'database:';
  }
  return `${term}${term ? ':' : ''}`;
};

export const stringify = (clauses: Clause[] = []): string =>
  clauses.reduce((queryAccumulator: string, clause: Clause) => {
    const query = Object.values(clause.queryBits);

    let queryJoined = query.join(` ${Operator.AND} `);
    if (query.length > 1) {
      queryJoined = `(${queryJoined})`;
    }

    let logicOperator = '';
    if (queryAccumulator.length > 0 && query.length > 0) {
      logicOperator = ` ${clause.logicOperator} `;
    } else if (
      queryAccumulator.length === 0 &&
      (clause.logicOperator as string) === Operator.NOT
    ) {
      logicOperator = `${clause.logicOperator} `;
    }

    return `${queryAccumulator}${logicOperator}${queryJoined}`;
  }, '');

const clauseSplitter = / *(AND|OR|NOT) +/;
const clauseMatcher = /^\(*(\w+):"?([^")]+)"?\)*$/;
const splitClause = (clause: string) => {
  const match = clauseMatcher.exec(clause);
  if (!match) {
    return ['All', clause];
  }
  return [match[1], match[2]];
};
// const quotedId = /:"[^") ]+"\)*$/;
const evidenceKey = /^(\w\wev_)/;
// const rangeValue = /^\[(.+) TO (.+)\]$/;
// const getRangedValue = (value: string) => {
//   const match = rangeValue.exec(value);
//   if (!match) {
//     return;
//   }
//   // eslint-disable-next-line consistent-return
//   return { rangeFrom: match[1], rangeTo: match[2] };
// };
const searchTermReplacer = /(cc|ft(len)?)_/;

const getEmptyClause = (): Clause => ({
  id: '',
  searchTerm: {
    id: '',
    term: '',
    label: '',
    itemType: ItemType.single,
    dataType: DataType.string,
  },
  queryBits: {},
  logicOperator: Operator.AND,
});

export const parse = (queryString = ''): Clause[] => {
  // split querystring on all the recognised operators
  const split = queryString.split(clauseSplitter);

  const clauses: Clause[] = [];
  let currentClause = getEmptyClause();
  for (const [index, chunk] of split.entries()) {
    if (index % 2) {
      // for every odd item in the split string we should get a new clause
      // starting with an operator
      currentClause = getEmptyClause();
      currentClause.logicOperator = chunk as Operator;
    } else {
      if (!chunk && index === 0) {
        // that's normal when the string starts with an operator, just skip it
        continue; // eslint-disable-line no-continue
      }
      // for every other item (even) should be the content of the clause
      // const [key, value] = splitClause(chunk);
      const [key] = splitClause(chunk);

      // item type
      // if (key.startsWith('cc_')) {
      //   currentClause.searchTerm.itemType = ItemType.comment;
      // } else if (key.startsWith('ft')) {
      //   currentClause.searchTerm.itemType = ItemType.feature;
      // } else if (key === 'xref') {
      //   currentClause.searchTerm.itemType = ItemType.database;
      // }

      // evidence
      if (evidenceKey.test(key)) {
        // if it's an evidence key, mopdify the last inserted clause and skip
        // const prevClause = clauses[clauses.length - 1];
        // prevClause.searchTerm.hasEvidence = true;
        // prevClause.queryInput.evidenceValue = value;
        continue; // eslint-disable-line no-continue
      }

      // term
      currentClause.searchTerm.term = key.replace(searchTermReplacer, '');

      // const range = getRangedValue(value);
      // if (range) {
      //   // range
      //   currentClause.queryInput = range;
      // } else if (currentClause.searchTerm.itemType === ItemType.database) {
      //   //   // cross-references
      //   if (value.includes('-')) {
      //     // database references
      //     const [prefix, ...rest] = value.split('-');
      //     currentClause.searchTerm.valuePrefix = prefix;
      //     currentClause.queryInput.stringValue = rest.join('-');
      //   } else {
      //     // any other references
      //     currentClause.searchTerm.valuePrefix = 'any';
      //     currentClause.queryInput.stringValue = value;
      //   }
      // } else {
      //   // "default"
      //   currentClause.queryInput.stringValue = value;
      //   if (quotedId.test(chunk)) {
      //     // if it's an ID and not just a full-text
      //     currentClause.queryInput.id = value;
      //   }
      // }

      clauses.push(currentClause);
    }
  }

  return clauses;
};
