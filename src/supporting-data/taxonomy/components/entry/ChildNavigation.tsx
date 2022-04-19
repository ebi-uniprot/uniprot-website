import { Link } from 'react-router-dom';
import { Button } from 'franklin-sites';

import { pluralise } from '../../../../shared/utils/utils';
import {
  getEntryPath,
  LocationToPath,
  Location,
} from '../../../../app/config/urls';

import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import { Namespace } from '../../../../shared/types/namespaces';

import styles from './styles/child-navigation.module.css';

// Match the "ExpandableList" default count
export const CHILDREN_TO_DISPLAY = 5;

const ChildNavigation = ({
  taxonId,
  childTaxons,
  total,
}: {
  taxonId: number;
  childTaxons: TaxonomyAPIModel[];
  total: number;
}) => {
  const remainingChildren = total - CHILDREN_TO_DISPLAY;
  return (
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
          {remainingChildren > 0
            ? `${remainingChildren} more direct ${pluralise(
                'child',
                remainingChildren,
                'children'
              )}`
            : 'Browse all direct children'}
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
};

export default ChildNavigation;
