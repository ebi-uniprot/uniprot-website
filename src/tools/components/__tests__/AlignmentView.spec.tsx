import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import AlignmentView, { Tool, View } from '../AlignmentView';

import mockData from '../__mocks__/msaMocks.json';
import { resetUuidV1 } from '../../../../__mocks__/uuid';

describe('AlignmentView', () => {
  describe('BLAST', () => {
    let rendered, alignment;
    beforeEach(() => {
      resetUuidV1();
      alignment = mockData.BLAST;
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
      const annotationMenu = getByText('Select annotation');
      fireEvent.click(annotationMenu);
      const regionButton = getByText('Nucleotide-binding region');
      fireEvent.click(regionButton);
      const trackLabel = getByTestId('track-label');
      // Need to get the 2nd alignment data as that's the match track with
      // feature data
      expect(trackLabel.textContent).toBe(
        `${alignment[1].accession}:Nucleotide-binding region`
      );
    });
  });

  describe('Align', () => {
    let rendered, alignment;
    let handleSelectedEntries = jest.fn();
    beforeEach(() => {
      resetUuidV1();
      alignment = mockData.Align;
      rendered = renderWithRedux(
        <div className="main-content-and-footer">
          <AlignmentView
            alignment={alignment}
            alignmentLength={alignment[0].sequence.length}
            defaultView={View.overview}
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

    it('should update annotation on selection', () => {
      const { getByText, getByTestId } = rendered;
      const annotationMenu = getByText('Select annotation');
      fireEvent.click(annotationMenu);
      const regionButton = getByText('Nucleotide-binding region');
      fireEvent.click(regionButton);
      const trackLabel = getByTestId('track-label');
      expect(trackLabel.textContent).toBe(
        `${alignment[0].accession}:Nucleotide-binding region`
      );
    });
  });
});
