import { DiseaseComment } from '../../../../types/commentTypes';
import { FeatureDatum } from '../../UniProtKBFeaturesView';

const mock: { comments: DiseaseComment[]; features: FeatureDatum[] } = {
  comments: [
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
    },
  ],
  features: [
    {
      type: 'Natural variant',
      location: {
        start: {
          value: 22,
          modifier: 'EXACT',
        },
        end: {
          value: 22,
          modifier: 'EXACT',
        },
      },
      description: 'in ADDDD; not supposed to be rendered with the disease',
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
    {
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
      description: 'in AD; supposed to be rendered with the disease',
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
    {
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
      description: 'in AD',
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
    {
      type: 'Natural variant',
      location: {
        start: {
          value: 100,
          modifier: 'EXACT',
        },
        end: {
          value: 100,
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
      featureId: 'VAR_999999',
      alternativeSequence: {
        originalSequence: 'I',
        alternativeSequences: ['V'],
      },
    },
  ],
};

export default mock;
