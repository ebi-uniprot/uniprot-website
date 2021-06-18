/**
 * @jest-environment node
 */

import parseAndMatchQuery from '../parseAndMatchQuery';

import searchTermsData from '../../components/__tests__/__mocks__/configureSearchTerms';

describe('query parser and validator', () => {
  test('with one xref', () => {
    const [valid, invalid] = parseAndMatchQuery(
      '(xref:pdb-gluco-fructose)',
      searchTermsData
    );
    expect(valid).toHaveLength(1);
    expect(valid).toMatchSnapshot();
    expect(invalid).toHaveLength(0);
  });

  test('with xrefs, one invalid', () => {
    const [valid, invalid] = parseAndMatchQuery(
      '(xref:pdb-gluco-fructose) AND (xref:embl-some value) AND (xref:invalid) AND (xref:xyz-value)',
      searchTermsData
    );
    expect(valid).toHaveLength(2);
    expect(valid).toMatchSnapshot();
    expect(invalid).toHaveLength(2);
    expect(invalid).toMatchSnapshot();
  });

  test('with valid and invalid fields', () => {
    const [valid, invalid] = parseAndMatchQuery(
      '(gene:ydj1) AND (invalid:blahblah)',
      searchTermsData
    );
    expect(valid).toHaveLength(1);
    expect(valid).toMatchSnapshot();
    expect(invalid).toHaveLength(1);
    expect(invalid).toMatchSnapshot();
  });

  test('with autocomplete field', () => {
    const [valid, invalid] = parseAndMatchQuery(
      '(taxonomy_id:9606)',
      searchTermsData
    );
    expect(valid).toHaveLength(1);
    expect(valid).toMatchSnapshot();
    expect(invalid).toHaveLength(0);
  });

  test('with GO field', () => {
    const [valid, invalid] = parseAndMatchQuery(
      '(go_exp:0002381)',
      searchTermsData
    );
    expect(valid).toHaveLength(1);
    expect(valid[0].searchTerm.siblings).toHaveLength(2);
    expect(valid).toMatchSnapshot();
    expect(invalid).toHaveLength(0);
  });
});
