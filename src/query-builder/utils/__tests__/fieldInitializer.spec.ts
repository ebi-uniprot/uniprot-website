import { getSearchTerm } from '../../components/__tests__/__mocks__/configureSearchTerms';
import initializer from '../fieldInitializer';

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

  describe('proteome / proteomecomponent', () => {
    it('should return the proteome ID part for the `proteome` field', () => {
      expect(
        initializer(getSearchTerm('proteome'), {
          proteomecomponent: 'UP000005640:chromosome',
        })
      ).toEqual('UP000005640');
    });

    it('should return the component part for the `proteome_component` field', () => {
      expect(
        initializer(getSearchTerm('proteome_component'), {
          proteomecomponent: 'UP000005640:chromosome',
        })
      ).toEqual('chromosome');
    });

    it('should return the proteome ID and an empty component when no `:` is present', () => {
      expect(
        initializer(getSearchTerm('proteome'), {
          proteomecomponent: 'UP000005640',
        })
      ).toEqual('UP000005640');
      expect(
        initializer(getSearchTerm('proteome_component'), {
          proteomecomponent: 'UP000005640',
        })
      ).toEqual('');
    });
  });
});
