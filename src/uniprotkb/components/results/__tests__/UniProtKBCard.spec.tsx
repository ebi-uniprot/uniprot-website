import customRender from '../../../../shared/__test-helpers__/customRender';
import data from '../../../__mocks__/uniProtKBEntryModelData';
import UniProtKBCard from '../UniProtKBCard';

let rendered: ReturnType<typeof customRender>;

describe('UniProtKBCard component', () => {
  beforeEach(() => {
    rendered = customRender(<UniProtKBCard data={data} />);
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
