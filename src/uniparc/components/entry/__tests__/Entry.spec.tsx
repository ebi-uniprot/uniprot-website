import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import Entry from '../Entry';
import { LocationToPath, Location } from '../../../../app/config/urls';
import data from '../../../__mocks__/entryModelData.json';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { findByText, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('../../../../shared/hooks/useDataApi');

describe('UniParc Entry tests', () => {
  it('should display the id and sequence', async () => {
    useDataApi.mockReturnValue({ loading: false, data });
    // `${LocationToPath[Location.UniParcEntry]}/:accession`,
    const { getByText, findByText } = renderWithRedux(<Entry />, {
      path: LocationToPath[Location.UniParcEntry],
      route: '/uniparc/UPI0000000001',
    });
    expect(getByText(/UPI0000000001/)).toBeTruthy();
    // toggle the sequence
    fireEvent.click(getByText(/Show sequence/));
    await act(async () => {
      const seq = await findByText(/28FE89850863372D/);
      expect(seq).toBeTruthy();
    });
  });

  it('should show the loader', async () => {
    useDataApi.mockReturnValue({ loading: true });
    // `${LocationToPath[Location.UniParcEntry]}/:accession`,
    const { container } = renderWithRedux(<Entry />, {
      path: LocationToPath[Location.UniParcEntry],
      route: '/uniparc/UPI0000000001',
    });
    expect(container.getElementsByClassName('loader')).toBeTruthy();
  });

  it('should handle errors', async () => {
    useDataApi.mockReturnValue({ error: 'Something bad happened' });
    // `${LocationToPath[Location.UniParcEntry]}/:accession`,
    const { getByText, findByText } = renderWithRedux(<Entry />, {
      path: LocationToPath[Location.UniParcEntry],
      route: '/uniparc/UPI0000000001',
    });
    expect(getByText(/currently unavailable/)).toBeTruthy();
  });
});
