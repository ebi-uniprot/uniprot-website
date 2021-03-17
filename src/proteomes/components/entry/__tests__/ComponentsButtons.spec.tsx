import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import queryString from 'query-string';

import ComponentsButtons from '../ComponentsButtons';

describe('ComponentsButtons', () => {
  // [nComponents, selectedComponents, expected query]
  const testCases: [number, string[], string][] = [
    [1, [], '(proteome:id)'],
    [1, ['a'], '(proteome:id)'],
    [2, [], '(proteome:id)'],
    [2, ['a'], '(proteome:id) AND (proteomecomponent:"a")'],
    [2, ['a', 'b'], '(proteome:id)'],
  ];

  test.each(testCases)(
    'should create correct view link and text with %p components and selected components: %p',
    (nComponents, selectedComponents, expectedQuery) => {
      render(
        <Router>
          <ComponentsButtons
            id="id"
            nComponents={nComponents}
            selectedEntries={selectedComponents}
          />
        </Router>
      );
      const link = screen.getByRole('link', {
        name: 'View proteins',
      }) as HTMLAnchorElement;
      expect(link).toBeInTheDocument();
      const {
        url,
        query: { query },
      } = queryString.parseUrl(link.href);
      expect(url).toMatch(/\/uniprotkb/);
      expect(query).toMatch(expectedQuery);
    }
  );
});
