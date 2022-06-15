import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import DidYouMean from '../DidYouMean';

import customRender from '../../../__test-helpers__/customRender';

import { Suggestion } from '../../../types/results';

const mock = new MockAdapter(axios);
mock
  .onGet(/api\/uniparc/)
  .reply(200, {}, { 'x-total-results': '3' })
  .onGet(/api\/uniref/)
  .reply(200, {}, { 'x-total-results': '2' })
  .onGet(/api\/proteomes/)
  .reply(200, {}, { 'x-total-results': '0' });

const suggestions: Suggestion[] = [
  {
    query: 'foo',
    hits: 123,
  },
  {
    query: 'bar',
    hits: 35,
  },
];

describe('DidYouMean', () => {
  it('should render suggestion provided with payload and other namespace suggestions', async () => {
    customRender(<DidYouMean suggestions={suggestions} />, {
      route: '/uniprotkb?query=blah',
    });
    expect(await screen.findByText('foo')).toHaveAttribute(
      'href',
      '/uniprotkb?query=foo'
    );
    expect(await screen.findByText('bar')).toHaveAttribute(
      'href',
      '/uniprotkb?query=bar'
    );
    const otherNamespaceSuggestions = await screen.findAllByText('blah');
    expect(otherNamespaceSuggestions).toHaveLength(2);
    expect(otherNamespaceSuggestions[0]).toHaveAttribute(
      'href',
      '/uniparc?query=blah'
    );
    expect(otherNamespaceSuggestions[1]).toHaveAttribute(
      'href',
      '/uniref?query=blah'
    );
  });
});
