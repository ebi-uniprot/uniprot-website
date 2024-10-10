import { screen } from '@testing-library/react';

import { Facet, Facets, stringify, parse, CustomParsedQuery } from '../Facets';

import customRender from '../../../__test-helpers__/customRender';

import facets, { statusFacet, proteinsWithFacet } from './__mocks__/facets';

describe('<Facet />', () => {
  it('should render facet with few data', () => {
    const { asFragment } = customRender(<Facet data={statusFacet} />);
    expect(
      screen.queryByRole('button', { name: /More items/i })
    ).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render facet with a lot of data', () => {
    const { asFragment } = customRender(<Facet data={proteinsWithFacet} />);
    expect(
      screen.getByRole('button', { name: /More items/i })
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('<Facets />', () => {
  it('should render multiple facets', () => {
    const { asFragment } = customRender(<Facets data={facets} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('<Facet />', () => {
  it('should render facet with few data', () => {
    const { asFragment } = customRender(<Facet data={statusFacet} />);
    expect(
      screen.queryByRole('button', { name: /More items/i })
    ).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render facet with a lot of data', () => {
    const { asFragment } = customRender(<Facet data={proteinsWithFacet} />);
    expect(
      screen.getByRole('button', { name: /More items/i })
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

const testCases: {
  description: string;
  parsed: CustomParsedQuery;
  query: string;
  key?: string;
}[] = [
  {
    description: 'should handle just one facets',
    parsed: { facets: { identity: new Set(['1.0']) } },
    query: 'facets=identity%3A1.0',
  },
  {
    description: 'should handle just two facets',
    parsed: {
      facets: { blabla: new Set(['value']), identity: new Set(['1.0']) },
    },
    query: 'facets=blabla%3Avalue%2Cidentity%3A1.0',
  },
  {
    description: 'should handle facets and something else',
    parsed: {
      facets: { identity: new Set(['1.0']) },
      query: 'glucose',
    },
    query: 'query=glucose&facets=identity%3A1.0',
  },
  {
    description: 'should handle facets with another name',
    parsed: {
      filter: { identity: new Set(['1.0']) },
      query: 'glucose',
    },
    key: 'filter',
    query: 'query=glucose&filter=identity%3A1.0',
  },
];

describe('parse facets', () => {
  test.each(testCases)('parse $description', ({ parsed, query, key }) => {
    expect(parse(query, key)).toEqual(parsed);
  });
});

describe('stringify facets', () => {
  test.each(testCases)('stringify $description', ({ parsed, query, key }) => {
    expect(stringify(parsed, key)).toEqual(query);
  });
});
