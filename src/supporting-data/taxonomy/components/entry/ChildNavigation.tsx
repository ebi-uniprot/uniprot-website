import { Link } from 'react-router-dom';
import { Button, LongNumber } from 'franklin-sites';

import {
  getEntryPath,
  LocationToPath,
  Location,
} from '../../../../app/config/urls';

import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import { Namespace } from '../../../../shared/types/namespaces';

import styles from './styles/child-navigation.module.css';

const ChildNavigation = ({
  taxonId,
  childTaxons,
  total,
}: {
  taxonId: number;
  childTaxons: TaxonomyAPIModel[];
  total: number;
}) => (
  <ul className="no-bullet">
    {childTaxons.map((child) => (
      <li key={child.taxonId}>
        <Link to={getEntryPath(Namespace.taxonomy, child.taxonId)}>
          {child.commonName || child.scientificName || child.taxonId}
        </Link>
      </li>
    ))}
    <li>
      <Button
        to={{
          pathname: LocationToPath[Location.TaxonomyResults],
          search: `query=parent:${taxonId}`,
        }}
        element={Link}
        variant="tertiary"
        className={styles['no-margin']}
      >
        Browse all direct children (<LongNumber>{total}</LongNumber>)
      </Button>
    </li>
    <li>
      <Button
        to={{
          pathname: LocationToPath[Location.TaxonomyResults],
          search: `query=ancestor:${taxonId}`,
        }}
        element={Link}
        variant="tertiary"
      >
        Browse all descendants
      </Button>
    </li>
  </ul>
);

export default ChildNavigation;
