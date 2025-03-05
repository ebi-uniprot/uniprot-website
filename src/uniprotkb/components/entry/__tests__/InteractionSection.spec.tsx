import { screen } from '@testing-library/react';
import InteractionSection from '../InteractionSection';
import customRender from '../../../../shared/__test-helpers__/customRender';

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
});
