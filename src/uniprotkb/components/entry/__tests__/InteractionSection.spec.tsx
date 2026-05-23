import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import mockHumanData from '../../../__mocks__/uniProtKBEntryModelData';
import uniProtKbConverter from '../../../adapters/uniProtkbConverter';
import EntrySection from '../../../types/entrySection';
import databaseInfoMaps from '../../../utils/__tests__/__mocks__/databaseInfoMaps';
import InteractionSection from '../InteractionSection';
import data, { dataWithNoXref } from './__mocks__/interactionComplexesData';

describe('InteractionSection', () => {
  it('show the viewer tab if there are any xrefs from complex portal', async () => {
    const { asFragment } = customRender(
      <InteractionSection data={data} primaryAccession="P05067" />
    );
    await screen.findByText('Complex viewer');
    expect(asFragment()).toMatchSnapshot();
    const defaultOption = screen.getByRole<HTMLOptionElement>('option', {
      name: 'CPX-1062 Amyloid-beta protein 40/42 complex',
    });
    expect(defaultOption.selected).toBe(true);
  });

  it('Should not render the viewer tab if there are no xrefs from complex portal', async () => {
    customRender(
      <InteractionSection data={dataWithNoXref} primaryAccession="P05067" />
    );
    expect(screen.queryByText('Complex viewer')).toBeNull();
  });

  // Regression guard: a UniParc sub-entry passes enableExternalData={false} —
  // the IntAct `<interaction-viewer>` (which fetches by accession) must not be
  // rendered.
  it('does not render the IntAct viewer when enableExternalData is false', async () => {
    const transformed = uniProtKbConverter(mockHumanData, databaseInfoMaps);
    const { container } = customRender(
      <InteractionSection
        data={transformed[EntrySection.Interaction]}
        primaryAccession={transformed.primaryAccession}
        enableExternalData={false}
      />
    );
    await screen.findByRole('heading', { name: 'Binary interactions' });
    expect(container.querySelector('interaction-viewer')).toBeNull();
  });
});
