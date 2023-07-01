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

mock.onGet(/\/uniprotkb\/search\?query=%28gene_exact%3Aapp%29/).reply(200, {
  results: [
    {
      entryType: 'UniProtKB reviewed (Swiss-Prot)',
      primaryAccession: 'P05067',
    },
  ],
});

mock.onGet(/\/uniprotkb\/search\?query=%28gene_exact%3Aerv%29/).reply(200, {
  results: [],
});

mock.onGet(/\/uniprotkb\/search\?query=organism_id%3A9606/).reply(200, {
  results: [
    {
      organism: {
        scientificName: 'Homo sapiens',
        commonName: 'Human',
        taxonId: 9606,
      },
    },
  ],
});

mock.onGet(/\/uniprotkb\/search\?organism_id%3A2/).reply(200, {
  results: [],
});

mock
  .onGet(/\/proteomes\/search\?fields=upid&query=organism_id%3A9606/)
  .reply(200, {
    results: [
      {
        id: 'UP000005640',
        proteomeType: 'Reference and representative proteome',
      },
    ],
  });

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

  it('should render suggestions for fields that support exact match', async () => {
    const { asFragment } = customRender(
      <SearchSuggestions
        query="gene:app"
        namespace={Namespace.uniprotkb}
        total={100}
      />
    );

    await screen.findByText('or show only exact matches for', { exact: false });
    expect(screen.getByRole('link', { name: 'app' })).toHaveAttribute(
      'href',
      '/?query=(gene_exact:app)'
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render suggestions for fields that support exact match but without any hits', async () => {
    const { container } = customRender(
      <SearchSuggestions
        query="gene:erv"
        namespace={Namespace.uniprotkb}
        total={100}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render suggestions for fields that has different taxon level', async () => {
    const { asFragment } = customRender(
      <SearchSuggestions
        query="taxonomy_id:9606"
        namespace={Namespace.uniprotkb}
        total={100}
      />
    );

    await screen.findByText('or restrict search to', { exact: false });
    expect(
      screen.getByRole('link', { name: 'exclude lower taxonomic ranks' })
    ).toHaveAttribute('href', '/?query=(organism_id:9606)');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render suggestions if there is no organism with the given taxon id', async () => {
    const { container } = customRender(
      <SearchSuggestions
        query="taxonomy_id:2"
        namespace={Namespace.uniprotkb}
        total={100}
      />
    );

    expect(container.querySelector('small')).toHaveTextContent('');
  });

  it('should render proteome suggestions given an organism id', async () => {
    const { asFragment } = customRender(
      <SearchSuggestions
        query="organism_id:9606"
        namespace={Namespace.uniprotkb}
        total={100}
      />
    );

    await screen.findByText('or expand search to', { exact: false });
    expect(screen.getByRole('link', { name: 'UP000005640' })).toHaveAttribute(
      'href',
      '/?query=organism_id:9606 AND (proteome:UP000005640)'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
