import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import AlignmentOverview from '../AlignmentOverview';

import { BLAST as mockData } from '../__mocks__/featureShapesMocks.json';

describe('AlignmentOverview', () => {
  describe('BLAST', () => {
    let rendered;
    beforeEach(() => {
      rendered = renderWithRedux(
        <AlignmentOverview
          data={mockData.data}
          height="10"
          length={mockData.length}
          highlight={mockData.highlight}
        />
      );
    });

    it('should render', () => {
      const { asFragment } = rendered;
      expect(asFragment()).toMatchSnapshot();
    });

    it('should not render when data is missing from the props', () => {
      const { asFragment } = renderWithRedux(
        <AlignmentOverview
          data={[]}
          height="10"
          length={mockData.length}
          highlight={mockData.highlight}
        />
      );
      expect(asFragment().textContent).toEqual('');
    });
  });
});
