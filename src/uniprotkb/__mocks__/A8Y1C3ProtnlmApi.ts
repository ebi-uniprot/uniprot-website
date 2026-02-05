import { type UniProtKBProtNLMAPIModel } from '../types/protNLMAPIModel';

// TODO: update url once this endpoint becomes part of rest.uniprot.org
// Source: https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/protnlm/A8Y1C3
// Retrieved: 2026-02-01
const data: UniProtKBProtNLMAPIModel = {
  entryType: 'UniProtKB unreviewed (TrEMBL)',
  primaryAccession: 'A8Y1C3',
  uniProtkbId: 'A8Y1C3_CAEBR',
  entryAudit: {
    firstPublicDate: '1111-11-10',
    lastAnnotationUpdateDate: '1111-11-10',
    lastSequenceUpdateDate: '1111-11-10',
    entryVersion: 1,
    sequenceVersion: 1,
  },
  annotationScore: 0,
  proteinExistence: '5: Uncertain',
  proteinDescription: {
    recommendedName: {
      fullName: {
        evidences: [
          {
            evidenceCode: 'ECO:0008006',
            source: 'Google',
            id: 'ProtNLM2',
            properties: [
              {
                key: 'model_score',
                value: '0.64',
              },
              {
                key: 'string_match_text',
                value: 'IPR007669',
              },
              {
                key: 'string_match_location',
                value: 'InterPro',
              },
              {
                key: 'string_match_type',
                value: 'hydrated',
              },
            ],
          },
        ],
        value: 'Carbohydrate sulfotransferase',
      },
    },
  },
  comments: [
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0008006',
                source: 'Google',
                id: 'ProtNLM2',
                properties: [
                  {
                    key: 'model_score',
                    value: '0.64',
                  },
                  {
                    key: 'phmmer_accession',
                    value: 'Q09272',
                  },
                  {
                    key: 'phmmer_score',
                    value: '136.3',
                  },
                ],
              },
            ],
            value: 'Golgi apparatus membrane',
          },
        },
      ],
    },
  ],
  keywords: [
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.5',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
      id: 'KW-0119',
      category: 'Biological process',
      name: 'Carbohydrate metabolism',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.5',
            },
            {
              key: 'tmalign_accession',
              value: 'Q99LL3',
            },
            {
              key: 'tmalign_score_chain_1',
              value: '0.594',
            },
            {
              key: 'tmalign_score_chain_2',
              value: '0.47778',
            },
          ],
        },
      ],
      id: 'KW-0325',
      category: 'PTM',
      name: 'Glycoprotein',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.5',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
      id: 'KW-0333',
      category: 'Cellular component',
      name: 'Golgi apparatus',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.49',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
      id: 'KW-0735',
      category: 'Domain',
      name: 'Signal-anchor',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.49',
            },
            {
              key: 'string_match_text',
              value: 'IPR005331',
            },
            {
              key: 'string_match_location',
              value: 'InterPro',
            },
            {
              key: 'string_match_type',
              value: 'hydrated',
            },
          ],
        },
      ],
      id: 'KW-0808',
      category: 'Molecular function',
      name: 'Transferase',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.49',
            },
            {
              key: 'phmmer_accession',
              value: 'Q18079',
            },
            {
              key: 'phmmer_score',
              value: '140.2',
            },
          ],
        },
      ],
      id: 'KW-0812',
      category: 'Domain',
      name: 'Transmembrane',
    },
  ],
  references: [
    {
      referenceNumber: 1,
      citation: {
        id: 'CI-FC84BSHK1H4IL',
        citationType: 'unpublished observations',
      },
      referencePositions: ['required field'],
    },
  ],
  uniProtKBCrossReferences: [
    {
      database: 'GO',
      id: 'GO:0000139',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:Golgi membrane',
        },
        {
          key: 'GoEvidenceType',
          value: ':-',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.61',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008146',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:sulfotransferase activity',
        },
        {
          key: 'GoEvidenceType',
          value: ':-',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.6',
            },
            {
              key: 'string_match_text',
              value: 'GO:0047756',
            },
            {
              key: 'string_match_location',
              value: 'GO',
            },
            {
              key: 'string_match_type',
              value: 'hydrated',
            },
          ],
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016051',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:carbohydrate biosynthetic process',
        },
        {
          key: 'GoEvidenceType',
          value: ':-',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.59',
            },
            {
              key: 'tmalign_accession',
              value: 'Q805E5',
            },
            {
              key: 'tmalign_score_chain_1',
              value: '0.59579',
            },
            {
              key: 'tmalign_score_chain_2',
              value: '0.53728',
            },
          ],
        },
      ],
    },
  ],
  extraAttributes: {
    countByCommentType: {
      'SUBCELLULAR LOCATION': 1,
    },
  },
};

export default data;
