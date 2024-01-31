import { ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import {
  formatEvidenceContent,
  getEvidenceLink,
} from '../../config/evidenceUrls';

const EvidenceLink = ({
  source,
  value,
  url,
  className,
}: {
  source: string;
  value?: string;
  url?: string;
  className?: string;
}) => {
  if (!value) {
    return null;
  }

  const content = formatEvidenceContent(value, source);

  let renderedURL = url;
  let isInternal = false;

  if (!renderedURL) {
    const evidenceLink = getEvidenceLink(source, value);
    renderedURL = evidenceLink.url || undefined;
    isInternal = evidenceLink.isInternal;
  }

  if (!renderedURL) {
    return <>{content}</>;
  }

  return isInternal ? (
    // eslint-disable-next-line uniprot-website/use-config-location
    <Link to={renderedURL} className={className}>
      {content}
    </Link>
  ) : (
    <ExternalLink url={renderedURL} className={className}>
      {content}
    </ExternalLink>
  );
};

export default EvidenceLink;
