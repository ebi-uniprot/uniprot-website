import { Message } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import externalUrls from '../../../shared/config/externalUrls';
import { Namespace } from '../../../shared/types/namespaces';
import useCommunityCuratedCount, {
  useUniProtCommunityCuratedCount,
} from '../../hooks/useCommunityCuratedCount';
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
  const { count: submitted, loading: loadingSubmitted } =
    useCommunityCuratedCount(accession);
  const { count: indexed, loading: loadingIndexed } =
    useUniProtCommunityCuratedCount(accession);

  // Wait for both counts, otherwise the submitted one arriving first is briefly
  // compared against a count of zero and wrongly reported as out of sync.
  // Nothing submitted means there is nothing to link to either.
  if (loadingSubmitted || loadingIndexed || !submitted) {
    return null;
  }

  const submissionsLink = (
    <ExternalLink url={externalUrls.CommunityCuratedGetByAccession(accession)}>
      View all community curated publications ({submitted}) within the Community
      Bibliography Submissions website
    </ExternalLink>
  );

  if (submitted <= indexed) {
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
