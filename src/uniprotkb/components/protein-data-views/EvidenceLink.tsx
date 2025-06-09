import { ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { stringifyQuery } from '../../../shared/utils/url';
import {
  formatEvidenceContent,
  getEvidenceLink,
} from '../../config/evidenceUrls';

type Props = {
  source: string;
  value?: string;
  url?: string;
  isSimilar?: boolean;
  className?: string;
};

const EvidenceLink = ({ source, value, url, isSimilar, className }: Props) => {
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
    return (
      <>
        {isSimilar ? 'Similar to ' : ''}
        {content}
      </>
    );
  }

  const link = isInternal ? (
    <Link to={renderedURL} className={className}>
      {content}
    </Link>
  ) : (
    <ExternalLink url={renderedURL} className={className}>
      {content}
    </ExternalLink>
  );

  const alignLink =
    source === 'UniProtKB' ? (
      <>
        <br />
        <Link
          to={{
            pathname: LocationToPath[Location.Align],
            search: stringifyQuery({ ids: 'P05067' }),
          }}
        >
          Align both entries
        </Link>
      </>
    ) : null;

  return (
    <>
      {isSimilar ? 'Similar to ' : ''}
      {link}
      {alignLink}
    </>
  );
};

export default EvidenceLink;
