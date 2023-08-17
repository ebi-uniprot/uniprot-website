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
          proteinCount={100}
          proteomeType="Reference and representative proteome"
          superkingdom="superkingdom"
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
        proteinCount={100}
        selectedEntries={[]}
        proteomeType="Reference and representative proteome"
        superkingdom="superkingdom"
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should open download sliding panel', () => {
    customRender(
      <ComponentsButtons
        id="id"
        proteinCount={100}
        selectedEntries={[]}
        components={getComponents(10) as Component[]}
        proteomeType="Reference and representative proteome"
        superkingdom="superkingdom"
      />
    );
    const downloadButton = screen.getByRole('button', { name: 'Download' });
    fireEvent.click(downloadButton);
    expect(screen.queryByTestId('sliding-panel')).toBeInTheDocument();
  });
});
