import { fireEvent } from '@testing-library/react';

import EntryPublicationsFacets from '../EntryPublicationsFacets';

import useDataApi from '../../../../shared/hooks/useDataApi';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import data from './__mocks__/entryPublicationsData.json';

jest.mock('../../../../shared/hooks/useDataApi');

describe('EntryPublication facets tests', () => {
  it('should render', () => {
    useDataApi.mockReturnValue({ loading: false, data });
    const { asFragment } = renderWithRouter(
      <EntryPublicationsFacets accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle errors', () => {
    useDataApi.mockReturnValue({ loading: false, error: {} });
    const { asFragment } = renderWithRouter(
      <EntryPublicationsFacets accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle loading', () => {
    useDataApi.mockReturnValue({ loading: true });
    const { asFragment } = renderWithRouter(
      <EntryPublicationsFacets accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add facet', () => {
    useDataApi.mockReturnValue({ loading: false, data });
    const { getByText, history } = renderWithRouter(
      <EntryPublicationsFacets accession="P05067" />
    );
    fireEvent.click(getByText(/Small/));
    const {
      location: { search },
    } = history;
    expect(search).toMatch(/facets=study_type%3Asmall_scale/);
  });

  it('should remove facet', () => {
    useDataApi.mockReturnValue({ loading: false, data });
    const { getByText, history } = renderWithRouter(
      <EntryPublicationsFacets accession="P05067" />,
      {
        route: '?facets=study_type:small_scale',
      }
    );
    fireEvent.click(getByText(/Small/));
    const {
      location: { search },
    } = history;
    expect(search).toMatch('');
  });
});
