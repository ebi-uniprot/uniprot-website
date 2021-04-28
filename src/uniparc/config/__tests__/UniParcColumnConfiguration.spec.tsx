import { MemoryRouter } from 'react-router-dom';

import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../UniParcColumnConfiguration';

import uniParcConverter, {
  UniParcUIModel,
} from '../../adapters/uniParcConverter';
import customRender from '../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/entryModelData';

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
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );

  describe('edge cases', () => {
    test('should render empty "first seen" column when no xref', () => {
      const { container } = customRender(
        <MemoryRouter>
          {UniParcColumnConfiguration.get(UniParcColumn.firstSeen)?.render({
            ...transformedData,
            uniParcCrossReferences: undefined,
          })}
        </MemoryRouter>
      );
      expect(container.children).toHaveLength(0);
    });
  });

  test('should render empty "last seen" column when no xref', () => {
    const { container } = customRender(
      <MemoryRouter>
        {UniParcColumnConfiguration.get(UniParcColumn.lastSeen)?.render({
          ...transformedData,
          uniParcCrossReferences: undefined,
        })}
      </MemoryRouter>
    );
    expect(container.children).toHaveLength(0);
  });
});
