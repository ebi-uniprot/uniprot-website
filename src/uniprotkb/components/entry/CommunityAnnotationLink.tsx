import { Method } from 'axios';
import { CommunityAnnotationIcon } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import externalUrls from '../../../shared/config/externalUrls';

const fetchOptions: { method: Method } = {
  method: 'HEAD',
};

const CommunityAnnotationLink = ({ accession }: { accession: string }) => {
  const url = externalUrls.CommunityCurationGet(accession);
  const { headers } = useDataApi(url, fetchOptions);
  const nSubmissions = +(headers?.['x-total-results'] || 0);
  return (
    !!nSubmissions && (
      <a
        href={url}
        className="button tertiary"
        target="_blank"
        rel="noreferrer"
      >
        <CommunityAnnotationIcon /> {`Community curation (${nSubmissions})`}
      </a>
    )
  );
};

export default CommunityAnnotationLink;
