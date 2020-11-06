import { parse } from './queryStringProcessor';

import { Clause, SearchTermType } from '../types/searchTypes';

type STTWithParent = SearchTermType & {
  parent?: STTWithParent;
};

const flatten = (searchTermData: STTWithParent[]): STTWithParent[] => {
  return searchTermData.flatMap((searchTermDatum: STTWithParent) => {
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
};

const parseAndMatchQuery = (
  query: string | string[] | null | undefined,
  searchTermsData: SearchTermType[]
): [valid: Clause[], invalid: Clause[]] => {
  // flatten all the endpoint-described clauses to be able to to look-up
  const flattened = flatten(searchTermsData);

  const parsedQuery = query && !Array.isArray(query) ? parse(query) : undefined;
  // for each parsed clause, try to find the corresponding endpoint-described
  // clause to merge its 'searchTerm' field
  const validatedQuery: Clause[] = [];
  const invalid: Clause[] = [];
  for (const clause of parsedQuery || []) {
    if (clause.searchTerm.term === 'All') {
      validatedQuery.push(clause);
      continue; // eslint-disable-line no-continue
    }
    const matching = flattened.filter(
      ({ term }) => term === clause.searchTerm.term
    );
    // if it exists, assign it 'searchTerm'
    if (matching.length) {
      if (matching.length === 1) {
        // only one search term matching
        validatedQuery.push({
          ...clause,
          searchTerm: matching[0].parent || matching[0],
        });
      } else if (clause.searchTerm.term === 'xref') {
        // specific case for crosss-references
        const [prefix, ...rest] = clause.queryBits.xref.split('-');
        const matchingXref = matching.find(
          ({ valuePrefix }) => valuePrefix === `${prefix}-`
        );
        if (matchingXref) {
          validatedQuery.push({
            ...clause,
            searchTerm: matchingXref,
            queryBits: { xref: rest.join('-') },
          });
        } else {
          // invalid xref prefix
          invalid.push(clause);
        }
      } else {
        invalid.push(clause);
      }
      // else, didn't find any match
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
              : matchingAutoComplete.term]: clause.queryBits[
              clause.searchTerm.term
            ],
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
