import UniProtKBCard from '../UniProtKBCard';

import customRender from '../../../../shared/__test-helpers__/customRender';

import data from '../../../__mocks__/uniProtKBEntryModelData';

let rendered: ReturnType<typeof customRender>;

describe('UniProtKBCard component', () => {
  beforeEach(() => {
    rendered = customRender(<UniProtKBCard data={data} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
