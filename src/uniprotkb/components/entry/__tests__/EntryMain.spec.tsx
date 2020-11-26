import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import EntryMain from '../EntryMain';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';
import mockData from '../../../__mocks__/entryModelData.json';
import interactionData from '../../../__mocks__/interaction.json';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import nonHumanEntryData from '../../../__mocks__/nonHumanEntryModelData.json';

describe('Entry view', () => {
  it('should render', async () => {
    fetch.mockResponse(JSON.stringify(interactionData));
    await act(async () => {
      const { asFragment } = renderWithRedux(
        <Router>
          <EntryMain transformedData={uniProtKbConverter(mockData)} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render for non-human entry', async () => {
    fetch.mockResponse(JSON.stringify(interactionData));
    await act(async () => {
      const { asFragment } = renderWithRedux(
        <Router>
          <EntryMain transformedData={uniProtKbConverter(nonHumanEntryData)} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
