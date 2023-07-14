import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import VariationViewer from '../VariationViewer';

import useDataApi from '../../../../../../shared/hooks/useDataApi';
import customRender from '../../../../../../shared/__test-helpers__/customRender';

jest.mock('../../../../../../shared/hooks/useDataApi');
// Mock this because this is only the visual bit and jest has issues with ES
jest.mock('../../../../protein-data-views/VisualVariationView', () => ({
  __esModule: true,
  default: () => null,
}));

describe('VariationViewer component', () => {
  it('renders on loading', async () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    await act(async () => {
      const { asFragment } = render(
        <VariationViewer primaryAccession="P05067" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('renders on error', async () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('some error'),
      status: 500,
    });
    await act(async () => {
      const { asFragment } = render(
        <VariationViewer primaryAccession="P05067" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('renders on no data', async () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('some error'),
      status: 404,
    });
    await act(async () => {
      const { asFragment } = render(
        <VariationViewer primaryAccession="P05067" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
