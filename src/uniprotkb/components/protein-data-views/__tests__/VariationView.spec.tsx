import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useDataApi from '../../../../shared/hooks/useDataApi';
import VariationView from '../VariationView';

jest.mock('../../../../shared/hooks/useDataApi');

afterEach(cleanup);

describe('VariationView component', () => {
  test('renders on loading', async () => {
    useDataApi.mockReturnValue({ loading: true });
    await act(async () => {
      const { asFragment } = render(
        <VariationView primaryAccession="P05067" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('renders on error', async () => {
    useDataApi.mockReturnValue({
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

  test('renders on no data', async () => {
    useDataApi.mockReturnValue({
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

  test('renders on data', async () => {
    // protvista-variation-adapter is already mocked
    // but we still need the call
    useDataApi.mockReturnValue({
      loading: false,
      data: { features: [{}] },
    });
    await act(async () => {
      const { asFragment } = render(
        <VariationView primaryAccession="P05067" title="some title" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
