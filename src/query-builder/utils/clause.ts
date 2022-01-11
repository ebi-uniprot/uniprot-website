import { Namespace } from '../../shared/types/namespaces';

import { Clause, SearchTermType } from '../types/searchTypes';

export const getAllTerm = (): SearchTermType => ({
  label: 'All',
  term: 'All',
  example: 'a4_human, P05067, cdc7 human',
  itemType: 'single',
  dataType: 'string',
  fieldType: 'general',
  id: 'id_all',
});

export const getNextId = (clauses: Clause[] = []) => {
  if (!clauses?.length) {
    return 0;
  }
  return Math.max(...clauses.map((clause) => clause.id)) + 1;
};

export const createEmptyClause = (id: number): Clause => ({
  id,
  logicOperator: 'AND',
  searchTerm: getAllTerm(),
  queryBits: {},
});

// TODO: different default set depending on namespace
export const defaultQueryFor = (namespace: Namespace) => {
  switch (namespace) {
    case Namespace.uniref:
      return '(name:) AND (taxonomy_name:) AND (identity:) AND (uniprot_id:) AND ';
    case Namespace.uniparc:
      return '(upid:) AND (uniprotkb:) AND (dbid:) AND (checksum:) AND ';
    // case Namespace.proteomes:
    //   return ''; // TODO
    // case Namespace.citations:
    //   return ''; // TODO
    // case Namespace.keywords:
    //   return ''; // TODO
    case Namespace.uniprotkb:
    default:
      return '(gene:) AND (taxonomy_name:) AND (keyword:) AND ';
  }
};
