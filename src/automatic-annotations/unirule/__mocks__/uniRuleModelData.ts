import { UniRuleAPIModel } from '../adapters/uniRuleConverter';

// Source: /api/unirule/search?query=insulin&size=2
// Retrieved: 2024-05-25
const mock: UniRuleAPIModel[] = [
  {
    uniRuleId: 'UR000048432',
    information: {
      version: '0',
      oldRuleNum: 'RU241113',
      dataClass: 'Protein',
    },
    mainRule: {
      conditionSets: [
        {
          conditions: [
            {
              conditionValues: [
                {
                  value: 'PF07281',
                },
              ],
              type: 'Pfam id',
              isNegative: false,
            },
            {
              type: 'sequence length',
              isNegative: false,
              range: {
                start: {
                  value: 100,
                  modifier: 'EXACT',
                },
                end: {
                  value: 400,
                  modifier: 'EXACT',
                },
              },
            },
            {
              conditionValues: [
                {
                  value: 'Euteleostomi',
                  cvId: '117571',
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
                value: 'Insulin-induced gene protein',
              },
            },
          },
        },
        {
          annotationType: 'ANNOTATION',
          comment: {
            texts: [
              {
                value: 'Mediates feedback control of cholesterol synthesis',
              },
            ],
            commentType: 'FUNCTION',
          },
        },
        {
          annotationType: 'ANNOTATION',
          comment: {
            texts: [
              {
                value: 'Belongs to the INSIG family',
              },
            ],
            commentType: 'SIMILARITY',
          },
        },
        {
          annotationType: 'ANNOTATION',
          keyword: {
            id: 'KW-0153',
            category: 'Unknown',
            name: 'Cholesterol metabolism',
          },
        },
        {
          annotationType: 'ANNOTATION',
          keyword: {
            id: 'KW-0443',
            category: 'Unknown',
            name: 'Lipid metabolism',
          },
        },
        {
          annotationType: 'ANNOTATION',
          keyword: {
            id: 'KW-0753',
            category: 'Unknown',
            name: 'Steroid metabolism',
          },
        },
      ],
      ruleExceptions: [
        {
          category: 'Known exception',
          annotation: {
            annotationType: 'ANNOTATION',
            proteinDescription: {
              recommendedName: {
                fullName: {
                  value: 'Insulin-induced gene protein',
                },
              },
            },
          },
          accessions: [
            'Q8AV61',
            'A9RA88',
            'A0JNC3',
            'Q5ZMT9',
            'Q8CFA6',
            'O15503',
            'Q8BGI3',
            'Q08755',
            'Q6DF80',
            'Q0V9G6',
            'B0CMA4',
            'Q5F3W2',
            'Q9Y5U4',
            'Q91WG1',
            'Q6PQZ3',
            'Q5R687',
            'Q80UA9',
            'Q66J27',
            'Q5U4Q2',
          ],
        },
      ],
    },
    samFeatureSets: [
      {
        annotations: [
          {
            annotationType: 'ANNOTATION',
            comment: {
              commentType: 'SUBCELLULAR LOCATION',
              subcellularLocations: [
                {
                  location: {
                    value: 'Endoplasmic reticulum membrane',
                  },
                  topology: {
                    value: 'Multi-pass membrane protein',
                  },
                },
              ],
            },
          },
          {
            annotationType: 'ANNOTATION',
            keyword: {
              id: 'KW-0256',
              category: 'Unknown',
              name: 'Endoplasmic reticulum',
            },
          },
        ],
        samTrigger: {
          samTriggerType: 'transmembrane',
          expectedHits: {
            start: {
              value: 5,
              modifier: 'EXACT',
            },
            end: {
              value: 5,
              modifier: 'EXACT',
            },
          },
        },
      },
    ],
    statistics: {
      reviewedProteinCount: 0,
      unreviewedProteinCount: 1842,
    },
    createdDate: '2012-07-03',
    modifiedDate: '2018-11-13',
  },
  {
    uniRuleId: 'UR000189784',
    information: {
      version: '1',
      oldRuleNum: 'PIRNR037062',
      dataClass: 'Domain',
      uniProtAccessions: ['Q9QY05', 'Q9Y581'],
    },
    mainRule: {
      conditionSets: [
        {
          conditions: [
            {
              conditionValues: [
                {
                  value: 'PIRSF037062',
                },
              ],
              type: 'PIR superfamily id',
              isNegative: false,
            },
            {
              type: 'sequence length',
              isNegative: false,
              range: {
                start: {
                  value: 188,
                  modifier: 'EXACT',
                },
                end: {
                  value: 213,
                  modifier: 'EXACT',
                },
              },
            },
            {
              conditionValues: [
                {
                  value: 'Mammalia',
                  cvId: '40674',
                },
              ],
              type: 'taxon',
              isNegative: false,
            },
            {
              type: 'fragment',
              isNegative: true,
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
                value: 'Insulin-like peptide INSL6',
              },
            },
          },
        },
        {
          annotationType: 'ANNOTATION',
          comment: {
            texts: [
              {
                value: 'May have a role in sperm development and fertilization',
              },
            ],
            commentType: 'FUNCTION',
          },
        },
        {
          annotationType: 'ANNOTATION',
          comment: {
            commentType: 'SUBCELLULAR LOCATION',
            subcellularLocations: [
              {
                location: {
                  value: 'Secreted',
                },
              },
            ],
          },
        },
        {
          annotationType: 'ANNOTATION',
          comment: {
            texts: [
              {
                value: 'Belongs to the insulin family',
              },
            ],
            commentType: 'SIMILARITY',
          },
        },
        {
          annotationType: 'ANNOTATION',
          keyword: {
            id: 'KW-0372',
            category: 'Unknown',
            name: 'Hormone',
          },
        },
        {
          annotationType: 'ANNOTATION',
          dbReference: {
            database: 'GO',
            id: 'GO:0005179',
            properties: [
              {
                key: 'GoTerm',
                value: '-',
              },
              {
                key: 'GoEvidenceType',
                value: ':-',
              },
            ],
          },
        },
        {
          annotationType: 'ANNOTATION',
          dbReference: {
            database: 'GO',
            id: 'GO:0005576',
            properties: [
              {
                key: 'GoTerm',
                value: '-',
              },
              {
                key: 'GoEvidenceType',
                value: ':-',
              },
            ],
          },
        },
      ],
    },
    samFeatureSets: [
      {
        annotations: [
          {
            annotationType: 'ANNOTATION',
            keyword: {
              id: 'KW-0964',
              category: 'Unknown',
              name: 'Secreted',
            },
          },
        ],
        samTrigger: {
          samTriggerType: 'signal',
          expectedHits: {
            start: {
              value: 1,
              modifier: 'EXACT',
            },
            end: {
              value: 1,
              modifier: 'EXACT',
            },
          },
        },
      },
    ],
    statistics: {
      reviewedProteinCount: 0,
      unreviewedProteinCount: 44,
    },
    createdDate: '2015-05-22',
    modifiedDate: '2018-11-13',
  },
];

export default mock;
