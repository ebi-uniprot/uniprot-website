import { FC } from 'react';
import { Method } from 'axios';
import { CommunityAnnotationIcon } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import externalUrls from '../../../shared/config/externalUrls';

const fetchOptions: { method: Method } = {
  method: 'HEAD',
};

type CommunityAnnotationLinkProps = {
  accession: string;
};

const CommunityAnnotationLink: FC<
  React.PropsWithChildren<CommunityAnnotationLinkProps>
> = ({ accession }) => {
  const url = externalUrls.CommunityCurationGet(accession);
  const { headers } = useDataApi(url, fetchOptions);
  const nSubmissions = +(headers?.['x-total-results'] || 0);
  if (!nSubmissions) {
    return null;
  }
  return (
    <a href={url} className="button tertiary" target="_blank" rel="noreferrer">
      <CommunityAnnotationIcon /> {`Community curation (${nSubmissions})`}
    </a>
  );
};

export default CommunityAnnotationLink;
