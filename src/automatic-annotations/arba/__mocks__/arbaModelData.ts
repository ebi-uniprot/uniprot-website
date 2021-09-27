import { ARBAAPIModel } from '../adapters/arbaConverter';

// Data from /api/arba/search?query=insulin&size=2
const mock: ARBAAPIModel[] = [
  {
    uniRuleId: 'ARBA00013665',
    information: { version: '0' },
    mainRule: {
      conditionSets: [
        {
          conditions: [
            {
              conditionValues: [{ value: 'IPR000716' }],
              type: 'InterPro id',
              isNegative: false,
            },
            {
              conditionValues: [{ value: 'IPR000867' }],
              type: 'InterPro id',
              isNegative: false,
            },
            {
              conditionValues: [{ value: 'IPR012213' }],
              type: 'InterPro id',
              isNegative: false,
            },
          ],
        },
      ],
      annotations: [
        {
          annotationType: 'ANNOTATION',
          proteinDescription: {
            recommendedName: {
              fullName: {
                value: 'Insulin-like growth factor-binding protein 5',
              },
            },
          },
        },
      ],
    },
    statistics: { reviewedProteinCount: 0, unreviewedProteinCount: 608 },
    createdDate: '2020-05-12',
    modifiedDate: '2020-05-12',
  },
  {
    uniRuleId: 'ARBA00013675',
    information: { version: '0' },
    mainRule: {
      conditionSets: [
        {
          conditions: [
            {
              conditionValues: [{ value: 'IPR000716' }],
              type: 'InterPro id',
              isNegative: false,
            },
            {
              conditionValues: [{ value: 'IPR000867' }],
              type: 'InterPro id',
              isNegative: false,
            },
            {
              conditionValues: [{ value: 'IPR022322' }],
              type: 'InterPro id',
              isNegative: false,
            },
          ],
        },
      ],
      annotations: [
        {
          annotationType: 'ANNOTATION',
          proteinDescription: {
            recommendedName: {
              fullName: {
                value: 'Insulin-like growth factor-binding protein 1',
              },
            },
          },
        },
      ],
    },
    statistics: { reviewedProteinCount: 0, unreviewedProteinCount: 613 },
    createdDate: '2020-05-12',
    modifiedDate: '2020-05-12',
  },
];

export default mock;
