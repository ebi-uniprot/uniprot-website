import { CommunityAnnotationIcon } from 'franklin-sites';
import { generatePath, Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { TabLocation } from '../../types/entry';
import { communityCuratedFacet } from '../../utils/CommunitySubmission';
import { getLocationObjForParams } from '../../utils/resultsUtils';

type CommunityAnnotationLinkProps = {
  accession: string;
  /** Submissions held for the entry by PIR, counted once by the entry */
  count: number;
};

const CommunityAnnotationLink = ({
  accession,
  count,
}: CommunityAnnotationLinkProps) => {
  if (!count) {
    return null;
  }
  return (
    <Link
      to={getLocationObjForParams({
        pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
          accession,
          subPage: TabLocation.Publications,
        }),
        selectedFacets: [communityCuratedFacet],
      })}
      className="button tertiary"
    >
      <CommunityAnnotationIcon /> {`Community curated (${count})`}
    </Link>
  );
};

export default CommunityAnnotationLink;
