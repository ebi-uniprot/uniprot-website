import { screen } from '@testing-library/react';

import CommunityAnnotationLink from '../CommunityAnnotationLink';

import useDataApi from '../../../../shared/hooks/useDataApi';

import customRender from '../../../../shared/__test-helpers__/customRender';

jest.mock('../../../../shared/hooks/useDataApi');

describe('CommunityAnnotationLink', () => {
  it('should render with >0 number of submissions', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      headers: { 'x-total-results': 3 },
    });
    const { asFragment } = customRender(
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
    customRender(<CommunityAnnotationLink accession="P05067" />);
    expect(screen.queryByText('Community curation')).not.toBeInTheDocument();
  });
});
