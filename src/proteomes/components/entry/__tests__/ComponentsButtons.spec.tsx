import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

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
      customRender(
        <ComponentsButtons
          id="id"
          components={components as Component[]}
          selectedEntries={selectedComponents}
          proteomeType="Reference and representative proteome"
          proteinCount={100}
          proteomeStatistics={{
            reviewedProteinCount: 50,
            unreviewedProteinCount: 50,
          }}
        />
      );
      const link = screen.getByRole<HTMLAnchorElement>('link', {
        name: 'View proteins',
      });
      expect(link).toBeInTheDocument();
      const url = new URL(link.href);
      expect(url.pathname).toMatch(/\/uniprotkb/);
      expect(url.searchParams.get('query')).toMatch(expectedQuery);
    }
  );

  it('should render nothing when no components are passed', () => {
    const { container } = customRender(
      <ComponentsButtons
        id="id"
        selectedEntries={[]}
        proteomeType="Reference and representative proteome"
        proteinCount={100}
        proteomeStatistics={{
          reviewedProteinCount: 50,
          unreviewedProteinCount: 50,
        }}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should open download sliding panel', async () => {
    customRender(
      <ComponentsButtons
        id="id"
        selectedEntries={[]}
        components={getComponents(10) as Component[]}
        proteomeType="Reference and representative proteome"
        proteinCount={100}
        proteomeStatistics={{
          reviewedProteinCount: 50,
          unreviewedProteinCount: 50,
        }}
      />
    );
    const downloadButton = screen.getByRole('button', { name: /Download/ });
    fireEvent.click(downloadButton);
    // Needs a bit timeout even though there are no API calls happening.
    expect(
      await screen.findByTestId('sliding-panel', undefined, { timeout: 10000 })
    ).toBeInTheDocument();
  });
});
