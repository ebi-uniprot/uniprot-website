import customRender from '../../../../shared/__test-helpers__/customRender';

import EntryMain from '../EntryMain';

import proteomesConverter from '../../../adapters/proteomesConverter';

import mockData from '../../../__mocks__/proteomesEntryModelData';

describe('EntryMain view', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <EntryMain transformedData={proteomesConverter(mockData)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
