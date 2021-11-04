import { FC } from 'react';
import { ExternalLink } from 'franklin-sites';

import externalUrls from '../../../shared/config/externalUrls';

import { GoXref } from '../../adapters/subcellularLocationConverter';

import styles from './styles/subcellular-location-go-view.module.scss';

export const getSwissBioPicLocationId = (id: string) => {
  // Get rid of leading 0s which is expected in SubCellViz
  const match = id.match(/GO:0*(\d+)/);
  return match?.[1] ? `GO${match?.[1]}` : undefined;
};

const SubcellularLocationGOView: FC<{
  goXrefs?: GoXref[];
  primaryAccession?: string;
}> = ({ goXrefs, primaryAccession }) => {
  if (!goXrefs?.length) {
    return null;
  }

  return (
    <>
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
      {primaryAccession && (
        <div className={styles['go-annotation-link']}>
          <hr />
          <ExternalLink url={externalUrls.QuickGOAnnotations(primaryAccession)}>
            Complete GO annotation on QuickGO
          </ExternalLink>
        </div>
      )}
    </>
  );
};

export default SubcellularLocationGOView;
