import { type GeneNamesData } from '../../../../adapters/namesAndTaxonomyConverter';

const mock: GeneNamesData = [
  {
    geneName: {
      value: 'some Gene',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PIRNR',
          id: 'PIRNR001360',
        },
      ],
    },
    synonyms: [
      {
        value: 'some Syn',
        evidences: [
          {
            evidenceCode: 'ECO:0000256',
            source: 'PIRNR',
            id: 'PIRNR001361',
          },
        ],
      },
    ],
    orderedLocusNames: [
      {
        value: 'some locus',
        evidences: [
          {
            evidenceCode: 'ECO:0000256',
            source: 'PIRNR',
            id: 'PIRNR001362',
          },
        ],
      },
    ],
    orfNames: [
      {
        value: 'some orf',
        evidences: [
          {
            evidenceCode: 'ECO:0000269',
            source: 'PubMed',
            id: '11389730',
          },
        ],
      },
    ],
  },
];

export default mock;
