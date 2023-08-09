import customRender from '../../../../shared/__test-helpers__/customRender';

import ProteomesEntryView from '../ProteomesView';

import ProteomesUIData from './__mocks__/proteomesUIData.json';

describe('ProteomesEntryView component', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <ProteomesEntryView data={ProteomesUIData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
