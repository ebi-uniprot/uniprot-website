import customRender from '../../../../shared/__test-helpers__/customRender';

import Components from '../Components';

import proteomesConverter from '../../../adapters/proteomesConverter';

import mockData from '../../../__mocks__/proteomesEntryModelData';

describe('Components view', () => {
  it('should render', () => {
    const data = proteomesConverter(mockData);
    const { asFragment } = customRender(
      <Components
        components={data.components}
        id={data.id}
        proteinCount={data.proteinCount}
        proteomeType={data.proteomeType}
        superkingdom={data.superkingdom}
        taxonomy={data.taxonomy}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
