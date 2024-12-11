import { screen } from '@testing-library/react';

import customRender from '../../../../../../shared/__test-helpers__/customRender';

import VariationViewer from '../VariationViewer';

import useDataApi from '../../../../../../shared/hooks/useDataApi';

import P0DPR0 from './__mocks__/P0DPR0';

jest.mock('../../../../../../shared/hooks/useDataApi');
// Mock this because this is only the visual bit and jest has issues with ES
jest.mock('../../../../protein-data-views/VisualVariationView', () => ({
  __esModule: true,
  default: () => '{{ VisualVariationView }}',
}));

describe('VariationViewer component', () => {
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

    // TODO: see if this can be changed after the big Nightingale upgrade
    // At the moment it's taking the variants from this mock:
    // __mocks__/protvista-variation-adapter.js
    // See if this mock can be removed altogether
    expect(screen.getAllByRole('row')).toHaveLength(5);
    // expect(screen.getAllByRole('row')).toHaveLength(P0DPR0.features.length);
  });
});
