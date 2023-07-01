import { Clause } from '../../../types/searchTypes';

import { getSearchTerm } from '../../../components/__tests__/__mocks__/configureSearchTerms';
import { getAllTerm } from '../../clause';

const testData = [
  {
    description: 'should parse simple query with quotes',
    queryString: '(id:"blah blah")',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('id_field'),
        queryBits: {
          id: 'blah blah',
        },
      },
    ],
  },
  {
    description: 'should parse simple not query',
    queryString: 'NOT (id:blah)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('id_field'),
        logicOperator: 'NOT',
        queryBits: {
          id: 'blah',
        },
      },
    ],
  },
  {
    description: 'should parse autocomplete free text',
    queryString: '(organism_name:"Homo sap")',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('organism_name_field'),
        queryBits: {
          organism_name: 'Homo sap',
        },
      },
    ],
  },
  {
    description: 'should parse autocomplete id',
    queryString: '(organism_id:9606)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('organism_name_field'),
        queryBits: {
          organism_id: '9606',
        },
      },
    ],
  },
  {
    description: 'should handle range',
    queryString: '(ftlen_sites:[10 TO 100])',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('ftlen_sites'),
        queryBits: {
          ftlen_sites: '[10 TO 100]',
        },
      },
    ],
  },
  {
    description: 'should handle partial range',
    queryString: '(ftlen_sites:[10 TO *])',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('ftlen_sites'),
        queryBits: {
          ftlen_sites: '[10 TO *]',
        },
      },
    ],
  },
  {
    description: 'should handle date range',
    queryString: '(date_created:[2018-03-04 TO 2018-03-08])',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('date_created'),
        queryBits: {
          date_created: '[2018-03-04 TO 2018-03-08]',
        },
      },
    ],
  },
  {
    description: 'should handle enum',
    queryString: '(existence:predicted)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('existence'),
        queryBits: {
          existence: 'predicted',
        },
      },
    ],
  },
  {
    description: 'should handle xrefs',
    queryString: '(xref:pdb-Something)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('xref_pdb'),
        queryBits: {
          xref: 'pdb-Something',
        },
      },
    ],
  },
  {
    description: 'should handle any xrefs',
    queryString: '(xref:Something)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('xref_any'),
        queryBits: {
          xref: 'Something',
        },
      },
    ],
  },
  {
    description:
      'should handle an "All" query (e.g. without a specific field selected)',
    queryString: 'blah',
    clauses: [
      {
        id: 0,
        searchTerm: getAllTerm(),
        queryBits: {
          All: 'blah',
        },
      },
    ],
  },
  {
    description:
      'if embl xref selected and * value provided should generate query: database:embl',
    queryString: '(database:embl)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('xref_embl'),
        queryBits: {
          database: 'embl',
        },
      },
    ],
  },
  {
    description: 'should handle simple OR query with 2 clauses',
    queryString: '(id:blah) OR (protein_name:"My protein")',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('id_field'),
        queryBits: {
          id: 'blah',
        },
      },
      {
        id: 1,
        searchTerm: getSearchTerm('protein_name_field'),
        logicOperator: 'OR',
        queryBits: {
          protein_name: 'My protein',
        },
      },
    ],
  },
  {
    description: 'should handle experimental evidence',
    queryString: '(cc_cofactor_chebi_exp:"CHEBI:12345")',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('chebi_term'),
        queryBits: {
          cc_cofactor_chebi: 'CHEBI:12345',
          cc_cofactor_chebi_exp: 'true',
        },
      },
    ],
  },
  {
    description: 'should handle lack of experimental evidence',
    queryString: '(cc_cofactor_chebi:"CHEBI:12345")',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('chebi_term'),
        queryBits: {
          cc_cofactor_chebi: 'CHEBI:12345',
        },
      },
    ],
  },
  {
    description: 'should handle more complex query',
    queryString:
      '((ft_sites_exp:my_site) AND (ftlen_sites:[10 TO 20])) AND (gene:my_gene)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('sites_any'),
        queryBits: {
          ft_sites: 'my_site',
          ft_sites_exp: 'true',
          ftlen_sites: '[10 TO 20]',
        },
      },
      {
        id: 1,
        searchTerm: getSearchTerm('gene_field'),
        logicOperator: 'AND',
        queryBits: {
          gene: 'my_gene',
        },
      },
    ],
  },

  {
    description: 'should handle GO term with experimental evidence level',
    queryString: '(go_exp:0002381)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('gene_ontology'),
        queryBits: {
          go: '0002381',
          go_evidence: 'exp',
        },
        logicOperator: 'AND',
      },
    ],
  },
  {
    description: 'should handle GO term with any evidence level and any GO id',
    queryString: '(go:*)',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('gene_ontology'),
        queryBits: {
          go: '*',
        },
        logicOperator: 'AND',
      },
    ],
  },
  {
    description: 'should handle free text query with spaces and quotations',
    queryString: '"homo sapiens"',
    clauses: [
      {
        id: 0,
        searchTerm: getSearchTerm('gene_ontology'),
        queryBits: {
          All: 'homo sapiens',
        },
        logicOperator: 'AND',
      },
    ],
  },
] as Array<{ description: string; queryString: string; clauses: Clause[] }>;

export default testData;
