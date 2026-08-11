import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import CommunityPublicationsMessage from '../CommunityPublicationsMessage';

jest.mock('../../../../shared/hooks/useDataApi');

// The PIR count is a HEAD request to community.uniprot.org, the UniProt one a
// GET to our own API
const mockCounts = ({
  submitted,
  indexed,
}: {
  submitted?: number;
  indexed?: number;
}) => {
  (useDataApi as jest.Mock).mockImplementation((url: string) => ({
    loading: false,
    headers: {
      'x-total-results': url.includes('community.uniprot.org')
        ? submitted
        : indexed,
    },
  }));
};

describe('CommunityPublicationsMessage', () => {
  it('should report the release missing the latest submissions', () => {
    mockCounts({ submitted: 12, indexed: 11 });
    const { asFragment } = customRender(
      <CommunityPublicationsMessage accession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(
      screen.getByText(/This release of UniProt is missing the latest/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /View all community curated publications \(12\)/,
      })
    ).toHaveAttribute(
      'href',
      expect.stringContaining('bbsubinfo.html?accession=P05067')
    );
  });

  it('should report a release holding none of the submissions', () => {
    mockCounts({ submitted: 1, indexed: 0 });
    customRender(<CommunityPublicationsMessage accession="Q9QZ05" />);
    expect(
      screen.getByRole('link', {
        name: /View all community curated publications \(1\)/,
      })
    ).toBeInTheDocument();
  });

  it('should link back to the unfiltered publications', () => {
    mockCounts({ submitted: 12, indexed: 0 });
    customRender(<CommunityPublicationsMessage accession="Q9QZ05" />, {
      route: '/uniprotkb/Q9QZ05/publications?facets=types%3A0%2Ctypes%3A2',
    });
    expect(
      screen.getByRole('link', {
        name: 'View all current publications in this UniProt release',
      })
    ).toHaveAttribute('href', '/uniprotkb/Q9QZ05/publications');
  });

  it('should link to the submissions on their own when the counts match', () => {
    mockCounts({ submitted: 3, indexed: 3 });
    const { asFragment } = customRender(
      <CommunityPublicationsMessage accession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(
      screen.getByRole('link', {
        name: /View all community curated publications \(3\)/,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/This release of UniProt is missing the latest/)
    ).not.toBeInTheDocument();
  });

  // Claiming this release is missing publications it actually holds would be
  // wrong, so fall back to the plain link
  it('should link to the submissions on their own when the release holds more', () => {
    mockCounts({ submitted: 2, indexed: 3 });
    customRender(<CommunityPublicationsMessage accession="P05067" />);
    expect(
      screen.getByRole('link', {
        name: /View all community curated publications \(2\)/,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/This release of UniProt is missing the latest/)
    ).not.toBeInTheDocument();
  });

  it('should render nothing when there is nothing submitted to link to', () => {
    mockCounts({ submitted: 0, indexed: 0 });
    customRender(<CommunityPublicationsMessage accession="P05067" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render nothing until both counts have loaded', () => {
    (useDataApi as jest.Mock).mockImplementation((url: string) =>
      url.includes('community.uniprot.org')
        ? { loading: false, headers: { 'x-total-results': 12 } }
        : { loading: true }
    );
    customRender(<CommunityPublicationsMessage accession="P05067" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
