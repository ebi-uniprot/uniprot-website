import { createPreSelectedClauses } from '../../query-builder/utils/clause';

import { Clause } from '../types/searchTypes';
import { Namespace } from '../../shared/types/namespaces';

export type SearchState = {
  readonly clauses: Clause[];
  readonly namespace: Namespace;
};

const searchInitialState: SearchState = {
  clauses: createPreSelectedClauses(),
  namespace: Namespace.uniprotkb,
};

export default searchInitialState;
