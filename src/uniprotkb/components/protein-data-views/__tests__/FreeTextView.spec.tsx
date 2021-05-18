import { render } from '@testing-library/react';

import FreeTextView from '../FreeTextView';

import FreeTextUIData from './__mocks__/freeTextUIData';

describe('FreeText component', () => {
  test('should render free text CC', () => {
    const { asFragment } = render(<FreeTextView comments={FreeTextUIData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
