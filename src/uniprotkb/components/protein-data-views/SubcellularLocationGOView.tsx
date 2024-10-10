import { FC } from 'react';
import { LocationPinIcon } from 'franklin-sites';

import ExternalLink from '../../../shared/components/ExternalLink';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';

import externalUrls from '../../../shared/config/externalUrls';

import { GoXref } from '../../adapters/subcellularLocationConverter';

import styles from './styles/subcellular-location-go-view.module.scss';

export const getSwissBioPicLocationId = (id: string) => {
  // Get rid of leading 0s which is expected in SubCellViz
  const match = id.match(/GO:0*(\d+)/);
  return match?.[1] ? `GO${match?.[1]}` : undefined;
};

const SubcellularLocationGOView: FC<
  React.PropsWithChildren<{
    goXrefs?: GoXref[];
    primaryAccession?: string;
  }>
> = ({ goXrefs, primaryAccession }) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
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
            <LocationPinIcon
              className="sub-cell-viz__in-view-pin"
              height="1em"
            />
            <ExternalLink
              url={getUrlFromDatabaseInfo(databaseInfoMaps, 'GO', { id })}
            >
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
