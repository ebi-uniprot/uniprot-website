import { SearchResults } from '../../../shared/types/results';
import { ARBAAPIModel } from '../adapters/arbaConverter';

// Source: arba/search?query=insulin&size=2
// Retrieved: 2025-06-18
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
          {
            conditions: [
              {
                conditionValues: [
                  {
                    value: '1.10.100.10:FF:000003',
                  },
                ],
                type: 'FunFam id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'Actinopterygii',
                    cvId: '7898',
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
        unreviewedProteinCount: 1045,
      },
      createdDate: '2020-05-12',
      modifiedDate: '2025-03-21',
    },
    {
      uniRuleId: 'ARBA00070927',
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
                    value: '1.10.510.10:FF:000050',
                  },
                ],
                type: 'FunFam id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: '2.10.220.10:FF:000005',
                  },
                ],
                type: 'FunFam id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: '2.60.40.10:FF:000087',
                  },
                ],
                type: 'FunFam id',
                isNegative: false,
              },
            ],
          },
          {
            conditions: [
              {
                conditionValues: [
                  {
                    value: '2.60.40.10:FF:001010',
                  },
                ],
                type: 'FunFam id',
                isNegative: false,
              },
              {
                conditionValues: [
                  {
                    value: 'Eukaryota',
                    cvId: '2759',
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
                  value: 'Insulin receptor',
                },
              },
            },
          },
        ],
      },
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 40,
      },
      createdDate: '2025-03-21',
      modifiedDate: '2025-03-21',
    },
  ],
};

export default mock.results;
