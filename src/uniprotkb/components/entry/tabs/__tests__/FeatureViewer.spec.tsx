import { screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../../shared/hooks/useDataApi';
import FeatureViewer from '../FeatureViewer';

jest.mock('../../../../../shared/hooks/useDataApi');

// Records the order of the calls the viewer makes on the element
let lifecycle: string[] = [];

// The real element is mocked away in tests, so stand in for the parts of its
// API the viewer drives: adapter registration, the `suspend` release, and the
// authored config that maps a track to its semantic `kind`.
/* eslint-disable class-methods-use-this -- a DOM stub, no instance state */
class ProtvistaUniprotStub extends HTMLElement {
  static observedAttributes = ['suspend'];

  registerAdapter(name: string) {
    lifecycle.push(`register:${name}`);
  }

  getConfig() {
    return {
      rows: [
        {
          id: 'MOLECULE_PROCESSING',
          tracks: [{ id: 'signal', kind: 'features' }],
        },
        { id: 'PTM', tracks: [{ id: 'mod_res_ls', kind: 'peptides-ptm' }] },
        {
          id: 'DOMAINS',
          tracks: [
            { id: 'domain', kind: 'features' },
            { id: 'region', kind: 'features' },
            { id: 'InterPro representative domain', kind: 'features-interpro' },
          ],
        },
        {
          id: 'VARIATION',
          tracks: [
            { id: 'variation_graph', kind: 'variant-counts' },
            { id: 'variation', kind: 'variants' },
          ],
        },
        { id: 'ALPHAFOLD', tracks: [{ id: 'confidence' }] },
      ],
    };
  }

  connectedCallback() {
    lifecycle.push(
      this.hasAttribute('suspend') ? 'connected:suspended' : 'connected:LOADING'
    );
  }

  attributeChangedCallback(
    name: string,
    _: string | null,
    value: string | null
  ) {
    if (name === 'suspend' && value === null) {
      lifecycle.push('release:suspend');
    }
  }
}
/* eslint-enable class-methods-use-this */
customElements.define('protvista-uniprot', ProtvistaUniprotStub);

const renderFeatureViewer = () =>
  customRender(
    <FeatureViewer
      accession="P05067"
      importedVariants={0}
      sequence={'M'.repeat(100)}
    />,
    { route: '/uniprotkb/P05067/feature-viewer' }
  );

// Mimics what a Nightingale track dispatches on click: the event bubbles up
// through the light DOM to <protvista-uniprot>.
const clickFeature = (
  detail: Record<string, unknown>,
  trackId = 'pv-abc123-track-MOLECULE_PROCESSING-signal'
) => {
  const track = document.createElement('nightingale-track-canvas');
  track.id = trackId;
  const viewer = document.querySelector('protvista-uniprot');
  viewer?.append(track);
  track.dispatchEvent(
    new CustomEvent('change', { detail, bubbles: true, cancelable: true })
  );
};

const tooltipHTML = () =>
  document.querySelector('[role="tooltip"]')?.innerHTML ?? '';

describe('FeatureViewer tooltips', () => {
  beforeEach(() => {
    lifecycle = [];
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, status: 200 });
  });

  afterEach(() => {
    for (const tooltip of document.querySelectorAll('[role="tooltip"]')) {
      tooltip.remove();
    }
  });

  it('opts out of the built-in popover so it does not double up with ours', () => {
    renderFeatureViewer();
    expect(
      document.querySelector('protvista-uniprot')?.hasAttribute('notooltip')
    ).toBe(true);
  });

  // The rich PTM tooltip can only be built while the raw payload is in scope,
  // so our adapter has to be registered before the viewer loads anything.
  it('registers the custom PTM adapter before releasing the viewer', () => {
    renderFeatureViewer();

    // The element must be suspended at connect time and only released once
    // every adapter is in its registry — otherwise it loads with the built-ins.
    expect(lifecycle[0]).toBe('connected:suspended');
    expect(lifecycle.at(-1)).toBe('release:suspend');
    expect(lifecycle.slice(1, -1).sort()).toEqual([
      'register:uniprot-proteomics-json',
      'register:uniprot-proteomics-ptm-json',
    ]);
  });

  it('shows a tooltip when a feature is clicked', () => {
    renderFeatureViewer();

    clickFeature({
      eventType: 'click',
      coords: [10, 20],
      feature: {
        type: 'SIGNAL',
        start: 1,
        end: 24,
        description: 'Signal peptide',
      },
    });

    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
    expect(tooltipHTML()).toContain('SIGNAL 1-24');
    expect(tooltipHTML()).toContain('Signal peptide');
  });

  // peptides-ptm has no site-side builder: its rich content is pre-computed by
  // our adapter and arrives as tooltipContent on the feature.
  it('uses the pre-computed tooltipContent for the PTM track', () => {
    renderFeatureViewer();

    clickFeature(
      {
        eventType: 'click',
        coords: [10, 20],
        feature: {
          type: 'MOD_RES_LS',
          start: 102,
          end: 102,
          tooltipContent: '<h4>MOD_RES_LS 102-102</h4><p>Phosphothreonine</p>',
        },
      },
      'pv-abc123-track-PTM-mod_res_ls'
    );

    expect(tooltipHTML()).toContain('Phosphothreonine');
  });

  // A collapsed group draws a single aggregate whose element id carries only
  // the row id, with no track segment.
  it('shows the rich tooltip for a collapsed group', () => {
    renderFeatureViewer();

    clickFeature(
      {
        eventType: 'click',
        coords: [10, 20],
        feature: {
          type: 'DOMAIN',
          start: 23,
          end: 127,
          description: 'Myb/SANT-like DNA-binding',
        },
        // what the library's own resolver would have produced
        tooltipContent: '<h5>Type</h5><p>DOMAIN</p>',
      },
      'pv-abc123-track-DOMAINS'
    );

    const rendered = tooltipHTML();
    expect(rendered).toContain('DOMAIN 23-127');
    expect(rendered).toContain('Myb/SANT-like DNA-binding');
    // not the library's flat Type/Start/End layout
    expect(rendered).not.toContain('<h5>Type</h5>');
  });

  // The same collapsed aggregate also carries InterPro features, which need a
  // different builder from their neighbours in the group.
  it('picks the InterPro builder for an InterPro feature in the same group', () => {
    renderFeatureViewer();

    clickFeature(
      {
        eventType: 'click',
        coords: [10, 20],
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
      },
      'pv-abc123-track-DOMAINS'
    );

    const rendered = tooltipHTML();
    expect(rendered).toContain('InterPro Representative Domain 10-99');
    expect(rendered).toContain('PF13837');
  });

  it('falls back when no builder in a collapsed group claims the feature', () => {
    renderFeatureViewer();

    clickFeature(
      {
        eventType: 'click',
        coords: [10, 20],
        // a counts datapoint from the linegraph half of the group
        feature: {
          position: 5,
          value: 12,
          tooltipContent: '<h5>Variants</h5><p>12</p>',
        },
      },
      'pv-abc123-track-VARIATION'
    );

    expect(tooltipHTML()).toContain('Variants');
  });

  it('falls back to the library tooltipContent for an unmapped track', () => {
    renderFeatureViewer();

    clickFeature(
      {
        // linegraph tracks spell it lowercase
        eventtype: 'click',
        coords: [10, 20],
        feature: { tooltipContent: '<h5>pLDDT</h5><p>98.2</p>' },
      },
      'pv-abc123-track-ALPHAFOLD-confidence'
    );

    expect(tooltipHTML()).toContain('pLDDT');
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
        sequence={'M'.repeat(100)}
      />
    );
    expect(document.querySelector('protvista-uniprot')).not.toBeNull();

    clickFeature({
      eventType: 'click',
      coords: [10, 20],
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
