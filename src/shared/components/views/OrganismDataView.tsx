import { FC } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { OrganismData } from '../../../uniprotkb/adapters/namesAndTaxonomyConverter';

type Props = {
  organism: OrganismData;
  displayOnlyID?: boolean;
  className?: string;
  noLink?: boolean;
};

const OrganismDataView: FC<Props> = ({
  organism,
  displayOnlyID,
  className,
  noLink = false,
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
  const text = displayOnlyID ? taxonId : name || taxonId;
  return noLink ? (
    <>{text}</>
  ) : (
    <Link
      to={getEntryPath(Namespace.taxonomy, taxonId)}
      title={`${name ? `${name}, ` : ''}taxon ID ${taxonId}`}
      className={className}
    >
      {text}
    </Link>
  );
};

export default OrganismDataView;
