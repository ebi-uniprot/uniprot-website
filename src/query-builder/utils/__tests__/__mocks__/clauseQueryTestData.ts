export const testData = [
  {
    description: 'should parse simple query with quotes',
    queryString: '(id:"blah blah")',
    clauses: [
      {
        searchTerm: {
          id: 'id_field',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'id',
          dataType: 'string',
          fieldType: 'general',
          example: 'P53_HUMAN',
        },
        queryBits: {
          id: 'blah blah',
        },
      },
    ],
  },
  {
    description: 'should parse autocomplete free text',
    queryString: '(organism_name:"Homo sap")',
    clauses: [
      {
        searchTerm: {
          id: 'organism_name_field',
          label: 'Organism [OS]',
          itemType: 'single',
          term: 'organism_name',
          dataType: 'string',
          fieldType: 'general',
          example: 'saccharomyces',
          autoComplete: '/uniprot/api/suggester?dict=organism&query=?',
          autoCompleteQueryTerm: 'organism_id',
        },
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
        searchTerm: {
          id: 'organism_name_field',
          label: 'Organism [OS]',
          itemType: 'single',
          term: 'organism_name',
          dataType: 'string',
          fieldType: 'general',
          example: 'saccharomyces',
          autoComplete: '/uniprot/api/suggester?dict=organism&query=?',
          autoCompleteQueryTerm: 'organism_id',
        },
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
        searchTerm: {
          id: 'ftlen_sites',
          itemType: 'single',
          term: 'ftlen_sites',
          dataType: 'integer',
          fieldType: 'range',
          example: '[0 TO 100]',
        },
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
        searchTerm: {
          id: 'ftlen_sites',
          itemType: 'single',
          term: 'ftlen_sites',
          dataType: 'integer',
          fieldType: 'range',
          example: '[0 TO *]',
        },
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
        searchTerm: {
          id: 'date_created',
          label: 'Date Of Creation',
          itemType: 'single',
          term: 'date_created',
          dataType: 'date',
          fieldType: 'range',
          example: '[2018-03-04 TO 2018-03-08]',
        },
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
        searchTerm: {
          id: 'existence',
          label: 'Protein Existence [PE]',
          itemType: 'single',
          term: 'existence',
          dataType: 'enum',
          fieldType: 'general',
          example: '1',
          values: [
            {
              name: 'Evidence at protein level',
              value: 'protein_level',
            },
            {
              name: 'Evidence at transcript level',
              value: 'transcript_level',
            },
            {
              name: 'Inferred from homology',
              value: 'homology',
            },
            {
              name: 'Predicted',
              value: 'predicted',
            },
            {
              name: 'Uncertain',
              value: 'uncertain',
            },
          ],
        },
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
        searchTerm: {
          id: 'xref_pdb',
          label: 'PDB',
          itemType: 'single',
          term: 'xref',
          dataType: 'string',
          fieldType: 'general',
          valuePrefix: 'pdb-',
        },
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
        searchTerm: {
          id: 'id_xref_any',
          label: 'Any cross-reference',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'any',
        },
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
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
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
        searchTerm: {
          id: 'id_xref_embl',
          label: 'EMBL',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'embl',
        },
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
        searchTerm: {
          id: 'id_field',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'id',
          dataType: 'string',
          fieldType: 'general',
          example: 'P53_HUMAN',
        },
        queryBits: {
          id: 'blah',
        },
      },
      {
        searchTerm: {
          id: 'protein_name_field',
          label: 'Protein Name [DE]',
          itemType: 'single',
          term: 'protein_name',
          dataType: 'string',
          fieldType: 'general',
          example: 'mas5',
        },
        logicOperator: 'OR',
        queryBits: {
          protein_name: 'My protein',
        },
      },
    ],
  },
  {
    description: 'should handle siblings with evidence tags',
    queryString:
      '((cc_cofactor_chebi:"CHEBI:12345") AND (ccev_cofactor_chebi:manual))',
    clauses: [
      {
        searchTerm: {
          id: 'chebi_term',
          label: 'ChEBI term',
          itemType: 'sibling_group',
          siblings: [
            {
              id: 'cc_cofactor_chebi',
              itemType: 'single',
              term: 'cc_cofactor_chebi',
              dataType: 'string',
              fieldType: 'general',
              example: '29105',
              autoComplete: '/uniprot/api/suggester?dict=chebi&query=?',
              autoCompleteQueryTerm: 'cc_cofactor_chebi',
            },
            {
              id: 'ccev_cofactor_chebi',
              itemType: 'single',
              term: 'ccev_cofactor_chebi',
              dataType: 'string',
              fieldType: 'evidence',
              example: 'manual',
              evidenceGroups: [
                {
                  groupName: 'Any',
                  items: [
                    {
                      name: 'Any assertion method',
                      code: 'any',
                    },
                    {
                      name: 'Any manual assertion',
                      code: 'manual',
                    },
                    {
                      name: 'Any automatic assertion',
                      code: 'automatic',
                    },
                    {
                      name: 'Any experimental assertion',
                      code: 'experimental',
                    },
                  ],
                },
              ],
            },
          ],
        },
        queryBits: {
          cc_cofactor_chebi: 'CHEBI:12345',
          ccev_cofactor_chebi: 'manual',
        },
      },
    ],
  },
  {
    description: 'should handle more complex query',
    queryString:
      '((ft_sites:my_site) AND (ftlen_sites:[10 TO 20]) AND (ftev_sites:automatic)) AND (gene:my_gene)',
    clauses: [
      {
        searchTerm: {
          id: 'sites',
          label: 'Sites',
          itemType: 'group',
          siblings: [
            {
              id: 'sites_any',
              label: 'Any',
              itemType: 'sibling_group',
              items: [
                {
                  id: 'ft_sites',
                  itemType: 'single',
                  term: 'ft_sites',
                  dataType: 'string',
                  fieldType: 'general',
                  example: 'translocation',
                },
                {
                  id: 'ftlen_sites',
                  itemType: 'single',
                  term: 'ftlen_sites',
                  dataType: 'integer',
                  fieldType: 'range',
                  example: '[0 TO 100]',
                },
                {
                  id: 'ftev_sites',
                  itemType: 'single',
                  term: 'ftev_sites',
                  dataType: 'string',
                  fieldType: 'evidence',
                  example: 'manual',
                  evidenceGroups: [
                    {
                      groupName: 'Any',
                      items: [
                        {
                          name: 'Any assertion method',
                          code: 'any',
                        },
                        {
                          name: 'Any manual assertion',
                          code: 'manual',
                        },
                        {
                          name: 'Any automatic assertion',
                          code: 'automatic',
                        },
                        {
                          name: 'Any experimental assertion',
                          code: 'experimental',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        queryBits: {
          ft_sites: 'my_site',
          ftlen_sites: '[10 TO 20]',
          ftev_sites: 'automatic',
        },
      },
      {
        searchTerm: {
          id: 'gene_field',
          label: 'Gene Name [GN]',
          itemType: 'single',
          term: 'gene',
          dataType: 'string',
          fieldType: 'general',
          example: 'ydj1',
        },
        logicOperator: 'AND',
        queryBits: {
          gene: 'my_gene',
        },
      },
    ],
  },
];
