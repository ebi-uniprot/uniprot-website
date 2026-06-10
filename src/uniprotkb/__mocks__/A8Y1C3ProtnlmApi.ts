import { type UniProtKBProtNLMAPIModel } from '../types/protNLMAPIModel';

// Source: uniprotkb/protnlm/A8Y1C3
// Retrieved: 2026-06-04
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
                value: '0.85',
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
                    value: '0.74',
                  },
                  {
                    key: 'string_match_text',
                    value: 'GO:0016020',
                  },
                  {
                    key: 'string_match_location',
                    value: 'GO',
                  },
                  {
                    key: 'string_match_type',
                    value: 'exact_sanitized',
                  },
                ],
              },
            ],
            value: 'Membrane',
            id: 'SL-0162',
          },
        },
      ],
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
  extraAttributes: {
    countByCommentType: {
      'SUBCELLULAR LOCATION': 1,
    },
  },
};

export default data;
