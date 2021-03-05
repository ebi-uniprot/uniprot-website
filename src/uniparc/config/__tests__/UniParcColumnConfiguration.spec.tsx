import { MemoryRouter } from 'react-router-dom';

import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../UniParcColumnConfiguration';

import uniParcConverter from '../../adapters/uniParcConverter';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/entryModelData';

jest.mock('../../../tools/utils/storage');

describe('UniParcColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniParcConverter(data);
  });

  for (const [key, column] of UniParcColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }

  describe('edge cases', () => {
    test('should render empty "first seen" column when no xref', () => {
      const { container } = renderWithRedux(
        <MemoryRouter>
          {UniParcColumnConfiguration.get(UniParcColumn.firstSeen).render({
            ...transformedData,
            uniParcCrossReferences: undefined,
          })}
        </MemoryRouter>
      );
      expect(container.children).toHaveLength(0);
    });
  });

  test('should render empty "last seen" column when no xref', () => {
    const { container } = renderWithRedux(
      <MemoryRouter>
        {UniParcColumnConfiguration.get(UniParcColumn.lastSeen).render({
          ...transformedData,
          uniParcCrossReferences: undefined,
        })}
      </MemoryRouter>
    );
    expect(container.children).toHaveLength(0);
  });
});
