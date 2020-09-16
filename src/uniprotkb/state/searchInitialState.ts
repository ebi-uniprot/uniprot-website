import { createPreSelectedClauses } from '../../query-builder/utils/clause';
import {
  Clause,
  Namespace,
  Evidence,
  Evidences,
  SearchTermType,
} from '../types/searchTypes';

export type SearchState = {
  readonly clauses: Clause[];
  readonly namespace: Namespace;
  readonly searchTerms: { data: SearchTermType[]; isFetching: boolean };
  readonly evidences: Evidences;
};

const searchInitialState: SearchState = {
  clauses: createPreSelectedClauses(),
  namespace: Namespace.uniprotkb,
  searchTerms: {
    data: [],
    isFetching: false,
  },
  evidences: {
    [Evidence.GO]: {
      data: [],
      isFetching: false,
    },
    [Evidence.ANNOTATION]: {
      data: [],
      isFetching: false,
    },
  },
};

export default searchInitialState;
