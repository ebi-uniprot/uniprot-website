import {
  getIdToOperation,
  getLayoutAction,
  getTagIdsAndSections,
  tagNameToId,
} from '../apiDocumentation';

import unirefOpenApi from './__mocks__/unirefOpenApi';

describe('tagNameToId', () => {
  it('should correct return id', () => {
    expect(tagNameToId('ID Mapping results')).toEqual('ID_Mapping_results');
  });
});

describe('getTagIdsAndSections', () => {
  it('should extract all sections from the openapi file', () => {
    expect(
      getTagIdsAndSections(
        new Map([
          ['tags', unirefOpenApi.tags?.map((t) => new Map(Object.entries(t)))],
        ]),
        getIdToOperation(unirefOpenApi.paths),
        'label-class'
      )
    ).toEqual([
      new Set(['UniRef']),
      [
        { id: 'UniRef', label: 'UniRef' },
        {
          id: 'operations-UniRef-getById',
          label: <span className="label-class">{'/uniref/{id}'}</span>,
        },
        {
          id: 'operations-UniRef-search',
          label: <span className="label-class">{'/uniref/{id}/members'}</span>,
        },
        {
          id: 'operations-UniRef-getById_1',
          label: <span className="label-class">{'/uniref/{id}/light'}</span>,
        },
        {
          id: 'operations-UniRef-stream',
          label: <span className="label-class">/uniref/stream</span>,
        },

        {
          id: 'operations-UniRef-search_1',
          label: <span className="label-class">/uniref/search</span>,
        },
      ],
    ]);
  });
});

describe('getLayoutAction', () => {
  it('should return correct layout action', () => {
    expect(
      getLayoutAction(
        {
          path: '/uniref/{id}/members',
          tag: 'UniRef',
          operationId: 'search',
        },
        false
      )
    ).toEqual({
      type: 'layout_show',
      payload: {
        thing: ['operations', 'UniRef', 'search'],
        shown: false,
      },
    });
  });
});

describe('getIdToOperation', () => {
  it('should return correct mapping', () => {
    expect(Array.from(getIdToOperation(unirefOpenApi.paths))).toEqual([
      [
        'operations-UniRef-getById',
        {
          path: '/uniref/{id}',
          tag: 'UniRef',
          operationId: 'getById',
        },
      ],
      [
        'operations-UniRef-search',
        {
          path: '/uniref/{id}/members',
          tag: 'UniRef',
          operationId: 'search',
        },
      ],
      [
        'operations-UniRef-getById_1',
        {
          path: '/uniref/{id}/light',
          tag: 'UniRef',
          operationId: 'getById_1',
        },
      ],
      [
        'operations-UniRef-stream',
        {
          path: '/uniref/stream',
          tag: 'UniRef',
          operationId: 'stream',
        },
      ],
      [
        'operations-UniRef-search_1',
        {
          path: '/uniref/search',
          tag: 'UniRef',
          operationId: 'search_1',
        },
      ],
    ]);
  });
});
