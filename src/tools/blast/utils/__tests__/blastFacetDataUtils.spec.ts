import { filterBlastDataForResults } from '../blastFacetDataUtils';

const blastHits = [
  { hit_hsps: [{ hsp_score: 100, hsp_identity: 10, hsp_expect: 0.1 }] },
  { hit_hsps: [{ hsp_score: 101, hsp_identity: 11, hsp_expect: 0.2 }] },
  { hit_hsps: [{ hsp_score: 102, hsp_identity: 12, hsp_expect: 0.3 }] },
];

describe('filterBlastDataForResults', () => {
  it('should filter hits by score facet', () => {
    const facet = [
      {
        name: 'score',
        value: '[100 TO 101]',
      },
    ];
    expect(filterBlastDataForResults({ hits: blastHits }, facet)).toEqual({
      hits: [
        {
          hit_hsps: [
            {
              hsp_score: 100,
              hsp_identity: 10,
              hsp_expect: 0.1,
            },
          ],
        },
        {
          hit_hsps: [
            {
              hsp_score: 101,
              hsp_identity: 11,
              hsp_expect: 0.2,
            },
          ],
        },
      ],
      alignments: 2,
    });
  });
});
