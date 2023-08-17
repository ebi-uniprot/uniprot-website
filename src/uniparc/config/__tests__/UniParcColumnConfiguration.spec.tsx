import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../UniParcColumnConfiguration';

import uniParcConverter, {
  UniParcAPIModel,
  UniParcUIModel,
} from '../../adapters/uniParcConverter';
import customRender from '../../../shared/__test-helpers__/customRender';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';

import data from '../../__mocks__/uniParcEntryModelData';

jest.mock('../../../tools/utils/storage');

const transformedData: UniParcUIModel = uniParcConverter(data);

describe('UniParcColumnConfiguration component', () => {
  testColumnConfiguration<UniParcColumn, UniParcAPIModel>(
    UniParcColumnConfiguration,
    transformedData
  );

  describe('edge cases', () => {
    it('should render empty "first seen" column when no xref', () => {
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

  it('should render empty "last seen" column when no xref', () => {
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
