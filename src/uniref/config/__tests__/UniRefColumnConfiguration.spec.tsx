import UniRefColumnConfiguration from '../UniRefColumnConfiguration';

import customRender from '../../../shared/__test-helpers__/customRender';

import mock from '../../__mocks__/UniRefResultsData';

jest.mock('../../../tools/utils/storage');

describe('UniRefColumnConfiguration component', () => {
  for (const [key, column] of UniRefColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = customRender(
        <>{column.render(mock.results[0])}</>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
