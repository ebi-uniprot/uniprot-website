import { createPreSelectedClauses } from '../../query-builder/utils/clause';
import { Clause, Namespace } from '../types/searchTypes';

export type SearchState = {
  readonly clauses: Clause[];
  readonly namespace: Namespace;
};

const searchInitialState: SearchState = {
  clauses: createPreSelectedClauses(),
  namespace: Namespace.uniprotkb,
};

export default searchInitialState;
