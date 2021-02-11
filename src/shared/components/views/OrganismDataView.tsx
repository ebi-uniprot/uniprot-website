import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getEntryPath } from '../../../app/config/urls';
import { OrganismData } from '../../../uniprotkb/adapters/namesAndTaxonomyConverter';
import { Namespace } from '../../types/namespaces';

export const OrganismDataView: FC<{ organism: OrganismData }> = ({
  organism,
}) =>
  organism.taxonId ? (
    <Link to={getEntryPath(Namespace.taxonomy, organism.taxonId)}>
      {organism.scientificName}
      {organism.commonName && ` (${organism.commonName})`}
    </Link>
  ) : null;
