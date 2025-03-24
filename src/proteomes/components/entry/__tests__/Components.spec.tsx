import customRender from '../../../../shared/__test-helpers__/customRender';
import mockData from '../../../__mocks__/proteomesEntryModelData';
import proteomesConverter from '../../../adapters/proteomesConverter';
import Components from '../Components';

describe('Components view', () => {
  it('should render', () => {
    const data = proteomesConverter(mockData);
    const { asFragment } = customRender(
      <Components
        components={data.components}
        id={data.id}
        proteinCount={data.proteinCount}
        proteomeType={data.proteomeType}
        taxonomy={data.taxonomy}
        proteomeStatistics={data.proteomeStatistics}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
