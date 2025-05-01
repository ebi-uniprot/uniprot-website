import { Method } from 'axios';
import { CommunityAnnotationIcon } from 'franklin-sites';
import { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { TabLocation } from '../../types/entry';

const fetchOptions: { method: Method } = {
  method: 'HEAD',
};

type CommunityAnnotationLinkProps = {
  accession: string;
};

const CommunityAnnotationLink: FC<
  React.PropsWithChildren<CommunityAnnotationLinkProps>
> = ({ accession }) => {
  const url = externalUrls.CommunityCurationGetByAccession(accession);
  const { headers } = useDataApi(url, fetchOptions);
  const nSubmissions = +(headers?.['x-total-results'] || 0);
  if (!nSubmissions) {
    return null;
  }
  return (
    <Link
      to={{
        pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
          accession,
          subPage: TabLocation.Publications,
        }),
        search: '?facets=types:0',
      }}
      className="button tertiary"
    >
      <CommunityAnnotationIcon /> {`Community curation (${nSubmissions})`}
    </Link>
  );
};

export default CommunityAnnotationLink;
