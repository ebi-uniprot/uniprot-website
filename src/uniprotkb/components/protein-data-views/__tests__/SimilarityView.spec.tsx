import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import SimilarityView from '../SimilarityView';

describe('SimilarityView component', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <SimilarityView>
        In the N-terminal section; belongs to the GARS family.
      </SimilarityView>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should link', () => {
    customRender(
      <SimilarityView>
        Belongs to the potassium channel family. A (Shaker) (TC 1.A.1.2)
        subfamily. Kv1.2/KCNA2 sub-subfamily
      </SimilarityView>
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links[0].textContent).toEqual('potassium channel family');
    expect(links[1].href).toContain(
      '?query=%28family%3A%22potassium+channel+family+A+%28Shaker%29+%28TC+1.A.1.2%29+subfamily%22%29'
    );
    expect(links[2].href).toContain(
      '?query=%28family%3A%22potassium+channel+family+A+%28Shaker%29+%28TC+1.A.1.2%29+subfamily+Kv1.2%2FKCNA2+sub-subfamily%22%29'
    );
  });

  it('should link only the family name not the whole string', () => {
    customRender(
      <SimilarityView>
        Belongs to the OXA1/ALB3/YidC (TC 2.A.9.2) family
      </SimilarityView>
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links[0].textContent).toEqual(' OXA1/ALB3/YidC (TC 2.A.9.2) family');
  });
});

it('should link the whole familt heirarchy from superfamilies to subfamilies', () => {
  customRender(
    <SimilarityView>
      Belongs to the protein kinase superfamily. Tyr protein kinase family.
      Insulin receptor subfamily
    </SimilarityView>
  );
  const links: HTMLAnchorElement[] = screen.getAllByRole('link');
  expect(links[0].textContent).toEqual('protein kinase superfamily');
  expect(links[1].href).toContain(
    '?query=%28family%3A%22protein+kinase+superfamily+Tyr+protein+kinase+family%22%29'
  );
  expect(links[2].href).toContain(
    '?query=%28family%3A%22protein+kinase+superfamily+Tyr+protein+kinase+family+Insulin+receptor+subfamily%22%29'
  );
});
