import { CommunityAnnotationIcon } from 'franklin-sites';
import { type FC } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import useCommunityCuratedCount from '../../hooks/useCommunityCuratedCount';
import { TabLocation } from '../../types/entry';
import { communityCuratedFacet } from '../../utils/CommunitySubmission';
import { facetsAsString } from '../../utils/resultsUtils';

type CommunityAnnotationLinkProps = {
  accession: string;
};

const CommunityAnnotationLink: FC<
  React.PropsWithChildren<CommunityAnnotationLinkProps>
> = ({ accession }) => {
  const { count } = useCommunityCuratedCount(accession);
  if (!count) {
    return null;
  }
  return (
    <Link
      to={{
        pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
          accession,
          subPage: TabLocation.Publications,
        }),
        search: `?facets=${facetsAsString([communityCuratedFacet])}`,
      }}
      className="button tertiary"
    >
      <CommunityAnnotationIcon /> {`Community curated (${count})`}
    </Link>
  );
};

export default CommunityAnnotationLink;
