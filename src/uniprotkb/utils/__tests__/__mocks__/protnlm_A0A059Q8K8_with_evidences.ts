import { type UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';

const data: UniProtkbAPIModel = {
  entryType: 'UniProtKB unreviewed (TrEMBL)',
  primaryAccession: 'A0A059Q8K8',
  uniProtkbId: 'A0A059Q8K8_GOSHI',
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
                value: '0.56',
              },
              {
                key: 'exact_match_sanitized_to_all_2023_04',
                value: null,
              },
              {
                key: 'exact_match_sanitized_to_all_2025_01',
                value: null,
              },
            ],
          },
        ],
        value: 'WRKY domain-containing protein',
      },
    },
  },
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
};
export default data;
