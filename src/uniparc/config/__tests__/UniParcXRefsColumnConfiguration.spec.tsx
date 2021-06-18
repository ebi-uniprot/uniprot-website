import UniParcXRefsColumnConfiguration from '../UniParcXRefsColumnConfiguration';

import customRender from '../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/uniParcEntryModelData';

jest.mock('../../../tools/utils/storage');

describe('UniParcXRefsColumnConfiguration component', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const xrefData = data.uniParcCrossReferences?.[0]!;
  test.each(Array.from(UniParcXRefsColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(<>{column.render(xrefData)}</>);
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
