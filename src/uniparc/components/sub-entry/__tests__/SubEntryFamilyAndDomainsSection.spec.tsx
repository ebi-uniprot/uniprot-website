import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import uniProtKbConverter, {
  type UniProtkbUIModel,
} from '../../../../uniprotkb/adapters/uniProtkbConverter';
import UniProtKBEntrySection from '../../../../uniprotkb/types/entrySection';
import databaseInfoMaps from '../../../../uniprotkb/utils/__tests__/__mocks__/databaseInfoMaps';
import uniParcLightEntryData from '../../../__mocks__/uniParcLightEntryModelData';
import precomputedMock from '../../../__mocks__/uniparcPrecomputedModelData';
import precomputedToUniProtkbConverter from '../../../adapters/precomputedToUniProtkbConverter';
import { type UniParcSubEntryUIModel } from '../../../adapters/uniParcSubEntryConverter';
import SubEntryFamilyAndDomainsSection from '../SubEntryFamilyAndDomainsSection';

const annotationsWithFamilyAndDomains = (): UniProtkbUIModel =>
  uniProtKbConverter(
    precomputedToUniProtkbConverter(precomputedMock),
    databaseInfoMaps
  );

// A minimal UniParcSubEntryUIModel with sequenceFeatures — mirrors how
// SubEntry.tsx assembles the data prop from the main UniParc entry.
const dataWithSequenceFeatures = (): UniParcSubEntryUIModel =>
  ({
    entry: {
      sequenceFeatures: uniParcLightEntryData.sequenceFeatures,
      sequence: { value: uniParcLightEntryData.sequence.value },
    },
    subEntry: {},
  }) as unknown as UniParcSubEntryUIModel;

const dataWithoutSequenceFeatures = (): UniParcSubEntryUIModel =>
  ({
    entry: { sequenceFeatures: [], sequence: { value: 'ACGT' } },
    subEntry: {},
  }) as unknown as UniParcSubEntryUIModel;

describe('SubEntryFamilyAndDomainsSection', () => {
  it('renders nothing when there are neither InterPro features nor annotations', () => {
    customRender(
      <SubEntryFamilyAndDomainsSection
        data={dataWithoutSequenceFeatures()}
        annotations={undefined}
      />
    );
    expect(
      screen.queryByRole('heading', { name: /Family & Domains/i })
    ).toBeNull();
  });

  it('renders the section heading when sequence features are present', () => {
    customRender(
      <SubEntryFamilyAndDomainsSection data={dataWithSequenceFeatures()} />
    );
    expect(
      screen.getByRole('heading', { name: /Family & Domains/i })
    ).toBeInTheDocument();
  });

  it('renders precomputed SIMILARITY comments', () => {
    const annotations = annotationsWithFamilyAndDomains();
    const familyAndDomains =
      annotations[UniProtKBEntrySection.FamilyAndDomains];
    // Only render if the precomputed mock actually has SIMILARITY data, otherwise
    // the test is vacuous — assert the mock has it.
    expect(familyAndDomains?.commentsData?.get('SIMILARITY')).toBeTruthy();

    customRender(
      <SubEntryFamilyAndDomainsSection
        data={dataWithoutSequenceFeatures()}
        annotations={annotations}
      />
    );
    // The SIMILARITY comment renders "Belongs to the <a>APP family</a>" —
    // text is split across nodes, so assert on the link rather than the whole sentence.
    expect(
      screen.getByRole('link', { name: /APP family/i })
    ).toBeInTheDocument();
  });

  it('renders when only annotations are present (no InterPro features)', () => {
    customRender(
      <SubEntryFamilyAndDomainsSection
        data={dataWithoutSequenceFeatures()}
        annotations={annotationsWithFamilyAndDomains()}
      />
    );
    expect(
      screen.getByRole('heading', { name: /Family & Domains/i })
    ).toBeInTheDocument();
  });

  it('renders nothing when data is undefined', () => {
    customRender(<SubEntryFamilyAndDomainsSection />);
    expect(
      screen.queryByRole('heading', { name: /Family & Domains/i })
    ).toBeNull();
  });
});
