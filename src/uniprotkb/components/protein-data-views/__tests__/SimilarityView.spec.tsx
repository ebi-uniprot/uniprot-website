import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import SimilarityView from '../SimilarityView';

describe('SimilarityView component', () => {
  test('should render', () => {
    const { asFragment } = customRender(
      <SimilarityView>
        In the N-terminal section; belongs to the GARS family.
      </SimilarityView>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should link', () => {
    customRender(
      <SimilarityView>
        Belongs to the potassium channel family. A (Shaker) (TC 1.A.1.2)
        subfamily. Kv1.2/KCNA2 sub-subfamily
      </SimilarityView>
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links[0].textContent).toEqual('potassium channel family');
    expect(links[1].href).toContain(
      '?query=(family:%22potassium%20channel%20family%20A%20(Shaker)%20(TC%201.A.1.2)%20subfamily%22)'
    );
    expect(links[2].href).toContain(
      '?query=(family:%22potassium%20channel%20family%20A%20(Shaker)%20(TC%201.A.1.2)%20subfamily%20Kv1.2/KCNA2%20sub-subfamily%22)'
    );
  });
});
