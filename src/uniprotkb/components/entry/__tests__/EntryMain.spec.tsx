import { enableFetchMocks } from 'jest-fetch-mock';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import EntryMain from '../EntryMain';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import mockData from '../../../__mocks__/uniProtKBEntryModelData';
import interactionData from '../../../__mocks__/interaction.json';
import nonHumanEntryData from '../../../__mocks__/nonHumanEntryModelData.json';

enableFetchMocks();

describe('Entry view', () => {
  it('should render', async () => {
    fetch.mockResponse(JSON.stringify(interactionData));
    await act(async () => {
      const { asFragment } = customRender(
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
      const { asFragment } = customRender(
        <Router>
          <EntryMain transformedData={uniProtKbConverter(nonHumanEntryData)} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
