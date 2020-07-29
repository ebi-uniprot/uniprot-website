import React from 'react';
import { fireEvent } from '@testing-library/react';
import EntryPublicationsFacets from '../EntryPublicationsFacets';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

jest.mock('../../../../shared/hooks/useDataApi', () => ({
  __esModule: true, // this makes it work
  default: jest.fn(() => ({
    loading: false,
    data: require('./__mocks__/entryPublicationsData.json'),
  })),
}));
import useDataApi from '../../../../shared/hooks/useDataApi';

describe('EntryPublication facets tests', () => {
  it('should render', () => {
    const { asFragment } = renderWithRouter(
      <EntryPublicationsFacets accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add facet', () => {
    const { getByText, history } = renderWithRouter(
      <EntryPublicationsFacets accession="P05067" />
    );
    fireEvent.click(getByText(/Small/));
    const {
      location: { search },
    } = history;
    expect(search).toMatch('?facets=study_type%3Asmall_scale');
  });

  it('should remove facet', () => {
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
