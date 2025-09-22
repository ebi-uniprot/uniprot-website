import cn from 'classnames';
import { LongNumber } from 'franklin-sites';
import { Link } from 'react-router';

import { Location, LocationToPath } from '../../../../app/config/urls';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
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
      <Link
        to={{
          pathname: LocationToPath[Location.TaxonomyResults],
          search: `query=parent:${taxonId}`,
        }}
        className={cn('button', 'tertiary', styles['no-margin'])}
      >
        Browse all direct children (<LongNumber>{total}</LongNumber>)
      </Link>
    </li>
    <li>
      <Link
        to={{
          pathname: LocationToPath[Location.TaxonomyResults],
          search: `query=ancestor:${taxonId}`,
        }}
        className="button tertiary"
      >
        Browse all descendants
      </Link>
    </li>
  </ul>
);

export default ChildNavigation;
