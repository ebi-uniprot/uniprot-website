import initializer from '../fieldInitializer';

import { getSearchTerm } from '../../components/__tests__/__mocks__/configureSearchTerms';

describe('field initializer', () => {
  it('should return autocomplete name value when provided', () => {
    expect(
      initializer(getSearchTerm('organism_name_field'), {
        organism_name: 'human', // eslint-disable-line camelcase
      })
    ).toEqual('human');
  });
  it('should return autocomplete id value when provided', () => {
    expect(
      initializer(
        getSearchTerm('organism_name_field'),
        {
          organism_id: '9606', // eslint-disable-line camelcase
        },
        true
      )
    ).toEqual('9606');
  });
});
