import { render } from '@testing-library/react';

import AnnotationScoreDoughnutChart from '../AnnotationScoreDoughnutChart';

describe('AnnotationScoreDoughnutChart component', () => {
  test('should render', () => {
    const { asFragment } = render(<AnnotationScoreDoughnutChart score={3} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
