import { v1 } from 'uuid';

import {
  Clause,
  Operator,
  ItemType,
  DataType,
  FieldType,
} from '../types/searchTypes';
import { getAllTerm } from './clause';

export const stringify = (clauses: Clause[] = []): string =>
  clauses.reduce((queryAccumulator: string, clause: Clause) => {
    const query = Object.entries(clause.queryBits);

    let queryJoined = query
      .map(([key, value]) => {
        const needsQuotes =
          // contains ' ' or ':'
          /[ :]/.test(value) &&
          // but isn't of the form '[... TO ...]';
          !(value.startsWith('[') && value.endsWith(']'));
        const quote = needsQuotes ? '"' : '';

        // free-text search
        if (key === 'All') {
          return `${quote}${value}${quote}`;
        }
        return `(${key}:${quote}${value}${quote})`;
      })
      .join(` ${Operator.AND} `);
    if (query.length > 1) {
      queryJoined = `(${queryJoined})`;
    }

    let logicOperator = '';
    if (queryAccumulator.length && query.length) {
      logicOperator = ` ${clause.logicOperator} `;
    } else if (
      !queryAccumulator.length &&
      clause.logicOperator === Operator.NOT
    ) {
      logicOperator = `${clause.logicOperator} `;
    }

    return `${queryAccumulator}${logicOperator}${queryJoined}`;
  }, '');

const clauseSplitter = / *(AND|OR|NOT) +/;
const clauseMatcher = /^\(*(\w+):"?([^")]*)"?\)*$/;
const splitClause = (
  clause: string
): [key: string | undefined, value: string] => {
  const match = clauseMatcher.exec(clause);
  if (!match) {
    return [undefined, clause];
  }
  return [match[1], match[2]];
};
const evidenceOrLengthKey = /^(\w\w)(ev|len)_/;

const getEmptyClause = (): Clause => ({
  id: v1(),
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
          correspondingClause.queryBits[key] = value;
          continue; // eslint-disable-line no-continue
        }
      }

      // term
      currentClause.searchTerm.term = key || 'All';

      // "default"
      if (key) {
        currentClause.queryBits[key] = value;
      } else {
        // specific free-text search
        currentClause.queryBits.All = value;
        currentClause.searchTerm = getAllTerm();
      }

      clauses.push(currentClause);
    }
  }

  return clauses;
};
