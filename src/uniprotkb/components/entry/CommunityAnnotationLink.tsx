import { FC } from 'react';
import { generatePath, Link } from 'react-router';
import { Method } from 'axios';
import { CommunityAnnotationIcon } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

// import externalUrls from '../../../shared/config/externalUrls';

import { Location, LocationToPath } from '../../../app/config/urls';
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
  // const url = externalUrls.CommunityCurationGetByAccession(accession);
  const url = `https://rest.uniprot.org/uniprotkb/${accession}/publications?facetFilter=%28types%3A%220%22%29`;
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
