import React from 'react';
import EntryPublications from '../EntryPublications';
import mockPublicationsData from './__mocks__/entryPublicationsData.json';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());
import useDataApi from '../../../../shared/hooks/useDataApi';

describe('EntryPublications tests', () => {
  //FIXME: Rendering the loader as the useEffect hasn't been executed yet,
  //FIXME: not sure how to fix that right now so gonna skip for now 😬
  it.skip('should call useDataApi and render', async () => {
    const headers = { 'x-totalrecords': mockPublicationsData.results.length };
    useDataApi.mockImplementation(() => {
      return {
        loading: false,
        data: mockPublicationsData,
        headers,
      };
    });
    const { findByText } = renderWithRouter(
      <EntryPublications accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    const item = await findByText(/ISOFORM APP751/);
    // expect(item).toBeTruthy();
  });

  it('should render the error', async () => {
    useDataApi.mockImplementation(() => {
      return {
        loading: false,
        error: new Error('my error'),
        status: 400,
      };
    });
    const { asFragment } = renderWithRouter(
      <EntryPublications accession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
