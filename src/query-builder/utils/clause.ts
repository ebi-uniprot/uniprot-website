import { v1 } from 'uuid';
import { isEqual } from 'lodash-es';

import { removeProperty } from '../../shared/utils/utils';
import { Operator, Clause, ItemType, DataType } from '../types/searchTypes';

export const createEmptyClause = (): Clause => ({
  id: v1(),
  logicOperator: Operator.AND,
  searchTerm: {
    label: 'All',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: ItemType.single,
    dataType: DataType.string,
    id: 'id_all',
  },
  queryInput: {},
});

export const createPreSelectedClauses = (): Clause[] => [
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      label: 'Gene Name [GN]',
      term: 'gene',
      example: 'ydj1',
      itemType: ItemType.single,
      dataType: DataType.string,
      id: 'id_gene',
    },
    queryInput: {},
  },
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      id: 'id_taxonomy',
      label: 'Taxonomy [OC]',
      term: 'taxonomy',
      itemType: ItemType.single,
      dataType: DataType.string,
      autoComplete: '/uniprot/api/suggester?dict=taxonomy&query=?',
      example: 'human',
    },
    queryInput: {},
  },
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      id: 'id_reviewed',
      label: 'Reviewed',
      term: 'reviewed',
      example: 'true',
      itemType: ItemType.single,
      dataType: DataType.enum,
      values: [
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' },
      ],
    },
    queryInput: { stringValue: 'true' },
  },
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      id: 'id_keyword',
      label: 'Keyword [KW]',
      term: 'keyword',
      example: 'chromosomal',
      itemType: ItemType.single,
      dataType: DataType.string,
      autoComplete: '/uniprot/api/suggester?dict=keyword&query=?',
    },
    queryInput: {},
  },
  createEmptyClause(),
];

export const clausesAreEqual = (clause1: Clause, clause2: Clause) =>
  isEqual(removeProperty(clause1, 'id'), removeProperty(clause2, 'id'));
