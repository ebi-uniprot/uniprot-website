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

    const complexIdButton = screen.getByRole<HTMLButtonElement>('button', {
      name: 'CPX-1069',
    });
    expect(complexIdButton).toHaveClass('secondary');
    fireEvent.click(complexIdButton, { target: { innerText: 'CPX-1069' } });
    expect(complexIdButton).toHaveClass('primary');
  });

  it('Should not render the viewer tab if there are no xrefs from complex portal', async () => {
    customRender(
      <InteractionSection data={dataWithNoXref} primaryAccession="P05067" />
    );
    expect(screen.queryByText('Complex viewer')).toBeNull();
  });
});
