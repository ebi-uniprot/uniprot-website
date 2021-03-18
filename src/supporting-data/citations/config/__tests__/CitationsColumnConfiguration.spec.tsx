import { MemoryRouter } from 'react-router-dom';

import CitationsColumnConfiguration from '../CitationsColumnConfiguration';

import citationsConverter, {
  CitationsAPIModel,
  CitationsUIModel,
} from '../../adapters/citationsConverter';
import customRender from '../../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/citationsModelData';

jest.mock('../../../../tools/utils/storage');

describe('CitationsColumnConfiguration component', () => {
  let transformedData: CitationsUIModel;

  beforeAll(() => {
    transformedData = citationsConverter(data[0] as CitationsAPIModel);
  });

  test.each(Array.from(CitationsColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
