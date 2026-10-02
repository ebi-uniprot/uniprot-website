import { peptidePtmTooltip, peptideTooltip } from '../peptideTooltip';
import { type PTM } from '../ptmTooltip';

jest.mock('../../../../shared/utils/logging');

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

// A Proteins API `/proteomics/ptm/` feature for a PTM-containing peptide
const apiPtmPeptide = {
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
};

type ApiPeptide = Omit<typeof apiPtmPeptide, 'ptms' | 'xrefs'> & {
  ptms?: typeof apiPtmPeptide.ptms;
  xrefs?: typeof apiPtmPeptide.xrefs;
  evidences?: { code: string }[];
};

// What protvista-uniprot's `uniprot-proteomics-json` adapter hands over: the
// API feature passed through, `type` overwritten for the track filters and
// the original kept as `sourceType`, plus the response-level `taxid`.
const adapted = (feature: ApiPeptide, taxid?: number) => ({
  ...feature,
  residuesToHighlight: feature.ptms,
  sourceType: feature.type,
  taxid,
  category: 'PROTEOMICS',
  type: feature.unique ? 'unique' : 'non_unique',
  start: feature.begin,
});

describe('peptideTooltip', () => {
  it('builds the header from the API type, not the filter type', () => {
    const html = peptideTooltip(adapted(apiPtmPeptide, 9606));

    expect(text(html)).toContain('PROTEOMICS_PTM 206-217');
    expect(html).not.toContain('unique 206-217');
  });

  it('lists each PTM at its position in the protein', () => {
    // begin 206 + position 10 - 1 = 215; peptide[9] === 'S'
    expect(text(peptideTooltip(adapted(apiPtmPeptide, 9606)))).toContain(
      '215 Phosphoserine'
    );
  });

  it('renders the peptidoform with the modification inlined', () => {
    const html = peptideTooltip(adapted(apiPtmPeptide, 9606));

    expect(text(html)).toContain('AAESDVNVSS[Phosphorylation]PR');
    // The plain "Peptide" row is for non-PTM peptides only
    expect(html).not.toContain('<h5>Peptide</h5>');
  });

  it('links PTM evidence to ProteomeXchange and PeptideAtlas', () => {
    const html = peptideTooltip(adapted(apiPtmPeptide, 9606));

    expect(text(html)).toContain('PXD004939 (ProteomeXchange PeptideAtlas)');
    expect(html).toContain('https://peptideatlas.org/x');
  });

  it('falls back to the taxon PeptideAtlas build when the dataset has no URL', () => {
    const html = peptideTooltip(
      adapted(
        {
          ...apiPtmPeptide,
          ptms: [
            {
              ...apiPtmPeptide.ptms[0],
              dbReferences: [
                { id: 'PXD000001', properties: { 'PeptideAtlas URL': '' } },
              ],
            },
          ],
        },
        9606
      )
    );

    // 9606_phosphorylation -> build 606
    expect(html).toContain('atlas_build_id=606');
  });

  it('keeps the unique flag and cross-references', () => {
    const html = peptideTooltip(adapted(apiPtmPeptide, 9606));
    const rendered = text(html);

    expect(rendered).toContain('Unique');
    expect(rendered).toContain('Yes');
    expect(rendered).toContain('Proteomes');
    expect(html).toContain('UP000059680');
  });

  it('shows the plain peptide row and ECO evidence for a non-PTM peptide', () => {
    const html = peptideTooltip(
      adapted(
        {
          type: 'PROTEOMICS',
          begin: '10',
          end: '21',
          peptide: 'AAESDVNVSSPR',
          unique: true,
          evidences: [{ code: 'ECO:0007829' }],
        },
        9606
      )
    );

    expect(html).toContain('<h5>Peptide</h5>');
    expect(html).not.toContain('Peptidoform');
    expect(text(html)).toContain('PROTEOMICS 10-21');
  });
});

const ptm = (
  name: string,
  position: number,
  id: string,
  confidenceScore?: string
): PTM => ({
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

// What protvista-uniprot's `uniprot-proteomics-ptm-json` adapter hands over
const marker = (
  start: number,
  ptms: PTM[],
  confidenceScore: string | null
) => ({
  source: 'PTMeXchange',
  type: 'MOD_RES_LS',
  start,
  end: start,
  shape: 'triangle',
  color: 'black',
  ptms,
  confidenceScore,
});

// Residue 102 is 'T'
const sequence = `${'A'.repeat(101)}T${'A'.repeat(20)}`;

describe('peptidePtmTooltip', () => {
  it('reads the modified residue from the sequence', () => {
    const html = peptidePtmTooltip(
      marker(102, [ptm('Phosphorylation', 3, 'PXD008952', 'Gold')], 'Gold'),
      { sequence }
    );

    expect(html).toContain('MOD_RES_LS 102-102');
    expect(html).toContain('Phosphothreonine');
  });

  it('names a different residue at a different position', () => {
    const html = peptidePtmTooltip(
      marker(1, [ptm('Phosphorylation', 1, 'PXD008952', 'Gold')], 'Gold'),
      { sequence: 'SK' }
    );

    expect(html).toContain('Phosphoserine');
  });

  it('shows the confidence score', () => {
    const html = peptidePtmTooltip(
      marker(102, [ptm('Phosphorylation', 3, 'PXD008952', 'Gold')], 'Gold'),
      { sequence }
    );

    expect(html).toContain('Confidence Score');
    expect(html).toContain('Gold');
  });

  it('leaves out the confidence score when it is missing or mixed', () => {
    const html = peptidePtmTooltip(
      marker(102, [ptm('Phosphorylation', 3, 'PXD008952')], null),
      { sequence }
    );

    expect(html).not.toContain('Confidence Score');
  });

  it('lists every dataset grouped into the marker', () => {
    const html = peptidePtmTooltip(
      marker(
        102,
        [
          ptm('Phosphorylation', 3, 'PXD000001', 'Gold'),
          ptm('Phosphorylation', 3, 'PXD000002', 'Gold'),
        ],
        'Gold'
      ),
      { sequence }
    );

    expect(html).toContain('PXD000001');
    expect(html).toContain('PXD000002');
  });

  it('maps the Glue project dataset to its PXD id and publication', () => {
    const html = peptidePtmTooltip(
      marker(102, [ptm('Phosphorylation', 3, 'Glue project', 'Gold')], 'Gold'),
      { sequence }
    );

    expect(html).toContain('PXD012174');
    expect(html).not.toContain('Glue project');
    expect(html).toContain('31819260');
  });
});
