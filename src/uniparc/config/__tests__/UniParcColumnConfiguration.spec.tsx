import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../UniParcColumnConfiguration';

import uniParcConverter, {
  UniParcUIModel,
} from '../../adapters/uniParcConverter';
import customRender from '../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/uniParcEntryModelData';

jest.mock('../../../tools/utils/storage');

describe('UniParcColumnConfiguration component', () => {
  let transformedData: UniParcUIModel;

  beforeAll(() => {
    transformedData = uniParcConverter(data);
  });

  test.each(Array.from(UniParcColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(
        <>{column.render(transformedData)}</>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );

  describe('edge cases', () => {
    test('should render empty "first seen" column when no xref', () => {
      const { container } = customRender(
        <>
          {UniParcColumnConfiguration.get(UniParcColumn.firstSeen)?.render({
            ...transformedData,
            uniParcCrossReferences: undefined,
          })}
        </>
      );
      expect(container.children).toHaveLength(0);
    });
  });

  test('should render empty "last seen" column when no xref', () => {
    const { container } = customRender(
      <>
        {UniParcColumnConfiguration.get(UniParcColumn.lastSeen)?.render({
          ...transformedData,
          uniParcCrossReferences: undefined,
        })}
      </>
    );
    expect(container.children).toHaveLength(0);
  });
});
