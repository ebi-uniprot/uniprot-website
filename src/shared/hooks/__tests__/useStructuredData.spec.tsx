import { render } from '@testing-library/react';

import { structuredData } from '../../__test-helpers__/headTags';
import useStructuredData from '../useStructuredData';

const Component = () => {
  useStructuredData(undefined);
  return null;
};

describe('useStructuredData', () => {
  it('mounts a script tag in the head and removes it on unmount', () => {
    const { unmount } = render(<Component />);
    expect(structuredData()).toHaveLength(1);

    unmount();
    expect(structuredData()).toHaveLength(0);
  });

  it('does not throw on unmount when the tag was already removed', () => {
    const { unmount } = render(<Component />);
    for (const script of document.querySelectorAll(
      'script[type="application/ld+json"]'
    )) {
      script.remove();
    }

    expect(unmount).not.toThrow();
  });
});
