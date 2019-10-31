import { v1 } from 'uuid';
import { serializableDeepAreEqual, removeProperty } from '../../utils/utils';
import {
  Operator,
  Clause,
  itemType,
  dataType,
} from '../types/searchTypes';

export const createEmptyClause = (): Clause => ({
  id: v1(),
  logicOperator: Operator.AND,
  searchTerm: {
    label: 'All',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: itemType.single,
    dataType: dataType.string,
    id: 'id_all',
  },
  queryInput: {},
});

export const createPreSelectedClauses = () : Clause[] => [
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      label: 'Gene Name [GN]',
      term: 'gene',
      example: 'ydj1',
      itemType: itemType.single,
      dataType: dataType.string,
      id: 'id_gene',
    },
    queryInput: {},
  },
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      id: "id_taxonomy",
      label: "Taxonomy [OC]",
      term: "taxonomy",
      itemType: itemType.single,
      dataType: dataType.string,
      autoComplete: "/uniprot/api/suggester?dict=taxonomy&query=?",
      description: "Search by NCBI taxonomy",
      example: "human",
      termSuffix: true,
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
      itemType: itemType.single,
      dataType: dataType.enum,
      values: [
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' },
      ],
    },
    queryInput: {},
  },
  {
    id: v1(),
    logicOperator: Operator.AND,
    searchTerm: {
      id: 'id_keyword',
      label: 'Keyword [KW]',
      term: 'keyword',
      example: 'chromosomal',
      itemType: itemType.single,
      dataType: dataType.string,
      description: 'Search by keyword',
      autoComplete: '/uniprot/api/suggester?dict=keyword&query=?',
    },
    queryInput: {},
  },
  createEmptyClause(),
];

export const clausesAreEqual = (clause1: Clause, clause2: Clause) =>
  serializableDeepAreEqual(
    removeProperty(clause1, 'id'),
    removeProperty(clause2, 'id')
  );
