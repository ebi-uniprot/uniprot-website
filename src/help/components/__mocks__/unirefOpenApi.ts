import { OpenAPIV3 } from 'openapi-types';

// Source: uniref/api/docs
// Retrieved: 2024-07-24
const unirefApiDocs: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    title: 'OpenAPI definition',
    version: 'v0',
  },
  servers: [
    {
      url: 'http://rest.uniprot.org',
      description: 'Generated server url',
    },
  ],
  tags: [
    {
      name: 'UniRef',
      description:
        'The UniProt Reference Clusters (UniRef) provide clustered sets of sequences from the UniProt Knowledgebase (including isoforms) and selected UniParc records. This hides redundant sequences and obtains complete coverage of the sequence space at three resolutions: UniRef100, UniRef90 and UniRef50.',
    },
  ],
  paths: {
    '/uniref/{id}': {
      get: {
        tags: ['UniRef'],
        summary: 'Get UniRef cluster entry by a single cluster id.',
        operationId: 'getById',
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: 'Unique identifier for the UniRef cluster',
            required: false,
            schema: {
              pattern: '(UniRef100|UniRef90|UniRef50)_\\w+(-[0-9]+)?',
              type: 'string',
            },
            example: 'UniRef100_P05067',
          },
          {
            name: 'fields',
            in: 'query',
            description:
              "List of fields to be returned, separated by commas.  <a href='https://rest.uniprot.org/configure/uniprotkb/result-fields'>List of valid fields</a>",
            required: false,
            schema: {
              type: 'string',
            },
            example: 'id,name,types,organism,identity',
          },
        ],
        responses: {
          default: {
            description: 'default response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UniRefEntry',
                },
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Entry',
                },
              },
              'text/plain;format=tsv': {},
              'text/plain;format=list': {},
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                {},
              'text/plain;format=fasta': {},
              'application/rdf+xml': {},
              'text/turtle': {},
              'application/n-triples': {},
            },
          },
        },
      },
    },
    '/uniref/{id}/members': {
      get: {
        tags: ['UniRef'],
        summary: 'Retrieve UniRef cluster members by a single cluster id.',
        operationId: 'search',
        parameters: [
          {
            name: 'id',
            in: 'query',
            description: 'Unique identifier for the UniRef cluster',
            required: true,
            schema: {
              pattern: '(UniRef100|UniRef90|UniRef50)_\\w+(-[0-9]+)?',
              type: 'string',
            },
            example: 'UniRef100_P05067',
          },
          {
            name: 'facetFilter',
            in: 'query',
            description: 'Facet filter query for UniRef Cluster Members',
            required: false,
            schema: {
              type: 'string',
            },
            example: 'member_id_type:uniprotkb_id',
          },
          {
            name: 'size',
            in: 'query',
            description: 'Pagination size. Defaults to 25. (Max. size of 500)',
            required: false,
            schema: {
              maximum: 500,
              minimum: 0,
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          default: {
            description: 'default response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UniRefMember',
                  },
                },
              },
              'text/plain;format=list': {},
            },
          },
        },
      },
    },
    '/uniref/{id}/light': {
      get: {
        tags: ['UniRef'],
        summary: 'Get a light UniRef cluster entry by a single cluster id.',
        operationId: 'getById_1',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Unique identifier for the UniRef cluster',
            required: true,
            schema: {
              pattern: '(UniRef100|UniRef90|UniRef50)_\\w+(-[0-9]+)?',
              type: 'string',
            },
            example: 'UniRef100_P05067',
          },
          {
            name: 'fields',
            in: 'query',
            description:
              "List of fields to be returned, separated by commas.  <a href='https://rest.uniprot.org/configure/uniprotkb/result-fields'>List of valid fields</a>",
            required: false,
            schema: {
              type: 'string',
            },
            example: 'id,name,types,organism,identity',
          },
        ],
        responses: {
          default: {
            description: 'default response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UniRefEntry',
                },
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Entry',
                },
              },
              'text/plain;format=tsv': {},
              'text/plain;format=list': {},
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                {},
              'text/plain;format=fasta': {},
              'application/rdf+xml': {},
            },
          },
        },
      },
    },
    '/uniref/stream': {
      get: {
        tags: ['UniRef'],
        summary:
          'Download light UniRef cluster entries retrieved by a search query. (Max. 10 million entries)',
        description:
          "The stream endpoint has a maximum limit of 10 million entries. For larger requests, please use the 'UniRef asynchronous download job' requests described below. The 'UniRef asynchronous download job' requests can be used for any size -- the asynchronous download jobs can be paused and resumed at your convenience, unlike the stream endpoint.",
        operationId: 'stream',
        parameters: [
          {
            name: 'query',
            in: 'query',
            description:
              "Criteria to search UniRef. Advanced queries can be built with parentheses and conditionals such as AND, OR and NOT. <a href='https://rest.uniprot.org/configure/uniparc/search-fields'>List of valid search fields</a>",
            required: true,
            schema: {
              type: 'string',
            },
            example: 'Transcription factors',
          },
          {
            name: 'sort',
            in: 'query',
            description:
              "Name of the field to be sorted on. <a href='https://rest.uniprot.org/configure/uniprotkb/sort'>List of valid sort fields</a>",
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'fields',
            in: 'query',
            description:
              "List of fields to be returned, separated by commas.  <a href='https://rest.uniprot.org/configure/uniprotkb/result-fields'>List of valid fields</a>",
            required: false,
            schema: {
              type: 'string',
            },
            example: 'id,name,types,organism,identity',
          },
          {
            name: 'complete',
            in: 'query',
            description:
              'Flag to include all member ids and organisms, or not. By default, it returns a maximum of 10 member ids and organisms',
            required: false,
            schema: {
              pattern: 'true|false',
              type: 'boolean',
            },
          },
          {
            name: 'download',
            in: 'query',
            description:
              'Default: <tt>false</tt>. Use <tt>true</tt> to download as a file.',
            required: false,
            schema: {
              pattern: '^true$|^false$',
              type: 'string',
            },
          },
        ],
        responses: {
          default: {
            description: 'default response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UniRefEntry',
                  },
                },
              },
              'application/xml': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Entry',
                  },
                },
              },
              'text/plain;format=tsv': {},
              'text/plain;format=list': {},
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                {},
              'text/plain;format=fasta': {},
            },
          },
        },
      },
    },
    '/uniref/search': {
      get: {
        tags: ['UniRef'],
        summary: 'Retrieve light UniRef cluster entries by a search query.',
        operationId: 'search_1',
        parameters: [
          {
            name: 'query',
            in: 'query',
            description:
              "Criteria to search UniRef. Advanced queries can be built with parentheses and conditionals such as AND, OR and NOT. <a href='https://rest.uniprot.org/configure/uniparc/search-fields'>List of valid search fields</a>",
            required: true,
            schema: {
              type: 'string',
            },
            example: 'Transcription factors',
          },
          {
            name: 'sort',
            in: 'query',
            description:
              "Name of the field to be sorted on. <a href='https://rest.uniprot.org/configure/uniprotkb/sort'>List of valid sort fields</a>",
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'fields',
            in: 'query',
            description:
              "List of fields to be returned, separated by commas.  <a href='https://rest.uniprot.org/configure/uniprotkb/result-fields'>List of valid fields</a>",
            required: false,
            schema: {
              type: 'string',
            },
            example: 'id,name,types,organism,identity',
          },
          {
            name: 'complete',
            in: 'query',
            description:
              'Flag to include all member ids and organisms, or not. By default, it returns a maximum of 10 member ids and organisms',
            required: false,
            schema: {
              pattern: 'true|false',
              type: 'boolean',
            },
          },
          {
            name: 'size',
            in: 'query',
            description: 'Pagination size. Defaults to 25. (Max. size of 500)',
            required: false,
            schema: {
              maximum: 500,
              minimum: 0,
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          default: {
            description: 'default response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UniRefEntry',
                  },
                },
              },
              'application/xml': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Entry',
                  },
                },
              },
              'text/plain;format=tsv': {},
              'text/plain;format=list': {},
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                {},
              'text/plain;format=fasta': {},
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CrossReferenceEvidenceDatabase: {
        type: 'object',
        properties: {
          properties: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Property',
            },
          },
          id: {
            type: 'string',
          },
          database: {
            $ref: '#/components/schemas/EvidenceDatabase',
          },
        },
      },
      Evidence: {
        type: 'object',
        properties: {
          evidenceCode: {
            type: 'string',
          },
          id: {
            type: 'string',
          },
          source: {
            type: 'string',
          },
        },
      },
      EvidenceDatabase: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          reference: {
            type: 'boolean',
          },
          evidenceDatabaseDetail: {
            $ref: '#/components/schemas/EvidenceDatabaseDetail',
          },
        },
      },
      EvidenceDatabaseDetail: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          displayName: {
            type: 'string',
          },
          category: {
            type: 'string',
            enum: ['I', 'C', 'A'],
          },
          uriLink: {
            type: 'string',
          },
        },
      },
      GeneOntologyEntry: {
        type: 'object',
        properties: {
          aspect: {
            type: 'string',
            enum: [
              'GO Molecular Function',
              'GO Biological Process',
              'GO Cellular Component',
            ],
          },
          ancestors: {
            uniqueItems: true,
            type: 'array',
            items: {
              $ref: '#/components/schemas/GeneOntologyEntry',
            },
          },
          name: {
            type: 'string',
          },
          id: {
            type: 'string',
          },
        },
      },
      Organism: {
        type: 'object',
        properties: {
          taxonId: {
            type: 'integer',
            format: 'int64',
          },
          lineages: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          scientificName: {
            type: 'string',
          },
          synonyms: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          commonName: {
            type: 'string',
          },
          evidences: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Evidence',
            },
          },
        },
      },
      OverlapRegion: {
        type: 'object',
        properties: {
          end: {
            type: 'integer',
            format: 'int32',
          },
          start: {
            type: 'integer',
            format: 'int32',
          },
        },
      },
      Property: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
          },
          value: {
            type: 'string',
          },
        },
      },
      RepresentativeMember: {
        type: 'object',
        properties: {
          sequence: {
            $ref: '#/components/schemas/Sequence',
          },
          uniProtAccessions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          memberIdType: {
            type: 'string',
            enum: [
              'UniProtKB Reviewed (Swiss-Prot)',
              'UniProtKB Unreviewed (TrEMBL)',
              'UniProtKB ID',
              'UniParc',
            ],
          },
          seed: {
            type: 'boolean',
          },
          memberId: {
            type: 'string',
          },
          organismTaxId: {
            type: 'integer',
            format: 'int64',
          },
          organismName: {
            type: 'string',
          },
          sequenceLength: {
            type: 'integer',
            format: 'int32',
          },
          proteinName: {
            type: 'string',
          },
          uniRef50Id: {
            type: 'string',
          },
          uniRef90Id: {
            type: 'string',
          },
          uniRef100Id: {
            type: 'string',
          },
          uniParcId: {
            type: 'string',
          },
          overlapRegion: {
            $ref: '#/components/schemas/OverlapRegion',
          },
        },
      },
      Sequence: {
        type: 'object',
        properties: {
          value: {
            type: 'string',
          },
          length: {
            type: 'integer',
            format: 'int32',
            xml: {
              attribute: true,
            },
          },
          checksum: {
            type: 'string',
            xml: {
              attribute: true,
            },
          },
        },
      },
      UniRefEntry: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          id: {
            type: 'string',
          },
          members: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/UniRefMember',
            },
          },
          representativeMember: {
            $ref: '#/components/schemas/RepresentativeMember',
          },
          entryType: {
            type: 'string',
            enum: ['UniRef100', 'UniRef90', 'UniRef50'],
          },
          updated: {
            type: 'string',
            format: 'date',
          },
          memberCount: {
            type: 'integer',
            format: 'int32',
          },
          commonTaxon: {
            $ref: '#/components/schemas/Organism',
          },
          goTerms: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/GeneOntologyEntry',
            },
          },
          seedId: {
            type: 'string',
          },
        },
      },
      UniRefMember: {
        type: 'object',
        properties: {
          uniProtAccessions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          memberIdType: {
            type: 'string',
            enum: [
              'UniProtKB Reviewed (Swiss-Prot)',
              'UniProtKB Unreviewed (TrEMBL)',
              'UniProtKB ID',
              'UniParc',
            ],
          },
          seed: {
            type: 'boolean',
          },
          memberId: {
            type: 'string',
          },
          organismTaxId: {
            type: 'integer',
            format: 'int64',
          },
          organismName: {
            type: 'string',
          },
          sequenceLength: {
            type: 'integer',
            format: 'int32',
          },
          proteinName: {
            type: 'string',
          },
          uniRef50Id: {
            type: 'string',
          },
          uniRef90Id: {
            type: 'string',
          },
          uniRef100Id: {
            type: 'string',
          },
          uniParcId: {
            type: 'string',
          },
          overlapRegion: {
            $ref: '#/components/schemas/OverlapRegion',
          },
        },
      },
      DbReferenceType: {
        type: 'object',
        properties: {
          property: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PropertyType',
            },
          },
          type: {
            type: 'string',
            xml: {
              attribute: true,
            },
          },
          id: {
            type: 'string',
            xml: {
              attribute: true,
            },
          },
        },
      },
      Entry: {
        required: ['name', 'representativeMember'],
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          property: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PropertyType',
            },
          },
          representativeMember: {
            $ref: '#/components/schemas/MemberType',
          },
          member: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/MemberType',
            },
          },
          id: {
            type: 'string',
            xml: {
              attribute: true,
            },
          },
          updated: {
            type: 'string',
            format: 'date-time',
            xml: {
              attribute: true,
            },
          },
        },
        xml: {
          name: 'entry',
          namespace: 'http://uniprot.org/uniref',
        },
      },
      MemberType: {
        required: ['dbReference'],
        type: 'object',
        properties: {
          dbReference: {
            $ref: '#/components/schemas/DbReferenceType',
          },
          sequence: {
            $ref: '#/components/schemas/Sequence',
          },
        },
      },
      PropertyType: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            xml: {
              attribute: true,
            },
          },
          value: {
            type: 'string',
            xml: {
              attribute: true,
            },
          },
        },
      },
    },
  },
};

export default unirefApiDocs;
