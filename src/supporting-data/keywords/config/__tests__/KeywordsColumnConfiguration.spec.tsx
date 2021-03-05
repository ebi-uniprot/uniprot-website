import { MemoryRouter } from 'react-router-dom';

import KeywordsColumnConfiguration from '../KeywordsColumnConfiguration';

import citationsConverter, {
  KeywordsAPIModel,
  KeywordsUIModel,
} from '../../adapters/keywordsConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/keywordsModelData';

jest.mock('../../../../tools/utils/storage');

describe('KeywordsColumnConfiguration component', () => {
  let transformedData: KeywordsUIModel;

  beforeAll(() => {
    transformedData = citationsConverter(data[0] as KeywordsAPIModel);
  });

// TODO: find mock data to create non-null parent, sites, synonym snapshots
  for (const [key, column] of KeywordsColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
