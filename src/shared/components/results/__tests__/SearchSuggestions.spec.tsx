import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../__test-helpers__/customRender';

import SearchSuggestions from '../SearchSuggestions';

import { Namespace } from '../../../types/namespaces';

import configureSearchTerms from '../../../../query-builder/components/__tests__/__mocks__/configureSearchTerms';

const mock = new MockAdapter(axios);

mock
  .onGet(
    /\/uniprotkb\/search\?query=eve&showSingleTermMatchedFields=true&size=0/
  )
  .reply(200, {
    matchedFields: [
      { name: 'strain', hits: 14411 },
      { name: 'lit_author', hits: 2 },
      { name: 'gene', hits: 88 },
      { name: 'protein_name', hits: 13014 },
      { name: 'organism_name', hits: 1 },
      { name: 'taxonomy_name', hits: 1 },
    ],
    results: [],
  });

mock
  .onGet(/\/configure\/uniprotkb\/search-fields/)
  .reply(200, configureSearchTerms);

describe('SearchSuggestions', () => {
  describe('No render', () => {
    it('should not render anything on complex queries', () => {
      const rendered = customRender(
        <SearchSuggestions
          query="a AND b"
          namespace={Namespace.uniprotkb}
          total={100}
        />
      );
      expect(rendered.container).toBeEmptyDOMElement();

      rendered.rerender(
        <SearchSuggestions
          query="*"
          namespace={Namespace.uniprotkb}
          total={100}
        />
      );
      expect(rendered.container).toBeEmptyDOMElement();

      rendered.rerender(
        <SearchSuggestions
          query="(complex)"
          namespace={Namespace.uniprotkb}
          total={100}
        />
      );
      expect(rendered.container).toBeEmptyDOMElement();
    });

    it('should not render anything on small result sets', () => {
      const { container } = customRender(
        <SearchSuggestions
          query="eve"
          namespace={Namespace.uniprotkb}
          total={1}
        />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it('should not render anything on incompatible namespaces', () => {
      const { container } = customRender(
        <SearchSuggestions
          query="eve"
          namespace={Namespace.uniref}
          total={100}
        />
      );
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('should render suggestions', async () => {
    const { asFragment } = customRender(
      <SearchSuggestions
        query="eve"
        namespace={Namespace.uniprotkb}
        total={100}
      />
    );

    await screen.findByText('or search "eve"', { exact: false });
    expect(asFragment()).toMatchSnapshot();
  });
});
