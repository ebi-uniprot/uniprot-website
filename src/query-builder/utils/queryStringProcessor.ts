import { getAllTerm } from './clause';

import { Clause, Operator } from '../types/searchTypes';

const reExperimentalEvidenceKey = /^(?<term>\w+)_exp/;

export const stringify = (clauses: Clause[] = []): string => {
  let queryAccumulator = '';
  for (const clause of clauses) {
    let query = Object.entries(clause.queryBits)
      // filter out empty fields
      .filter(([, value]) => value);

    if (!query.length) {
      // empty field, ignore it
      continue; // eslint-disable-line no-continue
    }

    let queryJoined: string;
    const joinSeperator: Operator = 'AND';

    // Experimental evidence requires some swapping around of query bits.
    // Ideally this would have happened within the handleChange of the ExperimentalEvidencField
    // but only access to the _exp query bit is available there.
    const experimentalEvidenceTerm = clause.searchTerm?.siblings?.find(
      (s) => s?.fieldType === 'experimental_evidence'
    );
    if (experimentalEvidenceTerm) {
      const experimentalEvidenceValue =
        clause.queryBits[experimentalEvidenceTerm.term];
      // Remove experimental evidence term from the query bits as we just want to use the value
      query = query.filter(([key]) => key !== experimentalEvidenceTerm.term);
      // If user has specified something other than "any" then swap the normal term eg
      // foo is swapped for foo_exp
      if (experimentalEvidenceValue === 'true') {
        const experimentalEvidenceMatchTerm =
          experimentalEvidenceTerm.term.match(reExperimentalEvidenceKey)?.groups
            ?.term;
        query = query.map(([key, value]) =>
          key === experimentalEvidenceMatchTerm
            ? [experimentalEvidenceTerm.term, value]
            : [key, value]
        );
      }
    }

    if ('go' in clause.queryBits || 'go_evidence' in clause.queryBits) {
      const goEvidence = clause.queryBits?.go_evidence;
      const goKey = `go${
        goEvidence && goEvidence !== 'any' ? `_${goEvidence}` : ''
      }`;
      const goValue = clause.queryBits?.go || '*';
      queryJoined = `(${goKey}:${goValue})`;
    } else {
      queryJoined = query
        .map(([key, value]) => {
          const needsQuotes =
            // contains ' ' or ':'
            /[ :]/.test(value) &&
            // but isn't of the form '[... TO ...]';
            !(value.startsWith('[') && value.endsWith(']')) &&
            !(value.startsWith('"') && value.endsWith('"'));
          const quote = needsQuotes ? '"' : '';

          // free-text search
          if (key === 'All') {
            return `${quote}${value}${quote}`;
          }
          return `(${key}:${quote}${value}${quote})`;
        })
        .join(` ${joinSeperator} `);
      if (query.length > 1) {
        queryJoined = `(${queryJoined})`;
      }
    }

    let logicOperator = '';
    if (queryAccumulator.length && query.length) {
      logicOperator = ` ${clause.logicOperator} `;
    } else if (!queryAccumulator.length && clause.logicOperator === 'NOT') {
      logicOperator = `${clause.logicOperator} `;
    }

    queryAccumulator += `${logicOperator}${queryJoined}`;
  }
  return queryAccumulator;
};

const clauseSplitter = / *\b(AND|OR|NOT)\b */;
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
const lengthKey = /^(\w\w)(len)_/;
const goKey = /^go(_(?<evidence>\w+))?/;

const getEmptyClause = (id: number): Clause => ({
  id,
  searchTerm: {
    id: '',
    term: '',
    label: '',
    itemType: 'single',
    dataType: 'string',
    fieldType: 'general',
  },
  queryBits: {},
  logicOperator: 'AND',
});

/**
 * Function to parse a string corresponding to a query and return the
 * corresponding parsed object. Each clause has a stable unique ID which is a
 * number that will always keep growing clause after clause.
 * @param {string} queryString - String to parse, corresponding to a query
 * @param {number} [startId=0] - Optional starting ID to assign to 1st clause
 */
export const parse = (queryString = '', startId = 0): Clause[] => {
  // split querystring on all the recognised operators
  const split = queryString.trim().split(clauseSplitter);

  let id = startId;

  const clauses: Clause[] = [];
  let currentClause = getEmptyClause(id);
  for (const [index, chunk] of split.entries()) {
    if (index % 2) {
      // for every odd item in the split string we should get a new clause
      // starting with an operator
      currentClause = getEmptyClause(id);
      currentClause.logicOperator = chunk as Operator;
    } else {
      if (!chunk && index === 0) {
        // that's normal when the string starts with an operator, just skip it
        continue; // eslint-disable-line no-continue
      }
      // for every other item (even) should be the content of the clause
      const [key, value] = splitClause(chunk);

      // length
      const lengthMatch = key?.match(lengthKey);
      if (key && lengthMatch) {
        const correspondingClause = clauses.find(({ searchTerm }) =>
          searchTerm.term.startsWith(lengthMatch[1])
        );
        if (correspondingClause) {
          // if it's a length key, modify the last inserted
          // corresponding clause and skip
          correspondingClause.queryBits[key] = value;
          continue; // eslint-disable-line no-continue
        }
      }

      // experimental evidence
      const experimentalEvidenceMatchTerm = key?.match(
        reExperimentalEvidenceKey
      )?.groups?.term;
      if (key && experimentalEvidenceMatchTerm) {
        const correspondingClause = clauses.find(
          ({ searchTerm }) => searchTerm.term === experimentalEvidenceMatchTerm
        );
        if (correspondingClause) {
          correspondingClause.queryBits[key] = value;
          continue; // eslint-disable-line no-continue
        }
      }

      // GO search terms are of the format go(_{evidence})?:id so must be handled differently
      const goKeyMatch = key?.match(goKey);
      if (goKeyMatch) {
        currentClause.searchTerm.term = 'go';
        currentClause.queryBits = {
          go: value,
          go_evidence: goKeyMatch.groups?.evidence || '',
        };
      } else {
        // term
        if (key === 'database') {
          currentClause.searchTerm.term = 'xref';
        } else {
          currentClause.searchTerm.term = key || 'All';
        }
        // "default"
        if (key) {
          currentClause.queryBits[key] = value;
        } else {
          // specific free-text search
          currentClause.queryBits.All = value;
          currentClause.searchTerm = getAllTerm();
        }
      }

      clauses.push(currentClause);
      id += 1;
    }
  }
  return clauses;
};
