/**
 * @jest-environment node
 */
import * as patterns from '../url-patterns';

describe('URL patterns for service worker caching', () => {
  test('external APIs', () => {
    expect(
      'https://api.geneontology.org/api/bioentityset/slimmer/function'
    ).toMatch(patterns.externalAPIs);
    expect('https://api.rhea-db.org/rhea/32727/json').toMatch(
      patterns.externalAPIs
    );
    expect(
      'https://www.rhea-db.org/compoundImage?dimensions=200&chebiId=CHEBI:16526'
    ).toMatch(patterns.externalAPIs);
    expect(
      'https://www.rhea-db.org/compoundImage?dimensions=200&chebiId=CHEBI:16526'
    ).toMatch(patterns.externalAPIs);
    expect(
      'https://www.ebi.ac.uk/pdbe/coordinates/3al5/full?encoding=BCIF'
    ).toMatch(patterns.externalAPIs);
    expect(
      'https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/A2RUC4?page_size=100&type=repeat'
    ).toMatch(patterns.externalAPIs);
  });

  test('same-origin images and fonts', () => {
    expect('/fonts/fontello.42ffd9.woff2').toMatch(
      patterns.sameOriginImagesAndFonts
    );
  });

  test('external images', () => {
    expect('https://www.example.com/image.png').toMatch(
      patterns.externalImages
    );
  });

  test('Google fonts stylesheets', () => {
    expect(
      'https://fonts.googleapis.com/css?family=Lato:400,700|Source+Sans+Pro:600,700&display=swap'
    ).toMatch(patterns.googleFontsStylesheets);
  });

  test('Google fonts files', () => {
    expect(
      'https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdu3cOWxw.woff2'
    ).toMatch(patterns.googleFontsFiles);
  });

  test('QuickGO', () => {
    expect(
      'https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim?relations=is_a%2Cpart_of%2Coccurs_in%2Cregulates&slimsFromIds=GO%3A0000122%2CGO%3A0000978'
    ).toMatch(patterns.quickGO);
  });

  test('UniProt APIs', () => {
    expect('https://www.ebi.ac.uk/proteins/api/antigen/A1L3X0').toMatch(
      patterns.proteinsAPI
    );
    expect('https://rest.uniprot.org/beta/uniprotkb/A1L3X0').toMatch(
      patterns.websiteAPI
    );
    expect('https://rest.uniprot.org/uniprotkb/A1L3X0').toMatch(
      patterns.websiteAPI
    );
  });
});
