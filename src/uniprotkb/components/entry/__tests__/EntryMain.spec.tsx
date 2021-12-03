import { enableFetchMocks, FetchMock } from 'jest-fetch-mock';

import EntryMain from '../EntryMain';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';

import customRender from '../../../../shared/__test-helpers__/customRender';

import mockData from '../../../__mocks__/uniProtKBEntryModelData';
import interactionData from '../../../__mocks__/interaction.json';
import nonHumanEntryData from '../../../__mocks__/nonHumanEntryModelData';
import databaseInfoMaps from '../../../adapters/__mocks__/databaseInfoMaps';

enableFetchMocks();

describe('Entry view', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.warn = jest.fn();
  });

  it('should render', async () => {
    (fetch as FetchMock).mockResponse(JSON.stringify(interactionData));

    const { asFragment } = customRender(
      <EntryMain
        transformedData={uniProtKbConverter(mockData, databaseInfoMaps)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render for non-human entry', async () => {
    (fetch as FetchMock).mockResponse(JSON.stringify(interactionData));

    const { asFragment } = customRender(
      <EntryMain
        transformedData={uniProtKbConverter(
          nonHumanEntryData,
          databaseInfoMaps
        )}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
