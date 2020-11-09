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

    it('should show toolip on feature click', () => {
      const { container, getByText } = rendered;
      //   const feature = container.getElementByClassname('feature-group');
      const track = container.querySelector('protvista-track');
      console.log(track);
      fireEvent.change(
        window,
        new CustomEvent('change', {
          detail: {
            eventtype: 'click',
            feature: {
              protvistaFeatureId: '7690a030-22a5-11eb-bbcb-e18b38a7b17f',
            },
            coords: [357, 933],
          },
        })
      );
      const tooltip = container.querySelector('protvista-tooltip');
      console.log(tooltip);
      console.log(tooltip.textContent);
      expect(tooltip).toBeTruthy();
      //   fireEvent.click(feature);
      //   expect(getByText('Other domain of interest 75-226')).toBeTruthy();
    });
  });
});
