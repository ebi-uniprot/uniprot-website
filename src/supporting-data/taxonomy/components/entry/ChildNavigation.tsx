import { Link } from 'react-router-dom';
import { Button, LongNumber } from 'franklin-sites';

import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';

import { LocationToPath, Location } from '../../../../app/config/urls';

import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';

import styles from './styles/child-navigation.module.css';

type ChildNavigationProps = {
  taxonId: number;
  childTaxons: TaxonomyAPIModel[];
  total: number;
};

const ChildNavigation = ({
  taxonId,
  childTaxons,
  total,
}: ChildNavigationProps) => (
  <ul className="no-bullet">
    {childTaxons.map((child) => (
      <li key={child.taxonId}>
        <TaxonomyView data={child} />
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
