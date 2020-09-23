import { createPreSelectedClauses } from '../../query-builder/utils/clause';
import { Clause } from '../../query-builder/types/searchTypes';
import { Namespace } from '../../shared/types/namespaces';

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
