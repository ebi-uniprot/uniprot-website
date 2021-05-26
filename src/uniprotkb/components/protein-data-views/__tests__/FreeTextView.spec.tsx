import { screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import FreeTextView from '../FreeTextView';

import freeTextUIData from './__mocks__/freeTextUIData';

describe('FreeText component', () => {
  test('should render free text CC', () => {
    const { asFragment } = customRender(
      <FreeTextView comments={freeTextUIData} />
    );
    expect(asFragment()).toMatchSnapshot();

    // PubMed links
    expect(screen.getAllByRole('link')).toHaveLength(2);

    // Publication button / evidence tag
    expect(
      screen.getByRole('button', { name: '1 publication' })
    ).toBeInTheDocument();
  });
});
