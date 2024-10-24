import customRender from '../../../shared/__test-helpers__/customRender';

import AlignmentOverview from '../AlignmentOverview';

import mockData from '../__mocks__/featureShapesMocks';

describe('AlignmentOverview', () => {
  describe('BLAST', () => {
    let rendered: ReturnType<typeof customRender>;
    beforeEach(() => {
      rendered = customRender(
        <AlignmentOverview
          data={mockData.data}
          trackHeight={10}
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
      const { asFragment } = customRender(
        <AlignmentOverview
          data={[]}
          trackHeight={10}
          length={mockData.length}
          highlight={mockData.highlight}
        />
      );
      expect(asFragment().textContent).toEqual('');
    });
  });
});
