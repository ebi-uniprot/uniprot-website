import { fireEvent, screen } from '@testing-library/react';
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

    const dropdownButton = screen.getByRole<HTMLButtonElement>('button');
    expect(dropdownButton).toHaveTextContent(
      'CPX-1062 Amyloid-beta protein 40/42 complex'
    );
    fireEvent.click(dropdownButton);
    const selectButton = screen.getByText(/CPX-1069/, {
      selector: '.button.tertiary',
    });
    fireEvent.click(selectButton, { target: { innerText: 'CPX-1069' } });
    expect(dropdownButton).toHaveTextContent(
      'CPX-1069 Amyloid-beta protein 40 complex'
    );
  });

  it('Should not render the viewer tab if there are no xrefs from complex portal', async () => {
    customRender(
      <InteractionSection data={dataWithNoXref} primaryAccession="P05067" />
    );
    expect(screen.queryByText('Complex viewer')).toBeNull();
  });
});
