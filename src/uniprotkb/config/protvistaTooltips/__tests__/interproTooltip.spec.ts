import interproTooltip, { type InterProFeature } from '../interproTooltip';

const feature: InterProFeature = {
  start: 200,
  end: 260,
  accession: 'PF13837',
  name: 'Myb_DNA-bind_4',
  // eslint-disable-next-line camelcase -- InterPro API field name
  source_database: 'pfam',
  integrated: null,
};

describe('interproTooltip', () => {
  // As in v4: every fragment shows the span of the whole entry
  it('heads the tooltip with the entry-wide span', () => {
    const html = interproTooltip({
      ...feature,
      locations: [
        { fragments: [{ start: 10, end: 50 }] },
        { fragments: [{ start: 200, end: 260 }] },
      ],
    });

    expect(html).toContain('InterPro Representative Domain 10-260');
  });

  it("falls back to the feature's own range without locations", () => {
    expect(interproTooltip(feature)).toContain(
      'InterPro Representative Domain 200-260'
    );
  });
});
