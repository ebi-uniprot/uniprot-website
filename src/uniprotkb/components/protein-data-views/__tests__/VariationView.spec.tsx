import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import VariationView from '../VariationView';

import useDataApi from '../../../../shared/hooks/useDataApi';

jest.mock('../../../../shared/hooks/useDataApi');

describe('VariationView component', () => {
  test('renders on loading', async () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    await act(async () => {
      const { asFragment } = render(
        <VariationView primaryAccession="P05067" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('renders on error', async () => {
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

  test('renders on no data', async () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('some error'),
      status: 404,
    });
    await act(async () => {
      const { container } = render(<VariationView primaryAccession="P05067" />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  test('renders on data', async () => {
    // protvista-variation-adapter is already mocked
    // but we still need the call
    (useDataApi as jest.Mock).mockReturnValue({
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
