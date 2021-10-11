import { ExternalLink } from 'franklin-sites';

import externalUrls from '../../../../shared/config/externalUrls';

import { Information } from '../../../shared/model';

const Source = ({ source }: { source?: Information['oldRuleNum'] }) => {
  if (!source) {
    return null;
  }
  if (source.startsWith('RU')) {
    return <div>Source ID: {source}</div>;
  }
  return (
    <div>
      Source Rule:{' '}
      <ExternalLink url={externalUrls.InterProSearch(source)}>
        {source}
      </ExternalLink>
    </div>
  );
};

export default Source;
