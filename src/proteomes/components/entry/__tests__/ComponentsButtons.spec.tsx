import { screen } from '@testing-library/react';
import queryString from 'query-string';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import ComponentsButtons from '../ComponentsButtons';

describe('ComponentsButtons', () => {
  // [nComponents, selectedComponents, expected query, expected link text]
  const testCases: [number, string[], string, string][] = [
    [1, [], '(proteome:id)', 'View UniProtKB entry for component'],
    [1, ['a'], '(proteome:id)', 'View UniProtKB entry for component'],
    [2, [], '(proteome:id)', 'View UniProtKB entries for all 2 components'],
    [
      2,
      ['a'],
      '(proteome:id) AND (proteomecomponent:"a")',
      'View UniProtKB entry for 1 selected component',
    ],
    [
      2,
      ['a', 'b'],
      '(proteome:id)',
      'View UniProtKB entries for all 2 components',
    ],
  ];

  test.each(testCases)(
    'should create correct view link and text with %p components and selected components: %p',
    (nComponents, selectedComponents, expectedQuery, linkText) => {
      renderWithRedux(
        <ComponentsButtons
          id="id"
          nComponents={nComponents}
          selectedEntries={selectedComponents}
        />
      );
      const link = screen.getByRole('link', {
        name: linkText,
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
