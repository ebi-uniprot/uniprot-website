import { FC } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { OrganismData } from '../../../uniprotkb/adapters/namesAndTaxonomyConverter';

type Props = {
  organism: OrganismData;
  displayOnlyID?: boolean;
  className?: string;
};

export const OrganismDataView: FC<Props> = ({
  organism,
  displayOnlyID,
  className,
}) => {
  if (!organism.taxonId) {
    // eslint-disable-next-line no-console
    console.warn("No taxon ID, this shouldn't happen", organism);
    return null;
  }
  const { scientificName, commonName, taxonId } = organism;
  let name;
  if (scientificName) {
    name = scientificName;
    if (commonName) {
      name += ` (${commonName})`;
    }
  } else if (commonName) {
    name = commonName;
  }
  return (
    <Link
      to={getEntryPath(Namespace.taxonomy, taxonId)}
      title={`${name ? `${name}, ` : ''}taxon ID ${taxonId}`}
      className={className}
    >
      {displayOnlyID ? taxonId : name || taxonId}
    </Link>
  );
};
