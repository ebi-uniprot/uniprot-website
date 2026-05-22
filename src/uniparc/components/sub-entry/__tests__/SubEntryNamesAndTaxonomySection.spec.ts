import { type UniProtkbUIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import UniProtKBEntrySection from '../../../../uniprotkb/types/entrySection';
import { type UniParcSubEntryUIModel } from '../../../adapters/uniParcSubEntryConverter';
import { namesAndTaxonomySectionHasContent } from '../SubEntryNamesAndTaxonomySection';

// A converted-annotations UIModel carrying only a Names & Taxonomy section —
// enough to exercise the predicate's predicted-name branches.
const annotationsWithNamesAndTaxonomy = (
  namesAndTaxonomy: object
): UniProtkbUIModel =>
  ({
    [UniProtKBEntrySection.NamesAndTaxonomy]: namesAndTaxonomy,
  }) as unknown as UniProtkbUIModel;

const dataWith = (subEntry: object): UniParcSubEntryUIModel =>
  ({ subEntry }) as unknown as UniParcSubEntryUIModel;

describe('namesAndTaxonomySectionHasContent', () => {
  it('is false when there is no sub-entry data', () => {
    expect(namesAndTaxonomySectionHasContent(undefined)).toBe(false);
  });

  it('is false when neither the cross-reference nor annotations carry names', () => {
    expect(namesAndTaxonomySectionHasContent(dataWith({}))).toBe(false);
  });

  it('is true for an imported protein name from the cross-reference', () => {
    expect(
      namesAndTaxonomySectionHasContent(dataWith({ proteinName: 'Amyloid' }))
    ).toBe(true);
  });

  it('is true for an imported organism from the cross-reference', () => {
    expect(
      namesAndTaxonomySectionHasContent(
        dataWith({ organism: { taxonId: 9606 } })
      )
    ).toBe(true);
  });

  // Regression: the section renders predicted names from `annotations`, so the
  // nav predicate must count them — previously it checked only imported data,
  // leaving the nav item disabled while the card showed predicted names.
  it('is true for a predicted protein name when no name is imported', () => {
    expect(
      namesAndTaxonomySectionHasContent(
        dataWith({}),
        annotationsWithNamesAndTaxonomy({
          proteinNamesData: {
            recommendedName: { fullName: { value: 'Predicted protein' } },
          },
        })
      )
    ).toBe(true);
  });

  it('is true for a predicted gene name when no name is imported', () => {
    expect(
      namesAndTaxonomySectionHasContent(
        dataWith({}),
        annotationsWithNamesAndTaxonomy({
          geneNamesData: [{ geneName: { value: 'TP53' } }],
        })
      )
    ).toBe(true);
  });
});
