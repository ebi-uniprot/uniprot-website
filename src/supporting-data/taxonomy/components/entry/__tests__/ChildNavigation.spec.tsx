import { screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import taxonomyData from '../../../__mocks__/taxonomyModelData';
import ChildNavigation from '../ChildNavigation';

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

  it('should render, lots', () => {
    const { asFragment } = customRender(
      <ChildNavigation
        taxonId={9606}
        childTaxons={Array.from({ length: 5 }, (_, i) => ({
          ...taxonomyData[i % 2],
          // Start at 2, 0 doesn't exist and 1 is the root special case
          taxonId: i + 2,
        }))}
        total={10}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getAllByRole('link')).toHaveLength(7);
  });
});
