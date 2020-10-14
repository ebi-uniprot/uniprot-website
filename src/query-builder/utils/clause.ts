import { v1 } from 'uuid';

import {
  Operator,
  Clause,
  ItemType,
  DataType,
  FieldType,
} from '../types/searchTypes';

export const createEmptyClause = (): Clause => ({
  id: v1(),
  logicOperator: Operator.AND,
  searchTerm: {
    label: 'All',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: ItemType.single,
    dataType: DataType.string,
    fieldType: FieldType.general,
    id: 'id_all',
  },
  queryBits: {},
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
      fieldType: FieldType.general,
      id: 'gene_field',
    },
    queryBits: {},
  },
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      id: 'taxonomy_name',
      label: 'Taxonomy [OC]',
      itemType: ItemType.single,
      term: 'taxonomy_name',
      dataType: DataType.string,
      fieldType: FieldType.general,
      example: 'human',
      autoComplete: '/uniprot/api/suggester?dict=taxonomy&query=?',
      autoCompleteQueryTerm: 'taxonomy_id',
    },
    queryBits: {},
  },
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      id: 'keyword_field',
      label: 'Keyword [KW]',
      term: 'keyword',
      example: 'chromosomal',
      itemType: ItemType.single,
      dataType: DataType.string,
      fieldType: FieldType.general,
      autoComplete: '/uniprot/api/suggester?dict=keyword&query=?',
      autoCompleteQueryTerm: 'keyword',
    },
    queryBits: {},
  },
  createEmptyClause(),
];
