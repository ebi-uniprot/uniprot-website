import { FC } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

type Props = {
  organism: TaxonomyDatum;
  displayOnlyID?: boolean;
  className?: string;
};

const TaxonomyLightView: FC<Props> = ({
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

export default TaxonomyLightView;
