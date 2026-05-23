import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import mockHumanData from '../../../__mocks__/uniProtKBEntryModelData';
import { type SubcellularLocationUIModel } from '../../../adapters/subcellularLocationConverter';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';
import EntrySection from '../../../types/entrySection';
import databaseInfoMaps from '../../../utils/__tests__/__mocks__/databaseInfoMaps';
import SubcellularLocationSection from '../SubcellularLocationSection';

describe('SubcellularLocationSection', () => {
  const transformed = uniProtKbConverter(mockHumanData, databaseInfoMaps);
  const data = transformed[
    EntrySection.SubCellularLocation
  ] as SubcellularLocationUIModel;
  const sequence = mockHumanData.sequence?.value;

  it('renders section content', () => {
    customRender(
      <SubcellularLocationSection data={data} sequence={sequence} />
    );
    expect(
      screen.getByRole('heading', { name: /subcellular location/i })
    ).toBeInTheDocument();
  });

  // Regression guard: a UniParc sub-entry passes enableExternalData={false} to
  // suppress the accession-keyed FeaturesView tools (full-view link, BLAST,
  // basket) that would produce dead links for a synthetic sub-entry accession.
  it('does not render the features full-view link when enableExternalData is false', () => {
    const { container } = customRender(
      <SubcellularLocationSection
        data={data}
        sequence={sequence}
        enableExternalData={false}
      />
    );
    // The full-view link rendered by FeaturesView includes /feature-viewer in
    // its href; with enableExternalData={false} it must not appear.
    const featureViewerLinks = container.querySelectorAll(
      'a[href*="feature-viewer"]'
    );
    expect(featureViewerLinks).toHaveLength(0);
  });
});
