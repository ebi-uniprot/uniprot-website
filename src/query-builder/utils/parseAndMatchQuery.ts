import { parse } from './queryStringProcessor';
import { getNextId } from './clause';

import { Clause, SearchTermType } from '../types/searchTypes';

type STTWithParent = SearchTermType & {
  parent?: STTWithParent;
};

export const flatten = (searchTermData: STTWithParent[]): STTWithParent[] =>
  searchTermData.flatMap((searchTermDatum: STTWithParent) => {
    if (searchTermDatum.siblings) {
      return flatten(searchTermDatum.siblings).map((st) => ({
        ...st,
        parent: searchTermDatum,
      }));
    }
    if (searchTermDatum.items) {
      return flatten(searchTermDatum.items);
    }
    return searchTermDatum;
  });

const parseAndMatchQuery = (
  query: string | string[] | null | undefined,
  searchTermsData: SearchTermType[],
  fieldToAdd?: string
): [valid: Clause[], invalid: Clause[]] => {
  // flatten all the endpoint-described clauses to be able to to look-up
  const flattened = flatten(searchTermsData);

  let parsedQuery: Clause[] = [];
  if (query) {
    parsedQuery = (Array.isArray(query) ? query : [query]).flatMap(parse);
  }
  if (fieldToAdd) {
    parsedQuery = [
      ...parsedQuery,
      ...parse(`(${fieldToAdd}:)`, getNextId(parsedQuery)),
    ];
  }
  // for each parsed clause, try to find the corresponding endpoint-described
  // clause to merge its 'searchTerm' field
  const validatedQuery: Clause[] = [];
  const invalid: Clause[] = [];
  for (const clause of parsedQuery) {
    if (clause.searchTerm.term === 'All') {
      validatedQuery.push(clause);
      continue; // eslint-disable-line no-continue
    }
    const matching = flattened.filter(
      ({ term }) => term === clause.searchTerm.term
    );
    // if it exists, assign it 'searchTerm'
    if (matching.length) {
      if (clause.queryBits.database) {
        const matchingXref = matching.find(
          ({ valuePrefix }) => valuePrefix === `${clause.queryBits.database}-`
        );
        if (matchingXref) {
          validatedQuery.push({
            ...clause,
            searchTerm: matchingXref,
          });
        } else {
          invalid.push(clause);
        }
      } else if (matching.length === 1 || clause.searchTerm.term === 'go') {
        // only one search term matching or this is GO in which case only add the parent SearchTerm
        validatedQuery.push({
          ...clause,
          searchTerm: matching[0].parent || matching[0],
        });
      } else if (clause.searchTerm.term === 'xref') {
        // specific case for crosss-references
        let matchingXref;
        let queryBitsXref;
        if (clause.queryBits.xref.includes('-')) {
          // There seems to be a prefix (prefix-foo) here so see if prefix can be found
          const [prefix, ...rest] = clause.queryBits.xref.split('-');
          matchingXref = matching.find(
            ({ valuePrefix }) => valuePrefix === `${prefix}-`
          );
          queryBitsXref = rest.join('-');
        }
        if (!matchingXref) {
          // There isn't a prefix or at least one that was found so this is an any xref search eg (xref:X82272)
          matchingXref = matching.find(({ term }) => term === 'xref');
          queryBitsXref = clause.queryBits.xref;
        }
        if (matchingXref && queryBitsXref) {
          validatedQuery.push({
            ...clause,
            searchTerm: matchingXref,
            queryBits: { xref: queryBitsXref },
          });
        } else {
          // invalid xref prefix
          invalid.push(clause);
        }
      } else {
        invalid.push(clause);
      }
      // else, didn't find any match
    } else if (clause.searchTerm.term === 'database') {
      // TODO: this is a temporary solution until 'database' is added
      // see https://www.ebi.ac.uk/panda/jira/browse/TRM-25963
      const matchingXref = flattened.find(
        ({ valuePrefix }) => valuePrefix === `${clause.queryBits.database}-`
      );
      if (matchingXref) {
        validatedQuery.push({
          ...clause,
          searchTerm: matchingXref,
          queryBits: { xref: `${clause.queryBits.database}-*` },
        });
      } else {
        invalid.push(clause);
      }
    } else {
      // try to find a search term matching through the autoComplete field
      const matchingAutoComplete = flattened.find(
        ({ autoCompleteQueryTerm }) =>
          autoCompleteQueryTerm &&
          autoCompleteQueryTerm === clause.searchTerm.term
      );
      if (matchingAutoComplete) {
        // set that clause to the corresponding autoComplete term field
        validatedQuery.push({
          ...clause,
          searchTerm: matchingAutoComplete,
          // and change queryBit key
          queryBits: {
            ...clause.queryBits,
            [matchingAutoComplete.autoCompleteQueryTerm &&
            clause.searchTerm.term.endsWith('_id')
              ? matchingAutoComplete.autoCompleteQueryTerm
              : matchingAutoComplete.term]:
              clause.queryBits[clause.searchTerm.term],
          },
        });
      } else {
        invalid.push(clause);
      }
    }
  }
  return [validatedQuery, invalid];
};

export default parseAndMatchQuery;
