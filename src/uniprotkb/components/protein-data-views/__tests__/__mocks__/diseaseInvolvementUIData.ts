import { DiseaseComment } from '../../../../types/commentTypes';

const mock: DiseaseComment[] = [
  {
    commentType: 'DISEASE',
    disease: {
      diseaseId: 'Alzheimers',
      diseaseAccession: 'ASDASDAS',
      acronym: 'AD',
      description: 'Some description',
      diseaseCrossReference: {
        database: 'EMBL',
        id: 'some ref id',
        properties: {
          prop1: 'value1',
        },
        isoformId: 'some isoform',
      },
      evidences: [],
    },
    note: {
      texts: [
        {
          value: 'Some disease note',
        },
      ],
    },
    variants: {
      VAR_019255: {
        type: 'Natural variant',
        location: {
          start: {
            value: 23,
            modifier: 'EXACT',
          },
          end: {
            value: 23,
            modifier: 'EXACT',
          },
        },
        description: 'in dbSNP:rs13447459',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'Reference',
            id: 'Ref.4',
          },
        ],
        featureId: 'VAR_019255',
        alternativeSequence: {
          originalSequence: 'Q',
          alternativeSequences: ['P'],
        },
      },
      VAR_019256: {
        type: 'Natural variant',
        location: {
          start: {
            value: 99,
            modifier: 'EXACT',
          },
          end: {
            value: 99,
            modifier: 'EXACT',
          },
        },
        description: 'in dbSNP:rs13447492',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'Reference',
            id: 'Ref.4',
          },
        ],
        featureId: 'VAR_019256',
        alternativeSequence: {
          originalSequence: 'I',
          alternativeSequences: ['V'],
        },
      },
    },
  },
];

export default mock;
