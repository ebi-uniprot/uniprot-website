import customRender from '../../../../shared/__test-helpers__/customRender';

import EntryExternalLinks from '../tabs/ExternalLinks';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';

import mockData from '../../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('Entry - External Links view', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <EntryExternalLinks
        transformedData={uniProtKbConverter(mockData, databaseInfoMaps)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
