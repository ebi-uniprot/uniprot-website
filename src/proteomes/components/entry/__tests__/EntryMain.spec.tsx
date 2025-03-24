import customRender from '../../../../shared/__test-helpers__/customRender';
import mockData from '../../../__mocks__/proteomesEntryModelData';
import proteomesConverter from '../../../adapters/proteomesConverter';
import EntryMain from '../EntryMain';

describe('EntryMain view', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <EntryMain transformedData={proteomesConverter(mockData)} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
