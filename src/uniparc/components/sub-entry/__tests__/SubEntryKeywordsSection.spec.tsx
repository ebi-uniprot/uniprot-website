import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import uniProtKbConverter from '../../../../uniprotkb/adapters/uniProtkbConverter';
import databaseInfoMaps from '../../../../uniprotkb/utils/__tests__/__mocks__/databaseInfoMaps';
import precomputedMock from '../../../__mocks__/uniparcPrecomputedModelData';
import precomputedToUniProtkbConverter from '../../../adapters/precomputedToUniProtkbConverter';
import SubEntryKeywordsSection, {
  keywordsAndGOSectionHasContent,
} from '../SubEntryKeywordsSection';

// A precomputed model carrying a `Disease` keyword — a category that maps to a
// section the sub-entry does not render on its own. No corpus entry has one, so
// the input is synthetic; the rendering path (`KeywordView`) is the same proven
// component the UniProtKB entry pages use.
const annotationsWithDiseaseKeyword = () => {
  const model = JSON.parse(JSON.stringify(precomputedMock));
  model.keywords = [
    ...(model.keywords ?? []),
    { id: 'KW-0225', name: 'Disease variant', category: 'Disease' },
  ];
  return uniProtKbConverter(
    precomputedToUniProtkbConverter(model),
    databaseInfoMaps
  );
};

describe('SubEntryKeywordsSection', () => {
  it('renders a precomputed keyword whose category has no dedicated section', () => {
    customRender(
      <SubEntryKeywordsSection annotations={annotationsWithDiseaseKeyword()} />
    );
    expect(
      screen.getByRole('heading', { name: 'Keywords & Gene Ontology' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Disease variant/)).toBeInTheDocument();
  });

  it('renders nothing when there is no keyword or GO content', () => {
    customRender(<SubEntryKeywordsSection />);
    expect(
      screen.queryByRole('heading', { name: 'Keywords & Gene Ontology' })
    ).toBeNull();
  });
});

describe('keywordsAndGOSectionHasContent', () => {
  it('is true when precomputed annotations carry a no-section keyword', () => {
    expect(
      keywordsAndGOSectionHasContent(undefined, annotationsWithDiseaseKeyword())
    ).toBe(true);
  });

  it('is false when there is neither UniFire nor fallback content', () => {
    expect(keywordsAndGOSectionHasContent(undefined, undefined)).toBe(false);
  });
});
