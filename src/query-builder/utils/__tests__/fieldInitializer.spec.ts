import initializer from '../fieldInitializer';

import { getSearchTerm } from '../../components/__tests__/__mocks__/configureSearchTerms';

describe('field initializer', () => {
  it('should return autocomplete name value when provided', () => {
    expect(
      initializer(getSearchTerm('organism_name_field'), {
        organism_name: 'human',
      })
    ).toEqual('human');
  });
  it('should return autocomplete id value when provided', () => {
    expect(
      initializer(
        getSearchTerm('organism_name_field'),
        {
          organism_id: '9606',
        },
        true
      )
    ).toEqual('9606');
  });
});
