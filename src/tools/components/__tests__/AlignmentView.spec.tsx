import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';

import AlignmentView, { Tool, View } from '../AlignmentView';
import { MSAInput } from '../../types/alignment';

import mockData from '../__mocks__/msaMocks.json';

describe('AlignmentView', () => {
  describe('BLAST', () => {
    let rendered: ReturnType<typeof customRender>;
    let alignment: MSAInput[];
    beforeEach(() => {
      alignment = mockData.BLAST as MSAInput[];
      rendered = customRender(
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
      const annotationMenu = screen.getByText('Select annotation');
      fireEvent.click(annotationMenu);
      const regionButton = screen.getByText('Nucleotide binding');
      fireEvent.click(regionButton);
      const trackLabel = screen.getByTestId('track-label');
      // Need to get the 2nd alignment data as that's the match track with
      // feature data
      expect(trackLabel.textContent).toBe(
        `${alignment[1].accession}:Nucleotide binding`
      );
    });
  });

  describe('Align', () => {
    let rendered: ReturnType<typeof customRender>;
    let alignment: MSAInput[];
    const handleEntrySelection = jest.fn();
    beforeEach(() => {
      alignment = mockData.Align as MSAInput[];
      rendered = customRender(
        <div className="main-content-and-footer">
          <AlignmentView
            alignment={alignment}
            alignmentLength={alignment[0].sequence.length}
            defaultView={View.overview}
            tool={Tool.align}
            selectedEntries={[]}
            handleEntrySelection={handleEntrySelection}
          />
        </div>
      );
    });

    it('should render', () => {
      const { asFragment } = rendered;
      expect(asFragment()).toMatchSnapshot();
    });

    it('should update annotation on selection', () => {
      const annotationMenu = screen.getByText('Select annotation');
      fireEvent.click(annotationMenu);
      const regionButton = screen.getByText('Nucleotide binding');
      fireEvent.click(regionButton);
      const trackLabel = screen.getByTestId('track-label');
      expect(trackLabel.textContent).toBe(
        `${alignment[0].accession}:Nucleotide binding`
      );
    });
  });
});
