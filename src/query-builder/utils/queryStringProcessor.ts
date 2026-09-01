import { type Clause, type Operator } from '../types/searchTypes';
import { getAllTerm } from './clause';

const reExperimentalEvidenceKey = /^(?<term>\w+)_exp/;

// Canonical UniProt proteome identifier value, eg UP000005640
export const reProteomeIdValue = /^UP\d{9}$/i;

// Fused proteome + component value, eg UP000005640:chromosome. Produced by
// parse() when a query string already contains a fused `proteomecomponent`
// clause, since parse() has no way to split it back into separate `proteome`
// and `proteomecomponent` query bits.
const reFusedProteomeComponentValue = /^UP\d{9}:/i;

const quoteIfNeeded = (value: string): string => {
  const needsQuotes =
    // contains ' ' or ':'
    /[ :]/.test(value) &&
    // but isn't of the form '[... TO ...]';
    !(value.startsWith('[') && value.endsWith(']')) &&
    !(value.startsWith('"') && value.endsWith('"'));
  const quote = needsQuotes ? '"' : '';
  return `${quote}${value}${quote}`;
};

// A proteome component can only be searched when scoped by a valid proteome
// ID, unless it's already in fused form (see reFusedProteomeComponentValue).
// Single source of truth for the condition under which stringify() drops a
// clause's `proteomecomponent` bit, so the UI's warning toast can't drift
// out of sync with the actual drop.
export const isOrphanProteomeComponent = (clause: Clause): boolean =>
  Boolean(
    clause.queryBits.proteomecomponent &&
    !(
      clause.queryBits.proteome &&
      reProteomeIdValue.test(clause.queryBits.proteome)
    ) &&
    !reFusedProteomeComponentValue.test(clause.queryBits.proteomecomponent)
  );

export const stringify = (clauses: Clause[] = []): string => {
  let queryAccumulator = '';
  for (const clause of clauses) {
    let query = Object.entries(clause.queryBits)
      // filter out empty fields
      .filter(([, value]) => value);

    if (!query.length) {
      // empty field, ignore it
      continue;
    }

    let queryJoined: string;
    const joinSeperator: Operator = 'AND';

    // Experimental evidence requires some swapping around of query bits.
    // Ideally this would have happened within the handleChange of the ExperimentalEvidencField
    // but only access to the _exp query bit is available there.
    const experimentalEvidenceTerm = clause.searchTerm?.siblings?.find(
      (s) => s?.fieldType === 'experimental_evidence'
    );
    if (experimentalEvidenceTerm && experimentalEvidenceTerm.term) {
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
          experimentalEvidenceTerm.term && key === experimentalEvidenceMatchTerm
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
    } else if (
      clause.queryBits.proteome &&
      reProteomeIdValue.test(clause.queryBits.proteome) &&
      clause.queryBits.proteomecomponent
    ) {
      // Combine proteome ID + component into a single proteomecomponent clause
      // and suppress the separate `proteome:` clause.
      const rawComponent = clause.queryBits.proteomecomponent;
      // Don't double-quote a component the user has already quoted themselves,
      // eg pasted as "chromosome 1".
      const component =
        rawComponent.startsWith('"') && rawComponent.endsWith('"')
          ? rawComponent.slice(1, -1)
          : rawComponent;
      const combined = `${clause.queryBits.proteome}:${component}`;
      queryJoined = `(proteomecomponent:${quoteIfNeeded(combined)})`;
    } else if (
      clause.queryBits.proteomecomponent &&
      reFusedProteomeComponentValue.test(clause.queryBits.proteomecomponent)
    ) {
      // Value is already in fused form, eg round-tripped through parse().
      // Emit it unchanged rather than treating it as an orphaned component
      // with no proteome ID.
      queryJoined = `(proteomecomponent:${quoteIfNeeded(
        clause.queryBits.proteomecomponent
      )})`;
    } else {
      // A proteome component can only be searched when scoped by a valid
      // proteome ID. On its own it's meaningless, so drop it (the UI warns the
      // user that a proteome ID is needed).
      if (isOrphanProteomeComponent(clause)) {
        query = query.filter(([key]) => key !== 'proteomecomponent');
        if (!query.length) {
          // nothing left to search in this clause
          continue;
        }
      }

      queryJoined = query
        .map(([key, value]) => {
          // free-text search
          if (key === 'All') {
            return quoteIfNeeded(value);
          }
          return `(${key}:${quoteIfNeeded(value)})`;
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
// A quoted value (group 2) is matched wholesale up to its closing quote, so
// it can itself contain a ')' (eg a component name like "Chromosome (1)")
// without truncating the match. An unquoted value (group 3) keeps the
// original, narrower matching.
const clauseMatcher = /^\(*(\w+):(?:"([^"]*)"|([^")]*))\)*$/;
const splitClause = (
  clause: string
): [key: string | undefined, value: string] => {
  const match = clauseMatcher.exec(clause);
  if (!match) {
    return [undefined, clause];
  }
  return [match[1], match[2] ?? match[3] ?? ''];
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
        continue;
      }
      // for every other item (even) should be the content of the clause
      const [key, value] = splitClause(chunk);

      // length
      const lengthMatch = key?.match(lengthKey);
      if (key && lengthMatch) {
        const correspondingClause = clauses.find(({ searchTerm }) =>
          searchTerm.term?.startsWith(lengthMatch[1])
        );
        if (correspondingClause) {
          // if it's a length key, modify the last inserted
          // corresponding clause and skip
          correspondingClause.queryBits[key] = value;
          continue;
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
          continue;
        }
      }

      // Legacy (pre-2026_03) links and bookmarks encode a proteome ID and a
      // component name as two separate, AND-joined clauses instead of a
      // single fused `proteomecomponent` clause. Fold the second one into
      // the first so it round-trips through stringify()'s fusion instead of
      // being treated as an orphan component and dropped. Only a plain `AND`
      // join is folded: an OR/NOT join changes the meaning of the pair, and
      // there's no fused-field equivalent for eg "this proteome but NOT this
      // component", so those are left alone (and still get the orphan
      // warning, same as before this migration).
      // Unlike length/experimental evidence above, only the immediately
      // preceding clause is considered: those fields are always generated
      // atomically by a single form control, but a proteome ID and a
      // component name could each appear anywhere in a hand-edited query, so
      // pairing with a distant, unrelated clause would silently narrow it.
      const proteomeFusionKey =
        key === 'proteomecomponent'
          ? 'proteome'
          : key === 'proteome'
            ? 'proteomecomponent'
            : undefined;
      const previousClause = clauses[clauses.length - 1];
      if (
        key &&
        proteomeFusionKey &&
        currentClause.logicOperator === 'AND' &&
        previousClause?.searchTerm.term === proteomeFusionKey &&
        Object.keys(previousClause.queryBits).length === 1 &&
        proteomeFusionKey in previousClause.queryBits
      ) {
        previousClause.queryBits[key] = value;
        continue;
      }

      // GO search terms are of the format go(_{evidence})?:id so must be handled differently
      const goKeyMatch = key?.match(goKey);
      if (goKeyMatch) {
        currentClause.searchTerm.term = 'go';
        currentClause.queryBits = {
          go: value,
          go_evidence: goKeyMatch.groups?.evidence || '', // eslint-disable-line camelcase
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
