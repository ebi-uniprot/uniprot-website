import { createPreSelectedClauses } from '../../query-builder/utils/clause';
import { Clause, Namespace } from '../../query-builder/types/searchTypes';

// This will be removed
export type SearchState = {
  readonly clauses: Clause[];
  readonly namespace: Namespace;
};

const searchInitialState: SearchState = {
  clauses: createPreSelectedClauses(),
  namespace: Namespace.uniprotkb,
};

export default searchInitialState;
