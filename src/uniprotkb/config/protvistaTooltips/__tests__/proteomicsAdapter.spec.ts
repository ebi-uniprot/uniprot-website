import proteomicsAdapter from '../proteomicsAdapter';

jest.mock('../../../../shared/utils/logging');

// Shaped after the Proteins API `/proteomics/ptm/` response for a PTM-containing
// peptide, the case the rich tooltip exists for.
const ptmPeptideResponse = {
  taxid: 9606,
  features: [
    {
      type: 'PROTEOMICS_PTM',
      begin: '206',
      end: '217',
      peptide: 'AAESDVNVSSPR',
      unique: true,
      xrefs: [
        {
          name: 'Proteomes',
          id: 'UP000059680',
          url: 'https://www.uniprot.org/proteomes/UP000059680',
        },
      ],
      ptms: [
        {
          name: 'Phosphorylation',
          position: 10,
          sources: ['PRIDE'],
          dbReferences: [
            {
              id: 'PXD004939',
              properties: { 'PeptideAtlas URL': 'https://peptideatlas.org/x' },
            },
          ],
        },
      ],
    },
  ],
};

// Approximates the rendered text: links stay inline, block tags break lines.
const text = (html: string) =>
  html
    .replace(/<\/?a\b[^>]*>/g, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');

describe('proteomicsAdapter', () => {
  it('returns an empty list for missing or empty data', () => {
    expect(proteomicsAdapter(undefined)).toEqual([]);
    expect(proteomicsAdapter({ features: [] })).toEqual([]);
  });

  it('still flattens the type for the track to render and filter on', () => {
    const [feature] = proteomicsAdapter(ptmPeptideResponse);
    expect(feature).toMatchObject({
      category: 'PROTEOMICS',
      type: 'unique',
      start: '206',
      end: '217',
    });
  });

  it('marks a non-unique peptide as such', () => {
    const [feature] = proteomicsAdapter({
      features: [{ ...ptmPeptideResponse.features[0], unique: false }],
    });
    expect(feature.type).toBe('non_unique');
  });

  // The regression this adapter exists for: the built-in overwrites `type`
  // before any tooltip is built, so the header and the PTM sections are lost.
  it('builds the tooltip from the raw type, not the flattened one', () => {
    const [feature] = proteomicsAdapter(ptmPeptideResponse);

    expect(text(feature.tooltipContent)).toContain('PROTEOMICS_PTM 206-217');
    expect(feature.tooltipContent).not.toContain('unique 206-217');
  });

  it('lists each PTM at its position in the protein', () => {
    const [feature] = proteomicsAdapter(ptmPeptideResponse);

    // begin 206 + position 10 - 1 = 215; peptide[9] === 'S'
    expect(text(feature.tooltipContent)).toContain('215 Phosphoserine');
  });

  it('renders the peptidoform with the modification inlined', () => {
    const [feature] = proteomicsAdapter(ptmPeptideResponse);

    expect(text(feature.tooltipContent)).toContain(
      'AAESDVNVSS[Phosphorylation]PR'
    );
    // The plain "Peptide" row is for non-PTM peptides only
    expect(feature.tooltipContent).not.toContain('<h5>Peptide</h5>');
  });

  it('links PTM evidence to ProteomeXchange and PeptideAtlas', () => {
    const [feature] = proteomicsAdapter(ptmPeptideResponse);

    expect(text(feature.tooltipContent)).toContain(
      'PXD004939 (ProteomeXchange PeptideAtlas)'
    );
    expect(feature.tooltipContent).toContain('https://peptideatlas.org/x');
  });

  it('falls back to the taxon PeptideAtlas build when the dataset has no URL', () => {
    const [feature] = proteomicsAdapter({
      taxid: 9606,
      features: [
        {
          ...ptmPeptideResponse.features[0],
          ptms: [
            {
              ...ptmPeptideResponse.features[0].ptms[0],
              dbReferences: [{ id: 'PXD000001', properties: {} }],
            },
          ],
        },
      ],
    });

    // 9606_phosphorylation -> build 606
    expect(feature.tooltipContent).toContain('atlas_build_id=606');
  });

  it('keeps the unique flag and cross-references', () => {
    const [feature] = proteomicsAdapter(ptmPeptideResponse);
    const rendered = text(feature.tooltipContent);

    expect(rendered).toContain('Unique');
    expect(rendered).toContain('Yes');
    expect(rendered).toContain('Proteomes');
    expect(feature.tooltipContent).toContain('UP000059680');
  });

  // A plain (non-PTM) proteomics peptide keeps the simpler layout
  it('shows the plain peptide row and ECO evidence for a non-PTM peptide', () => {
    const [feature] = proteomicsAdapter({
      taxid: 9606,
      features: [
        {
          type: 'PROTEOMICS',
          begin: '10',
          end: '21',
          peptide: 'AAESDVNVSSPR',
          unique: true,
          evidences: [{ code: 'ECO:0007829' }],
        },
      ],
    });

    expect(feature.tooltipContent).toContain('<h5>Peptide</h5>');
    expect(feature.tooltipContent).not.toContain('Peptidoform');
    expect(text(feature.tooltipContent)).toContain('PROTEOMICS 10-21');
  });
});
