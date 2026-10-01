import { screen } from '@testing-library/react';
import { type ProtvistaTrackOrigin } from 'protvista-uniprot';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../../shared/hooks/useDataApi';
import FeatureViewer from '../FeatureViewer';

jest.mock('../../../../../shared/hooks/useDataApi');

// Defined up front so the viewer renders straight away rather than waiting on
// the lazy import of the (mocked) element
customElements.define('protvista-uniprot', class extends HTMLElement {});

const renderFeatureViewer = (sequence = 'M'.repeat(200)) =>
  customRender(
    <FeatureViewer
      accession="P05067"
      importedVariants={0}
      sequence={sequence}
    />,
    { route: '/uniprotkb/P05067/feature-viewer' }
  );

const signalTrack: ProtvistaTrackOrigin = {
  rowId: 'MOLECULE_PROCESSING',
  trackId: 'signal',
  kind: 'features',
  sourceTrackId: 'signal',
  sourceKind: 'features',
};

// Mimics a click on a Nightingale track: the event bubbles up through the
// light DOM to <protvista-uniprot>, which has already filled in `track`.
const clickFeature = (detail: Record<string, unknown>) => {
  const track = document.createElement('nightingale-track-canvas');
  document.querySelector('protvista-uniprot')?.append(track);
  track.dispatchEvent(
    new CustomEvent('change', {
      detail: { eventType: 'click', coords: [10, 20], ...detail },
      bubbles: true,
      cancelable: true,
    })
  );
};

const tooltipHTML = () =>
  document.querySelector('[role="tooltip"]')?.innerHTML ?? '';

describe('FeatureViewer tooltips', () => {
  beforeEach(() => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, status: 200 });
  });

  afterEach(() => {
    for (const tooltip of document.querySelectorAll('[role="tooltip"]')) {
      tooltip.remove();
    }
  });

  it('opts out of the built-in popover so it does not double up with ours', () => {
    renderFeatureViewer();
    const viewer = document.querySelector('protvista-uniprot');
    expect(viewer?.hasAttribute('notooltip')).toBe(true);
    // Loads straight away: no adapters to register first
    expect(viewer?.hasAttribute('suspend')).toBe(false);
  });

  it('shows a tooltip when a feature is clicked', () => {
    renderFeatureViewer();

    clickFeature({
      track: signalTrack,
      feature: {
        type: 'SIGNAL',
        start: 1,
        end: 24,
        description: 'Signal peptide',
      },
    });

    expect(tooltipHTML()).toContain('SIGNAL 1-24');
    expect(tooltipHTML()).toContain('Signal peptide');
  });

  it('does not show a tooltip on hover', () => {
    renderFeatureViewer();

    clickFeature({
      eventType: 'mouseover',
      track: signalTrack,
      feature: { type: 'SIGNAL', start: 1, end: 24 },
    });

    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  // The modified residue isn't in the payload, so it comes from the sequence
  it('builds the PTM tooltip from the passed-through data and the sequence', () => {
    renderFeatureViewer(`${'A'.repeat(101)}T${'A'.repeat(20)}`);

    clickFeature({
      track: {
        rowId: 'PTM',
        trackId: 'mod_res_ls',
        kind: 'peptides-ptm',
        sourceTrackId: 'mod_res_ls',
        sourceKind: 'peptides-ptm',
      },
      feature: {
        type: 'MOD_RES_LS',
        start: 102,
        end: 102,
        confidenceScore: 'Gold',
        ptms: [
          {
            name: 'Phosphorylation',
            position: 3,
            sources: ['PRIDE'],
            dbReferences: [
              { id: 'PXD008952', properties: { 'Confidence score': 'Gold' } },
            ],
          },
        ],
      },
    });

    const rendered = tooltipHTML();
    expect(rendered).toContain('MOD_RES_LS 102-102');
    expect(rendered).toContain('Phosphothreonine');
    expect(rendered).toContain('PXD008952');
  });

  // A collapsed group reports only its row; the feature names its own track
  it('uses the source kind of a feature in a collapsed group', () => {
    renderFeatureViewer();

    clickFeature({
      track: {
        rowId: 'DOMAINS',
        trackId: null,
        kind: null,
        sourceTrackId: 'domain',
        sourceKind: 'features',
      },
      feature: {
        type: 'DOMAIN',
        start: 23,
        end: 127,
        description: 'Myb/SANT-like DNA-binding',
        // what the library's own resolver would have produced
        tooltipContent: '<h5>Type</h5><p>DOMAIN</p>',
      },
    });

    const rendered = tooltipHTML();
    expect(rendered).toContain('DOMAIN 23-127');
    expect(rendered).toContain('Myb/SANT-like DNA-binding');
    // not the library's flat Type/Start/End layout
    expect(rendered).not.toContain('<h5>Type</h5>');
  });

  it('picks the InterPro builder for an InterPro feature in the same group', () => {
    renderFeatureViewer();

    clickFeature({
      track: {
        rowId: 'DOMAINS',
        trackId: null,
        kind: null,
        sourceTrackId: 'interpro',
        sourceKind: 'interpro-features',
      },
      feature: {
        type: 'InterPro Representative Domain',
        start: 10,
        end: 99,
        accession: 'PF13837',
        name: 'Myb_DNA-bind_4',
        // eslint-disable-next-line camelcase -- InterPro API field name
        source_database: 'pfam',
        integrated: null,
      },
    });

    const rendered = tooltipHTML();
    expect(rendered).toContain('InterPro Representative Domain 10-99');
    expect(rendered).toContain('PF13837');
  });

  it('falls back to the library tooltipContent for an unmapped kind', () => {
    renderFeatureViewer();

    clickFeature({
      track: {
        rowId: 'ALPHAFOLD',
        trackId: 'confidence',
        kind: 'alphafold-confidence',
        sourceTrackId: 'confidence',
        sourceKind: 'alphafold-confidence',
      },
      feature: { tooltipContent: '<h5>pLDDT</h5><p>98.2</p>' },
    });

    expect(tooltipHTML()).toContain('pLDDT');
  });

  it('falls back to the library tooltipContent when the track is unknown', () => {
    renderFeatureViewer();

    clickFeature({
      feature: { tooltipContent: '<h5>Something</h5>' },
    });

    expect(tooltipHTML()).toContain('Something');
  });

  // The real sequence: the viewer sits behind a loading gate, so it is absent
  // from the DOM on the first render and only appears on a later one.
  it('still shows a tooltip when the viewer appears after loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    const { rerender } = renderFeatureViewer();
    expect(document.querySelector('protvista-uniprot')).toBeNull();

    (useDataApi as jest.Mock).mockReturnValue({ loading: false, status: 200 });
    rerender(
      <FeatureViewer
        accession="P05067"
        importedVariants={0}
        sequence={'M'.repeat(200)}
      />
    );
    expect(document.querySelector('protvista-uniprot')).not.toBeNull();

    clickFeature({
      track: signalTrack,
      feature: { type: 'SIGNAL', start: 1, end: 24, description: 'Sig' },
    });

    expect(tooltipHTML()).toContain('SIGNAL 1-24');
  });

  it('does not render the viewer when there is no feature data', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, status: 404 });
    renderFeatureViewer();

    expect(document.querySelector('protvista-uniprot')).toBeNull();
    expect(
      screen.getByText(/No feature information available/)
    ).toBeInTheDocument();
  });
});
