import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import VariationView from '../VariationView';

import useDataApi from '../../../../shared/hooks/useDataApi';

jest.mock('../../../../shared/hooks/useDataApi');
// Mock this because this is only the visual bit and jest has issues with ES
jest.mock('../VisualVariationView', () => ({
  __esModule: true,
  default: () => null,
}));

describe('VariationView component', () => {
  it('renders on loading', async () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    await act(async () => {
      const { asFragment } = render(
        <VariationView primaryAccession="P05067" />
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
        <VariationView primaryAccession="P05067" />
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
        <VariationView primaryAccession="P05067" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('renders on data', async () => {
    // protvista-variation-adapter is already mocked
    // but we still need the call
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: { features: [{}] },
    });
    await act(async () => {
      const { asFragment } = render(
        <VariationView primaryAccession="P05067" title="some title" onlyTable />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
