import ExternalLink from '../../../../shared/components/ExternalLink';

import externalUrls from '../../../../shared/config/externalUrls';

import { Information } from '../../../shared/model';

const Source = ({ source }: { source?: Information['oldRuleNum'] }) => {
  if (!source) {
    return null;
  }
  if (source.startsWith('RU')) {
    return <div>Source ID: {source}</div>;
  }
  let url = externalUrls.InterProSearch(source);
  if (source.startsWith('PRU')) {
    url = externalUrls.ProRule(source);
  } else if (source.startsWith('MF')) {
    url = externalUrls.HAMAPRule(source);
  }

  return (
    <div>
      Source Rule: <ExternalLink url={url}>{source}</ExternalLink>
    </div>
  );
};

export default Source;
