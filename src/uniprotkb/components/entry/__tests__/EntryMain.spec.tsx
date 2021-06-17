import { enableFetchMocks, FetchMock } from 'jest-fetch-mock';

import EntryMain from '../EntryMain';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import mockData from '../../../__mocks__/uniProtKBEntryModelData';
import interactionData from '../../../__mocks__/interaction.json';
import nonHumanEntryData from '../../../__mocks__/nonHumanEntryModelData';

enableFetchMocks();

describe('Entry view', () => {
  it('should render', async () => {
    (fetch as FetchMock).mockResponse(JSON.stringify(interactionData));

    const { asFragment } = customRender(
      <EntryMain transformedData={uniProtKbConverter(mockData)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render for non-human entry', async () => {
    (fetch as FetchMock).mockResponse(JSON.stringify(interactionData));

    const { asFragment } = customRender(
      <EntryMain transformedData={uniProtKbConverter(nonHumanEntryData)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
