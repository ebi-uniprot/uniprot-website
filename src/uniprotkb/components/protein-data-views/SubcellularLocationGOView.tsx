import { FC } from 'react';
import { ExternalLink } from 'franklin-sites';

// import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import externalUrls from '../../../shared/config/externalUrls';
import { GoXref } from '../../adapters/subcellularLocationConverter';

export const getSwissBioPicLocationId = (id: string) => {
  // Casting to int to get rid of leading 0s which is expected in SubCellViz
  const match = id.match(/GO:0*(\d+)/);
  return match?.[1] ? `GO${match?.[1]}` : undefined;
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
