import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';
import SecondaryItems from '../SecondaryItems';

describe('SecondaryItems basket button', () => {
  it('is a link that opens the panel off the basket full view', () => {
    customRender(<SecondaryItems />, {
      route: '/uniprotkb/results?query=*',
    });
    const basket = screen.getByTitle('Basket');
    expect(basket).toBeInTheDocument();
    expect(basket.tagName).toBe('A');
  });

  it('is disabled on the basket full view', () => {
    customRender(<SecondaryItems />, {
      route: '/basket/uniprotkb',
      path: '/basket/:namespace',
    });
    // no navigable link to open the panel, an inert element in its place
    expect(screen.queryByTitle('Basket')).not.toBeInTheDocument();
    expect(
      document.querySelector('[aria-disabled="true"]')
    ).toBeInTheDocument();
  });
});
