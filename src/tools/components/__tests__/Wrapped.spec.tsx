import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import Wrapped from '../Wrapped';
import { BLAST as mockData } from '../__mocks__/msaMocks.json';
import { getFullAlignmentLength } from '../../utils/sequences';
describe('Wrapped', () => {
  describe('BLAST', () => {
    let props;
    beforeEach(() => {
      props = {
        alignment: mockData,
        alignmentLength: mockData[0].length,
        conservationOptions: {},
        totalLength: getFullAlignmentLength(mockData, mockData[0].length),
        onMSAFeatureClick: jest.fn(),
        activeAnnotation: [],
        // activeAlignment={activeAlignment
        // highlightProperty={highlightProperty
        // annotation={annotation
        // activeId={mockData[1].accession
        // selectedMSAFeatures={selectedMSAFeatures
      };
    });

    it('should render', () => {
      const { asFragment } = renderWithRedux(<Wrapped {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with active sequence', () => {
      const { asFragment } = renderWithRedux(
        <Wrapped {...props} activeId={mockData[1].accession} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
