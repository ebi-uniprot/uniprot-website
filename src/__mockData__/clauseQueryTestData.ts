export const testData = [
  {
    description: 'should generate simple query',
    queryString: '(mnemonic:blah)',
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description:
      'should generate simple query with padded spaces around stringVaule',
    queryString: '(mnemonic:blah)',
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: ' blah ',
        },
      },
    ],
  },
  {
    description:
      'should generate query with value surrounded by double quotes when stringValue has a space',
    queryString: '(mnemonic:"foo bar")',
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'foo bar',
        },
      },
    ],
  },
  {
    description: 'should search with id if term one is present',
    queryString: '(cc_scl_term:"SL-12345")',
    clauses: [
      {
        searchTerm: {
          id: 'id_scl_term',
          label: 'Subcellular location term',
          itemType: 'comment',
          term: 'scl_term',
          dataType: 'string',
          hasEvidence: true,
          autoComplete: '/uniprot/api/suggester?dict=subcell&query=?',
          description: 'Search by comment subcellular location term',
          example: 'membrane',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
          id: 'SL-12345',
        },
      },
    ],
  },
  {
    description:
      'should append _id to term if termSuffix=true and id is present',
    queryString: '(organism_id:"1234")',
    clauses: [
      {
        searchTerm: {
          id: 'id_organism',
          label: 'Organism [OS]',
          itemType: 'single',
          term: 'organism',
          dataType: 'string',
          autoComplete: '/uniprot/api/suggester?dict=organism&query=?',
          description: 'Search by Organism name',
          example: 'saccharomyces',
          termSuffix: true,
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
          id: '1234',
        },
      },
    ],
  },
  {
    description:
      'should append _name to term if termSuffix=true and id is not present',
    queryString: '(organism_name:blah)',
    clauses: [
      {
        searchTerm: {
          id: 'id_organism',
          label: 'Organism [OS]',
          itemType: 'single',
          term: 'organism',
          dataType: 'string',
          autoComplete: '/uniprot/api/suggester?dict=organism&query=?',
          description: 'Search by Organism name',
          example: 'saccharomyces',
          termSuffix: true,
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description: 'should handle enzyme classification [EC] search with an ID',
    queryString: '(ec:"1.2.3.4")',
    clauses: [
      {
        searchTerm: {
          id: 'id_ec',
          label: 'Enzyme classification [EC]',
          itemType: 'single',
          term: 'ec',
          dataType: 'string',
          autoComplete: '/uniprot/api/suggester?dict=ec&query=?',
          description: 'Search by Enzyme EC number',
          example: '1.1.2.3',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'foo [1.2.3.4]',
          id: '1.2.3.4',
        },
      },
    ],
  },
  {
    description:
      'should handle enzyme classification [EC] search without an ID',
    queryString: '(ec:foo)',
    clauses: [
      {
        searchTerm: {
          id: 'id_ec',
          label: 'Enzyme classification [EC]',
          itemType: 'single',
          term: 'ec',
          dataType: 'string',
          autoComplete: '/uniprot/api/suggester?dict=ec&query=?',
          description: 'Search by Enzyme EC number',
          example: '1.1.2.3',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'foo',
        },
      },
    ],
  },
  {
    description: 'should ignore empty fields',
    queryString: '',
    clauses: [
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'AND',
        queryInput: {},
      },
    ],
  },
  {
    description: 'should handle cc evidence tags',
    queryString:
      '((cc_cofactor_chebi:"CHEBI:12345") AND (ccev_cofactor_chebi:blahvidence))',
    clauses: [
      {
        searchTerm: {
          id: 'id_cofactor_chebi',
          label: 'ChEBI term',
          itemType: 'comment',
          term: 'cofactor_chebi',
          dataType: 'string',
          hasEvidence: true,
          autoComplete: '/uniprot/api/suggester?dict=chebi&query=?',
          description: 'Search by cofactor chebi ',
          example: '29105',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah [CHEBI:12345]',
          id: 'CHEBI:12345',
          evidenceValue: 'blahvidence',
        },
      },
    ],
  },
  {
    description: 'should handle ft evidence tags',
    queryString: '((ft_ca_bind:blah) AND (ftev_ca_bind:blahvidence))',
    clauses: [
      {
        searchTerm: {
          id: 'id_ca_bind',
          label: 'Calcium binding',
          itemType: 'feature',
          term: 'ca_bind',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature calcium binding',
          example: 'site',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
          evidenceValue: 'blahvidence',
        },
      },
    ],
  },
  {
    description:
      'should evidence query with padded spaces around evidence string input',
    queryString: '((ft_ca_bind:blah) AND (ftev_ca_bind:blahvidence))',
    clauses: [
      {
        searchTerm: {
          id: 'id_ca_bind',
          label: 'Calcium binding',
          itemType: 'feature',
          term: 'ca_bind',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature calcium binding',
          example: 'site',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
          evidenceValue: '        blahvidence    ',
        },
      },
    ],
  },
  {
    description: 'should handle range',
    queryString: '(ftlen_sites:[10 TO 100])',
    clauses: [
      {
        searchTerm: {
          id: 'id_sites',
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        logicOperator: 'AND',
        queryInput: {
          rangeFrom: '10',
          rangeTo: '100',
        },
      },
    ],
  },
  {
    description:
      'should handle range with padded space around the input rangeFrom and rangeTo',
    queryString: '(ftlen_sites:[10 TO 100])',
    clauses: [
      {
        searchTerm: {
          id: 'id_sites',
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        logicOperator: 'AND',
        queryInput: {
          rangeFrom: ' 10 ',
          rangeTo: ' 100 ',
        },
      },
    ],
  },
  {
    description: 'should handle ft range and evidence',
    queryString: '((ftlen_sites:[10 TO 100]) AND (ftev_sites:blahvidence))',
    clauses: [
      {
        searchTerm: {
          id: 'id_sites',
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        logicOperator: 'AND',
        queryInput: {
          rangeFrom: '10',
          rangeTo: '100',
          evidenceValue: 'blahvidence',
        },
      },
    ],
  },
  {
    description: 'should handle date range',
    queryString: '(created:[2018-03-04 TO 2018-03-08])',
    clauses: [
      {
        searchTerm: {
          id: 'id_created',
          label: 'Date Of Creation',
          itemType: 'single',
          term: 'created',
          dataType: 'date',
          hasRange: true,
          description: 'Search by Date of creation',
          example: '[2018-03-04 TO 2018-03-08]',
        },
        logicOperator: 'AND',
        queryInput: {
          rangeFrom: '2018-03-04',
          rangeTo: '2018-03-08',
        },
      },
    ],
  },
  {
    description: 'should handle xrefs',
    queryString: '(xref:pdb-Something)',
    clauses: [
      {
        searchTerm: {
          id: 'id_xref_pdb',
          label: 'PDB',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'pdb',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'Something',
        },
      },
    ],
  },
  {
    description: 'should handle xrefs when input string value has spaces',
    queryString: '(xref:"pdb-Something or another")',
    clauses: [
      {
        searchTerm: {
          id: 'id_xref_pdb',
          label: 'PDB',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'pdb',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'Something or another',
        },
      },
    ],
  },
  {
    description: 'should handle any xrefs',
    queryString: '(xref:Something)',
    clauses: [
      {
        searchTerm: {
          id: 'id_xref_any',
          label: 'Any cross-reference',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'any',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'Something',
        },
      },
    ],
  },
  {
    description:
      'should generate simple query from two subqueries joined by an AND',
    queryString: '(mnemonic:blah) AND (mnemonic:foo)',
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'foo',
        },
      },
    ],
  },
  {
    description:
      'should generate simple query from two subqueries joined by an OR',
    queryString: '(mnemonic:blah) OR (mnemonic:foo)',
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'OR',
        queryInput: {
          stringValue: 'foo',
        },
      },
    ],
  },
  {
    description: 'should generate simple query with a NOT',
    queryString: 'NOT (mnemonic:blah)',
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'NOT',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description: 'should handle single cc query',
    queryString: '(cc_cofactor_chebi:"CHEBI:12345")',
    clauses: [
      {
        searchTerm: {
          id: 'id_cofactor_chebi',
          label: 'ChEBI term',
          itemType: 'comment',
          term: 'cofactor_chebi',
          dataType: 'string',
          hasEvidence: true,
          autoComplete: '/uniprot/api/suggester?dict=chebi&query=?',
          description: 'Search by cofactor chebi ',
          example: '29105',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah [CHEBI:12345]',
          id: 'CHEBI:12345',
        },
      },
    ],
  },
  {
    description:
      'should handle an "All" query (eg without a specific field selected)',
    queryString: 'blah',
    clauses: [
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description:
      'should handle an "All" query (eg without a specific field selected) with a NOT logic operator',
    queryString: 'NOT blah',
    clauses: [
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'NOT',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description:
      'An implicit "All" joined to by an OR to a mnemonic search - mixes unbracketed and bracketed terms',
    queryString: 'blah OR (mnemonic:foo)',
    clauses: [
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'OR',
        queryInput: {
          stringValue: 'foo',
        },
      },
    ],
  },
  {
    description:
      'should handle ft range and evidence, simple mnemonic, and any query',
    queryString:
      'NOT ((ftlen_sites:[10 TO 100]) AND (ftev_sites:blahvidence)) OR (mnemonic:foo) NOT blah',
    clauses: [
      {
        searchTerm: {
          id: 'id_sites',
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        logicOperator: 'NOT',
        queryInput: {
          rangeFrom: '10',
          rangeTo: '100',
          evidenceValue: 'blahvidence',
        },
      },
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'OR',
        queryInput: {
          stringValue: 'foo',
        },
      },
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'NOT',
        queryInput: {
          stringValue: 'blah',
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
        searchTerm: {
          id: 'id_xref_embl',
          label: 'EMBL',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'embl',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: '*',
        },
      },
    ],
  },
];

export const exceptionThrowingTestData = [
  {
    description: 'should throw "term is undefined" Error',
    error: Error('term is undefined'),
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
          id: '1234',
        },
      },
    ],
  },
  {
    description: 'should throw "valuePrefix not provided in xref query" Error',
    error: Error('valuePrefix not provided in xref query'),
    clauses: [
      {
        searchTerm: {
          id: 'id_xref_embl',
          label: 'EMBL',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
];
