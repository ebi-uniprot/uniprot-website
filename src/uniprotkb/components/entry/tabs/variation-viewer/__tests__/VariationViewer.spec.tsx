import { act, screen } from '@testing-library/react';

import customRender from '../../../../../../shared/__test-helpers__/customRender';
import { VIRTUALIZE_ROW_THRESHOLD } from '../../../../../../shared/components/table/TableFromData';
import useDataApi from '../../../../../../shared/hooks/useDataApi';
import VariationViewer from '../VariationViewer';
import P0DPR0 from './__mocks__/P0DPR0';

jest.mock('../../../../../../shared/hooks/useDataApi');
// Mock this because this is only the visual bit and jest has issues with ES
jest.mock('../../../../protein-data-views/VisualVariationView', () => ({
  __esModule: true,
  default: () => '{{ VisualVariationView }}',
}));

describe('VariationViewer component', () => {
  // jsdom doesn't implement scrollIntoView; the table-scroll path calls it.
  const originalScrollIntoView = Element.prototype.scrollIntoView;

  beforeEach(() => {
    let counter = 0;
    const step = 0.01;
    jest.spyOn(global.Math, 'random').mockImplementation(() => {
      counter += 1;
      return counter * step;
    });
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    Element.prototype.scrollIntoView = originalScrollIntoView;
  });

  it('renders on loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    const { asFragment } = customRender(
      <VariationViewer importedVariants={0} primaryAccession="P0DPR0" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on error', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('some error'),
      status: 500,
    });
    const { asFragment } = customRender(
      <VariationViewer importedVariants={0} primaryAccession="P0DPR0" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on no data', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      status: 404,
    });
    const { asFragment } = customRender(
      <VariationViewer importedVariants={0} primaryAccession="P0DPR0" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on data', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: P0DPR0,
      status: 200,
    });
    const { asFragment } = customRender(
      <VariationViewer
        importedVariants={P0DPR0.features.length}
        primaryAccession="P0DPR0"
      />
    );
    expect(asFragment()).toMatchSnapshot();

    // Add 1 for thead row
    expect(screen.getAllByRole('row')).toHaveLength(P0DPR0.features.length + 1);
    // TODO: see if this can be changed after the big Nightingale upgrade
    // At the moment it's taking the variants from this mock:
    // __mocks__/protvista-variation-adapter.js
    // See if this mock can be removed altogether
    // expect(screen.getAllByRole('row')).toHaveLength(5);
    // expect(screen.getAllByRole('row')).toHaveLength(P0DPR0.features.length);
  });

  it('highlights the matching table row when the canvas reports a click', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: P0DPR0,
      status: 200,
    });
    const { container } = customRender(
      <VariationViewer
        importedVariants={P0DPR0.features.length}
        primaryAccession="P0DPR0"
      />
    );

    const manager = container.querySelector('nightingale-manager');
    if (!manager) {
      throw new Error('nightingale-manager not rendered');
    }

    // Mimic a canvas click on a variant that is actually rendered as a row.
    const targetRow = container.querySelector('tbody tr[data-id]');
    const accession = targetRow?.getAttribute('data-id');
    expect(accession).toBeTruthy();
    expect(targetRow?.className).not.toContain('mark-background');

    act(() => {
      manager.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            eventType: 'click',
            feature: { accession, begin: '22', end: '22' },
          },
        })
      );
    });

    const highlighted = container.querySelector(
      `tbody tr[data-id="${accession}"]`
    );
    expect(highlighted?.className).toContain('mark-background');
  });

  it('commits the navigation range on pointer-up, marking in-range rows', () => {
    // Navigation commits via two complementary signals: a 150ms debounce and
    // pointer-up. The debounce path can't be exercised here because the global
    // useId mock returns a fresh id every render, so the table-scroll callback
    // (and the change listener that schedules the debounce) is re-created each
    // render and the timer is cleared before it fires. In production useId is
    // stable, so both paths work; the pointer-up path is deterministic in
    // tests, so we assert on that.
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: P0DPR0,
      status: 200,
    });
    const { container } = customRender(
      <VariationViewer
        importedVariants={P0DPR0.features.length}
        primaryAccession="P0DPR0"
      />
    );

    const manager = container.querySelector('nightingale-manager');
    if (!manager) {
      throw new Error('nightingale-manager not rendered');
    }

    // A navigation (display-range) event marks navigation in progress but does
    // not commit the range, so no rows are border-marked yet.
    act(() => {
      manager.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            'display-start': 1,
            'display-end': P0DPR0.sequence.length,
          },
        })
      );
    });
    expect(container.querySelector('[class*="mark-border"]')).toBeNull();

    // Pointer-up ends the interaction and commits the range.
    act(() => {
      window.dispatchEvent(new Event('pointerup'));
    });
    expect(container.querySelector('[class*="mark-border"]')).not.toBeNull();
  });

  it('shows a find-in-page hint on Ctrl+F only when the table is virtualized', () => {
    // Build a dataset large enough to cross the virtualization threshold.
    const AMINO_ACIDS = 'ACDEFGHIKLMNPQRSTVWY';
    const featureTemplate = P0DPR0.features[0];
    const manyFeatures = Array.from(
      { length: VIRTUALIZE_ROW_THRESHOLD + 500 },
      (_, i) => {
        const pos = Math.floor(i / AMINO_ACIDS.length) + 1;
        const alt = AMINO_ACIDS[i % AMINO_ACIDS.length];
        return {
          ...featureTemplate,
          begin: String(pos),
          end: String(pos),
          alternativeSequence: alt,
          mutatedType: alt,
        };
      }
    );
    const bigData = { ...P0DPR0, features: manyFeatures };

    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: bigData,
      status: 200,
    });
    const messagesDispatch = jest.fn();
    const { container } = customRender(
      <VariationViewer
        importedVariants={manyFeatures.length}
        primaryAccession="P0DPR0"
      />,
      { messagesDispatch }
    );

    // Confirm virtualization actually engaged for this dataset.
    expect(
      container.querySelector('[class*="virtualize-container"]')
    ).not.toBeNull();

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'f', ctrlKey: true })
      );
    });

    expect(messagesDispatch).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(messagesDispatch.mock.calls)).toContain(
      'Use the column filters instead'
    );
  });
});
