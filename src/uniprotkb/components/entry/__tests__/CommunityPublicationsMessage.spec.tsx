import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { CommunityCuratedCountsContext } from '../../../../shared/contexts/CommunityCuratedCounts';
import CommunityPublicationsMessage from '../CommunityPublicationsMessage';

// Both counts are fetched once by the entry and handed down through the context
const renderMessage = ({
  submitted = 0,
  indexed,
  accession = 'P05067',
  route,
}: {
  submitted?: number;
  indexed?: number;
  accession?: string;
  route?: string;
}) =>
  customRender(
    <CommunityCuratedCountsContext.Provider value={{ submitted, indexed }}>
      <CommunityPublicationsMessage accession={accession} />
    </CommunityCuratedCountsContext.Provider>,
    route ? { route } : undefined
  );

describe('CommunityPublicationsMessage', () => {
  it('should report the release missing the latest submissions', () => {
    const { asFragment } = renderMessage({ submitted: 12, indexed: 11 });
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
    renderMessage({ submitted: 1, indexed: 0, accession: 'Q9QZ05' });
    expect(
      screen.getByRole('link', {
        name: /View all community curated publications \(1\)/,
      })
    ).toBeInTheDocument();
  });

  it('should link back to the unfiltered publications', () => {
    renderMessage({
      submitted: 12,
      indexed: 0,
      accession: 'Q9QZ05',
      route: '/uniprotkb/Q9QZ05/publications?facets=types%3A0%2Ctypes%3A2',
    });
    expect(
      screen.getByRole('link', {
        name: 'View all current publications in this UniProt release',
      })
    ).toHaveAttribute('href', '/uniprotkb/Q9QZ05/publications');
  });

  it('should link to the submissions on their own when the counts match', () => {
    const { asFragment } = renderMessage({ submitted: 3, indexed: 3 });
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
    renderMessage({ submitted: 2, indexed: 3 });
    expect(
      screen.getByRole('link', {
        name: /View all community curated publications \(2\)/,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/This release of UniProt is missing the latest/)
    ).not.toBeInTheDocument();
  });

  // The counts are not guaranteed to be counting the same thing, so the way
  // through to the submissions themselves must not depend on them
  it('should still link to the submissions when PIR reports none', () => {
    renderMessage({ submitted: 0, indexed: 0 });
    expect(
      screen.getByRole('link', {
        name: 'View all community curated publications within the Community Bibliography Submissions website',
      })
    ).toBeInTheDocument();
  });

  // Claiming the release is behind before we know what it holds would compare
  // the submitted count against a zero it has not been given yet
  it('should link to the submissions until the entry has counted what this release holds', () => {
    renderMessage({ submitted: 12, indexed: undefined });
    expect(
      screen.getByRole('link', {
        name: /View all community curated publications \(12\)/,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/This release of UniProt is missing the latest/)
    ).not.toBeInTheDocument();
  });
});
