import { FC } from 'react';
import { ExternalLink } from 'franklin-sites';

// import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import externalUrls from '../../../shared/config/externalUrls';
import { GoXref } from '../../adapters/subcellularLocationConverter';

const getSwissBioPicLocationId = (id: string) => {
  const [go, number] = id.split(':');
  // Casting to int to get rid of leading 0s
  return `${go}${+number}`;
};

const SubcellularLocationGOView: FC<{
  goXrefs?: GoXref[];
}> = ({ goXrefs }) => {
  if (!goXrefs?.length) {
    return null;
  }

  return (
    <ul className="no-bullet">
      {goXrefs.map(({ id, properties }) => (
        <li
          key={id}
          // used in the case that this component is used in conjunction
          // with @swissprot/swissbiopics-visualizer
          className={getSwissBioPicLocationId(id)}
        >
          <ExternalLink url={externalUrls.QuickGO(id)}>
            {properties.GoTerm}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
};

export default SubcellularLocationGOView;
