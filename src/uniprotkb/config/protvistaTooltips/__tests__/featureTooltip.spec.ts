import featureTooltip from '../featureTooltip';

jest.mock('../../../../shared/utils/logging');

const peptideWithProforma = (proforma: string) =>
  featureTooltip({
    type: 'PROTEOMICS_PTM',
    start: 10,
    end: 20,
    peptide: 'PEPTIDE',
    residuesToHighlight: [
      {
        name: 'Phosphorylation',
        position: 3,
        dbReferences: [
          {
            id: 'PXD008952',
            properties: { 'Confidence score': 'Gold', Proforma: proforma },
          },
        ],
      },
    ],
  });

describe('featureTooltip Proforma', () => {
  it('links a known modification to Unimod', () => {
    const html = peptideWithProforma('PE[Phospho]PTIDE');

    expect(html).toContain(
      'PE<span class="mod-link">[<a href="https://www.unimod.org/modifications_view.php?editid1=21" target="_blank">Phospho</a>]</span>PTIDE'
    );
  });

  it('links a modification whether or not its name arrives entity-encoded', () => {
    for (const proforma of [
      '[Gln->pyro-Glu]QTIDE',
      '[Gln-&gt;pyro-Glu]QTIDE',
    ]) {
      const html = peptideWithProforma(proforma);
      expect(html).toContain(
        'editid1=28" target="_blank">Gln-&gt;pyro-Glu</a>'
      );
      expect(html).not.toContain('&amp;gt;');
    }
  });

  it('escapes markup outside and inside the brackets', () => {
    const html = peptideWithProforma(
      'PE<b>P</b>[<img src=x onerror=alert(1)>]TIDE'
    );

    expect(html).not.toContain('<b>P</b>');
    expect(html).not.toContain('<img');
    expect(html).toContain('PE&lt;b&gt;P&lt;/b&gt;');
    expect(html).toContain('[&lt;img src=x onerror=alert(1)&gt;]TIDE');
  });
});
