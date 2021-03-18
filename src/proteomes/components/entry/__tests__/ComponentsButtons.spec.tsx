import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import queryString from 'query-string';

import ComponentsButtons from '../ComponentsButtons';
import { Component } from '../../../adapters/proteomesConverter';

describe('ComponentsButtons', () => {
  // [nComponents, selectedComponents, expected query]
  const getComponents = (n: number) =>
    Array.from({ length: n }, () => ({
      proteinCount: 1,
    }));
  const testCases: [Pick<Component, 'proteinCount'>[], string[], string][] = [
    [getComponents(1), [], '(proteome:id)'],
    [getComponents(1), ['a'], '(proteome:id)'],
    [getComponents(2), [], '(proteome:id)'],
    [getComponents(2), ['a'], '(proteome:id) AND (proteomecomponent:"a")'],
    [getComponents(2), ['a', 'b'], '(proteome:id)'],
  ];

  test.each(testCases)(
    'should create correct view link and text with %p components and selected components: %p',
    (components, selectedComponents, expectedQuery) => {
      render(
        <Router>
          <ComponentsButtons
            id="id"
            components={components as Component[]}
            selectedEntries={selectedComponents}
            proteinCount={100}
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

  it('should render nothing when no components are passed', () => {
    const { container } = render(
      <Router>
        <ComponentsButtons id="id" proteinCount={100} selectedEntries={[]} />
      </Router>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should open download sliding panel', () => {
    render(
      <Router>
        <ComponentsButtons
          id="id"
          proteinCount={100}
          selectedEntries={[]}
          components={getComponents(10) as Component[]}
        />
      </Router>
    );
    const downloadButton = screen.getByRole('button', { name: 'Download' });
    fireEvent.click(downloadButton);
    expect(screen.queryByTestId('sliding-panel')).toBeInTheDocument();
  });
});
