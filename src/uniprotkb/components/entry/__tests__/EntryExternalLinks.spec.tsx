import customRender from '../../../../shared/__test-helpers__/customRender';

import EntryExternalLinks from '../EntryExternalLinks';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';

import mockData from '../../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../../adapters/__mocks__/databaseInfoMaps';

describe('Entry - External Links view', () => {
  test('should render', () => {
    const { asFragment } = customRender(
      <EntryExternalLinks
        transformedData={uniProtKbConverter(mockData, databaseInfoMaps)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
