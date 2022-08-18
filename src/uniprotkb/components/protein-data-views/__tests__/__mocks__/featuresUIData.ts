import { FeatureDatum } from '../../UniProtKBFeaturesView';

const mock: FeatureData = [
  {
    type: 'Signal',
    location: {
      start: {
        value: 1,
        modifier: 'EXACT',
      },
      end: {
        value: 17,
        modifier: 'EXACT',
      },
    },
    description: '',
    evidences: [
      {
        evidenceCode: 'ECO:0000269',
        source: 'PubMed',
        id: '12665801',
      },
      {
        evidenceCode: 'ECO:0000269',
        source: 'PubMed',
        id: '2900137',
      },
      {
        evidenceCode: 'ECO:0000269',
        source: 'PubMed',
        id: '3597385',
      },
    ],
  },
];

export default mock;
