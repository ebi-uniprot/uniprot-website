import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import CommunityAnnotationLink from '../CommunityAnnotationLink';

describe('CommunityAnnotationLink', () => {
  it('should render with >0 number of submissions', () => {
    const { asFragment } = customRender(
      <CommunityAnnotationLink accession="P05067" count={3} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Community curated (3)')).toBeInTheDocument();
  });
  it('should render nothing with no submission', () => {
    customRender(<CommunityAnnotationLink accession="P05067" count={0} />);
    expect(screen.queryByText('Community curated')).not.toBeInTheDocument();
  });
});
