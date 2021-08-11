import { FC } from 'react';
import { ExternalLink } from 'franklin-sites';

// import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import externalUrls from '../../../shared/config/externalUrls';
import { GoXref } from '../../adapters/subcellularLocationConverter';

const getSwissBioPicLocationId = (id: string) => id.replace(':', '');

const SubcellularLocationGOView: FC<{
  goXrefs: GoXref[];
}> = ({ goXrefs }) => {
  if (!goXrefs?.length) {
    return null;
  }
  return (
    <>
      {goXrefs.map(({ id, properties }) => (
        <div key={id}>
          <ExternalLink
            // id is used in the case that this component is used in conjunction
            // with @swissprot/swissbiopics-visualizer
            className={getSwissBioPicLocationId(id)}
            url={externalUrls.QuickGO(id)}
          >
            {properties.GoTerm}
          </ExternalLink>
        </div>
      ))}
    </>
  );
};

export default SubcellularLocationGOView;
