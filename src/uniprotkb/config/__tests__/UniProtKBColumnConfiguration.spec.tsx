import UniProtKBColumnConfiguration from '../UniProtKBColumnConfiguration';

import uniProtKbConverter from '../../adapters/uniProtkbConverter';
import customRender from '../../../shared/__test-helpers__/customRender';

// NOTE: citation IDs are identical, so will trigger react key warning!
import data from '../../__mocks__/uniProtKBEntryModelData';

jest.mock('../../../tools/utils/storage');

describe('UniProtKBColumnConfiguration component', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
  });

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.SVGElement.prototype.getBBox;
  });

  // TODO: find mock data to generate non-null snapshot for:
  // go_id, go, and many others
  test.each(Array.from(UniProtKBColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(
        <>{column.render(uniProtKbConverter(data))}</>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
