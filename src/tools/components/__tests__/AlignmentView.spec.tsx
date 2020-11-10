import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import AlignmentView, { Tool, View } from '../AlignmentView';

import mockData from '../__mocks__/msaMocks.json';
import { resetUuidV1 } from '../../../../__mocks__/uuid';

describe('AlignmentView', () => {
  describe('BLAST', () => {
    let rendered;
    beforeEach(() => {
      resetUuidV1();
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

    it('should render', () => {
      const { asFragment } = rendered;
      expect(asFragment()).toMatchSnapshot();
    });

    it('should update annotation on selection', () => {
      const { getByText, getByTestId } = rendered;
      const regionButton = getByText('Nucleotide-binding region');
      fireEvent.click(regionButton);
      const trackLabel = getByTestId('track-label');
      expect(trackLabel.textContent).toBe('Nucleotide-binding region');
    });
  });

  describe('Align', () => {
    let rendered;
    let handleSelectedEntries = jest.fn();
    beforeEach(() => {
      resetUuidV1();
      const alignment = mockData.Align;
      console.log(alignment[0]);
      rendered = renderWithRedux(
        <div className="main-content-and-footer">
          <AlignmentView
            alignment={alignment}
            alignmentLength={alignment[0].sequence.length}
            defaultView={View.wrapped}
            tool={Tool.align}
            selectedEntries={[]}
            handleSelectedEntries={handleSelectedEntries}
          />
        </div>
      );
    });

    it('should render', () => {
      const { asFragment } = rendered;
      expect(asFragment()).toMatchSnapshot();
    });

    // it('should update annotation on selection', () => {
    //   const { getByText, getByTestId } = rendered;
    //   const regionButton = getByText('Nucleotide-binding region');
    //   fireEvent.click(regionButton);
    //   const trackLabel = getByTestId('track-label');
    //   expect(trackLabel.textContent).toBe('Nucleotide-binding region');
    // });
  });
});
