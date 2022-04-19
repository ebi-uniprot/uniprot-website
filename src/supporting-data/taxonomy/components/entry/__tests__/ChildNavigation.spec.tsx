import { screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import ChildNavigation from '../ChildNavigation';

import taxonomyData from '../../../__mocks__/taxonomyModelData';

describe('ChildNavigation', () => {
  it('should render, one', () => {
    const { asFragment } = customRender(
      <ChildNavigation
        taxonId={9606}
        childTaxons={[taxonomyData[0]]}
        total={1}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('should render, many', () => {
    const { asFragment } = customRender(
      <ChildNavigation
        taxonId={9606}
        childTaxons={Array.from({ length: 5 }, (_, i) => ({
          ...taxonomyData[i % 2],
          taxonId: i,
        }))}
        total={5}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getAllByRole('link')).toHaveLength(7);
  });

  it('should render, lots', () => {
    const { asFragment } = customRender(
      <ChildNavigation
        taxonId={9606}
        childTaxons={Array.from({ length: 5 }, (_, i) => ({
          ...taxonomyData[i % 2],
          taxonId: i,
        }))}
        total={10}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getAllByRole('link')).toHaveLength(7);
  });
});
