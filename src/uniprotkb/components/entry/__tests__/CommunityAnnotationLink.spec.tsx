import { screen, render } from '@testing-library/react';

import CommunityAnnotationLink from '../CommunityAnnotationLink';

import useDataApi from '../../../../shared/hooks/useDataApi';

jest.mock('../../../../shared/hooks/useDataApi');

describe('CommunityAnnotationLink', () => {
  it('should render with >0 number of submissions', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': 3 },
    });
    const { asFragment } = render(
      <CommunityAnnotationLink accession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Community curation (3)')).toBeInTheDocument();
  });
  it('should render nothing with no submission', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': 0 },
    });
    render(<CommunityAnnotationLink accession="P05067" />);
    expect(screen.queryByText('Community curation')).not.toBeInTheDocument();
  });
});
