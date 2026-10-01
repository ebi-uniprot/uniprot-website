import { getTooltipContent } from '..';

jest.mock('../../../../shared/utils/logging');

const context = { sequence: 'M'.repeat(100) };

describe('getTooltipContent', () => {
  it('builds the tooltip for a known kind', () => {
    const html = getTooltipContent(
      'features',
      { type: 'SIGNAL', start: 1, end: 24, description: 'Signal peptide' },
      context
    );

    expect(html).toContain('SIGNAL 1-24');
    expect(html).toContain('Signal peptide');
  });

  it('picks the builder by kind, not by the shape of the feature', () => {
    const feature = {
      type: 'InterPro Representative Domain',
      start: 10,
      end: 99,
      accession: 'PF13837',
      name: 'Myb_DNA-bind_4',
      // eslint-disable-next-line camelcase -- InterPro API field name
      source_database: 'pfam',
      integrated: null,
    };

    // Only the InterPro builder renders the member database accession
    expect(getTooltipContent('interpro-features', feature, context)).toContain(
      'PF13837'
    );
    expect(getTooltipContent('features', feature, context)).not.toContain(
      'PF13837'
    );
  });

  it('returns undefined for an unmapped or missing kind', () => {
    const feature = { type: 'SIGNAL', start: 1, end: 24 };

    expect(
      getTooltipContent('alphafold-confidence', feature, context)
    ).toBeUndefined();
    expect(getTooltipContent(null, feature, context)).toBeUndefined();
    expect(getTooltipContent(undefined, feature, context)).toBeUndefined();
  });

  it('returns undefined when there is no feature object', () => {
    expect(getTooltipContent('features', undefined, context)).toBeUndefined();
    expect(getTooltipContent('features', 'SIGNAL', context)).toBeUndefined();
  });

  it('returns undefined when the builder cannot handle the payload', () => {
    // structureTooltip expects `structures` to be an array
    expect(
      getTooltipContent('structure-coverage', { structures: 42 }, context)
    ).toBeUndefined();
  });
});
