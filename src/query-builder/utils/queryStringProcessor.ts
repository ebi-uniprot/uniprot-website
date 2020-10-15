import {
  Clause,
  Operator,
  ItemType,
  DataType,
  FieldType,
} from '../types/searchTypes';

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
const splitClause = (
  clause: string
): [key: string | undefined, value: string] => {
  const match = clauseMatcher.exec(clause);
  if (!match) {
    return [undefined, clause];
  }
  return [match[1], match[2]];
};
const quotedValue = /:"[^")]+"\)*$/;
const evidenceOrLengthKey = /^(\w\w)(ev|len)_/;

const getEmptyClause = (): Clause => ({
  id: '',
  searchTerm: {
    id: '',
    term: '',
    label: '',
    itemType: ItemType.single,
    dataType: DataType.string,
    fieldType: FieldType.general,
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
      const [key, value] = splitClause(chunk);

      // evidence or length
      const evidenceOrLengthMatch = key && key.match(evidenceOrLengthKey);
      if (key && evidenceOrLengthMatch) {
        const correspondingClause = clauses.find(({ searchTerm }) =>
          searchTerm.term.startsWith(evidenceOrLengthMatch[1])
        );
        if (correspondingClause) {
          // if it's an evidence or length key, mopdify the last inserted
          // corresponding clause and skip
          const isQuoted = quotedValue.test(chunk);
          correspondingClause.queryBits[key] = `(${key}:${
            isQuoted ? '"' : ''
          }${value}${isQuoted ? '"' : ''})`;
          continue; // eslint-disable-line no-continue
        }
      }

      // term
      currentClause.searchTerm.term = key || 'All';

      // "default"
      if (key) {
        const isQuoted = quotedValue.test(chunk);
        currentClause.queryBits[key] = `(${key}:${isQuoted ? '"' : ''}${value}${
          isQuoted ? '"' : ''
        })`;
      } else {
        // specific free-text search
        currentClause.queryBits.id_all = value;
      }

      clauses.push(currentClause);
    }
  }

  return clauses;
};
