import { SearchResults } from '../../../shared/types/results';
import { ARBAAPIModel } from '../adapters/arbaConverter';

// Source: arba/search?query=insulin&size=2
// Retrieved: 2024-10-01
const mock: SearchResults<ARBAAPIModel> = {
  results: [
    {
      uniRuleId: 'ARBA00020180',
      information: {
        version: '0',
      },
      mainRule: {
        conditionSets: [
          {
            conditions: [
              {
                conditionValues: [
                  {
                    value: 'IPR004825',
                  },
                ],
                type: 'InterPro id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'IPR016179',
                  },
                ],
                type: 'InterPro id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'Laurasiatheria',
                    cvId: '314145',
                  },
                ],
                type: 'taxon',
                isNegative: false,
              },
            ],
          },
          {
            conditions: [
              {
                conditionValues: [
                  {
                    value: 'IPR022352',
                  },
                ],
                type: 'InterPro id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'PTHR11454:SF9',
                  },
                ],
                type: 'PANTHER id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'Archelosauria',
                    cvId: '1329799',
                  },
                ],
                type: 'taxon',
                isNegative: false,
              },
            ],
          },
          {
            conditions: [
              {
                conditionValues: [
                  {
                    value: 'IPR022353',
                  },
                ],
                type: 'InterPro id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'IPR036438',
                  },
                ],
                type: 'InterPro id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'Eupercaria',
                    cvId: '1489922',
                  },
                ],
                type: 'taxon',
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
                  value: 'Insulin',
                },
              },
            },
          },
        ],
      },
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 747,
      },
      createdDate: '2020-05-12',
      modifiedDate: '2023-10-01',
    },
    {
      uniRuleId: 'ARBA00014427',
      information: {
        version: '0',
      },
      mainRule: {
        conditionSets: [
          {
            conditions: [
              {
                conditionValues: [
                  {
                    value: 'IPR016179',
                  },
                ],
                type: 'InterPro id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'IPR043387',
                  },
                ],
                type: 'InterPro id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'Chordata',
                    cvId: '7711',
                  },
                ],
                type: 'taxon',
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
                  value: 'Insulin-like 3',
                },
              },
            },
          },
        ],
      },
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 252,
      },
      createdDate: '2020-05-12',
      modifiedDate: '2020-10-22',
    },
  ],
};

export default mock.results;
