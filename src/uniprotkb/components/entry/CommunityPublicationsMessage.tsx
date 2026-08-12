import { Message } from 'franklin-sites';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import externalUrls from '../../../shared/config/externalUrls';
import { CommunityCuratedCountsContext } from '../../../shared/contexts/CommunityCuratedCounts';
import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation } from '../../types/entry';

type CommunityPublicationsMessageProps = {
  accession: string;
};

/**
 * Point whoever is looking at the community publications of an entry at the
 * submissions held by PIR. Submissions made between releases are not yet part
 * of UniProt, so this release can hold fewer of them than have been submitted:
 * explain that whenever it is the case.
 */
const CommunityPublicationsMessage = ({
  accession,
}: CommunityPublicationsMessageProps) => {
  // Both counted once by the entry, so that toggling the facet this message is
  // rendered behind doesn't re-request them
  const { submitted, indexed } = useContext(CommunityCuratedCountsContext);

  /* Whoever is looking at the community publications of an entry always gets a
  way through to the submissions themselves, whatever the counts say or fail to
  say: they are the authority, and the two are not guaranteed to be counting
  the same thing. */
  const submissionsLink = (
    <ExternalLink url={externalUrls.CommunityCuratedGetByAccession(accession)}>
      View all community curated publications
      {submitted ? ` (${submitted})` : ''} within the Community Bibliography
      Submissions website
    </ExternalLink>
  );

  /* Only claim the release is behind once we know what it holds, otherwise the
  submitted count is compared against a zero we have not been given yet */
  if (indexed === undefined || submitted <= indexed) {
    return <Message level="info">{submissionsLink}</Message>;
  }

  return (
    <Message level="info">
      This release of UniProt is missing the latest community curated
      publications. This happens when new community submissions are made between
      releases. You can:
      <ul>
        <li>{submissionsLink}</li>
        {/* This release being behind is the case most likely to leave the user
        filtered down to nothing, with no facet to get back out of it, so offer
        a way back to the unfiltered list */}
        <li>
          <Link
            to={{
              pathname: getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.Publications
              ),
              search: '',
            }}
          >
            View all current publications in this UniProt release
          </Link>
        </li>
      </ul>
    </Message>
  );
};

export default CommunityPublicationsMessage;
