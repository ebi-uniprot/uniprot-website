import React from 'react';
import { render } from '@testing-library/react';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import AlignmentView, { Tool, View } from '../AlignmentView';

import mockData from '../__mocks__/msaMocks.json';

describe('AlignmentView', () => {
  describe('BLAST', () => {
    let rendered;
    beforeEach(() => {
      const alignment = mockData.BLAST;
      rendered = renderWithRedux(
        <div className="main-content-and-footer">
          <AlignmentView
            alignment={alignment}
            alignmentLength={alignment[0].length}
            defaultView={View.overview}
            tool={Tool.blast}
          />
        </div>
      );
    });

    test('should render', () => {
      const { asFragment } = rendered;
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
