import * as logging from '../../../../shared/utils/logging';
import proteomicsPtmAdapter from '../proteomicsPtmAdapter';

jest.mock('../../../../shared/utils/logging');

const ptm = (
  name: string,
  position: number,
  id: string,
  confidenceScore?: string
) => ({
  name,
  position,
  sources: ['PRIDE'],
  dbReferences: [
    {
      id,
      properties: confidenceScore
        ? { 'Confidence score': confidenceScore }
        : {},
    },
  ],
});

describe('proteomicsPtmAdapter', () => {
  it('returns an empty list for missing or empty data', () => {
    expect(proteomicsPtmAdapter(undefined)).toEqual([]);
    expect(proteomicsPtmAdapter({})).toEqual([]);
  });

  it('places the PTM at its absolute position in the sequence', () => {
    const [feature] = proteomicsPtmAdapter({
      features: [
        {
          begin: '100',
          peptide: 'ASTPEKSLYR',
          ptms: [ptm('Phosphorylation', 3, 'PXD008952', 'Gold')],
        },
      ],
    });

    // begin + position - 1
    expect(feature).toMatchObject({
      source: 'PTMeXchange',
      type: 'MOD_RES_LS',
      start: 102,
      end: 102,
      shape: 'triangle',
    });
  });

  it('describes the modified residue from the peptide', () => {
    const [feature] = proteomicsPtmAdapter({
      features: [
        {
          begin: '100',
          peptide: 'ASTPEKSLYR',
          ptms: [ptm('Phosphorylation', 3, 'PXD008952', 'Gold')],
        },
      ],
    });

    // peptide[position - 1] === 'T'
    expect(feature.tooltipContent).toContain('Phosphothreonine');
    expect(feature.tooltipContent).toContain('MOD_RES_LS 102-102');
  });

  it('colours by confidence score and surfaces it in the tooltip', () => {
    const forScore = (score: string) =>
      proteomicsPtmAdapter({
        features: [
          {
            begin: '1',
            peptide: 'SK',
            ptms: [ptm('Phosphorylation', 1, 'PXD008952', score)],
          },
        ],
      })[0];

    expect(forScore('Gold').color).toBe('#c39b00');
    expect(forScore('Silver').color).toBe('#8194a1');
    expect(forScore('Bronze').color).toBe('#a65708');
    expect(forScore('Gold').tooltipContent).toContain('Gold');
  });

  it('falls back to black when there is no confidence score', () => {
    const [feature] = proteomicsPtmAdapter({
      features: [
        {
          begin: '1',
          peptide: 'SK',
          ptms: [ptm('Phosphorylation', 1, 'PXD1')],
        },
      ],
    });
    expect(feature.color).toBe('black');
  });

  it('groups PTMs sharing a position and modification into one feature', () => {
    const features = proteomicsPtmAdapter({
      features: [
        {
          begin: '10',
          peptide: 'SKT',
          ptms: [
            ptm('Phosphorylation', 1, 'PXD000001', 'Gold'),
            ptm('Phosphorylation', 1, 'PXD000002', 'Gold'),
          ],
        },
      ],
    });

    expect(features).toHaveLength(1);
    expect(features[0].tooltipContent).toContain('PXD000001');
    expect(features[0].tooltipContent).toContain('PXD000002');
  });

  it('splits different modifications at the same position', () => {
    const features = proteomicsPtmAdapter({
      features: [
        {
          begin: '10',
          peptide: 'KST',
          ptms: [
            ptm('Phosphorylation', 2, 'PXD000001', 'Gold'),
            ptm('Acetylation', 2, 'PXD000002', 'Gold'),
          ],
        },
      ],
    });

    expect(features).toHaveLength(2);
    expect(features.map((f) => f.start)).toEqual([11, 11]);
  });

  it('maps the Glue project dataset to its PXD id and publication', () => {
    const [feature] = proteomicsPtmAdapter({
      features: [
        {
          begin: '1',
          peptide: 'SK',
          ptms: [ptm('Phosphorylation', 1, 'Glue project', 'Gold')],
        },
      ],
    });

    expect(feature.tooltipContent).toContain('PXD012174');
    expect(feature.tooltipContent).not.toContain('Glue project');
    expect(feature.tooltipContent).toContain('31819260');
  });

  it('skips a PTM whose absolute position is not a finite number', () => {
    expect(
      proteomicsPtmAdapter({
        features: [
          {
            begin: 'not-a-number',
            peptide: 'SK',
            ptms: [ptm('Phosphorylation', 1, 'PXD1', 'Gold')],
          },
        ],
      })
    ).toEqual([]);

    expect(logging.error).toHaveBeenCalledWith(
      expect.stringContaining('Encountered infinite number')
    );
  });
});
