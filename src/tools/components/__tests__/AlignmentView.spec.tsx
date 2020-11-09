import React from 'react';
import { render } from '@testing-library/react';

import AlignmentView, { Tool, View } from '../AlignmentView';

import mockData from '../__mocks__/msaMocks.json';

describe('AlignmentView', () => {
  describe('BLAST', () => {
    let rendered;
    beforeEach(() => {
      const alignment = mockData.BLAST;
      rendered = render(
        <AlignmentView
          alignment={alignment}
          alignmentLength={alignment[0].length}
          defaultView={View.overview}
          tool={Tool.blast}
        />
      );
    });

    test('should render', () => {
      const { asFragment } = rendered;
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
