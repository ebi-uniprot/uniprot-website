import { HeroContainer, DecoratedListItem } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Location, LocationToPath } from '../../config/urls';

import styles from './styles/non-critical.module.scss';

const getNamespaceTo = (location: Location) => ({
  pathname: LocationToPath[location],
  search: `query=*`,
});

const SupportingData = () => (
  <HeroContainer
    className={cn(
      'uniprot-grid',
      'uniprot-grid--centered',
      'uniprot-grid--with-bleed',
      styles['home-page-section']
    )}
    headingClassName="uniprot-grid-cell--span-12"
    noSidePadding
  >
    <div
      className={cn(
        'uniprot-grid-cell--small-span-4',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <h2 className={styles['supporting-data__header']}>Supporting Data</h2>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--small-span-4',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.TaxonomyResults)}>Taxonomy</Link>
      </DecoratedListItem>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--small-span-4',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <DecoratedListItem compact altStyle inline>
        <Link to={getNamespaceTo(Location.KeywordsResults)}>Keywords</Link>
      </DecoratedListItem>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--small-span-4',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.CitationsResults)}>
          Literature Citations
        </Link>
      </DecoratedListItem>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--small-span-4',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <DecoratedListItem compact altStyle inline>
        <Link to={getNamespaceTo(Location.DiseasesResults)}>
          Human diseases
        </Link>
      </DecoratedListItem>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--small-span-4',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.DatabaseResults)}>
          Cross-referenced databases
        </Link>
      </DecoratedListItem>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--small-span-4',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.LocationsResults)}>
          Subcellular locations
        </Link>
      </DecoratedListItem>
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--small-span-6',
        'uniprot-grid-cell--medium-span-3'
      )}
    >
      <DecoratedListItem compact altStyle>
        Automatic annotations:{' '}
        <Link to={getNamespaceTo(Location.UniRuleResults)}>UniRule</Link>
        {' & '}
        <Link to={getNamespaceTo(Location.ARBAResults)}>ARBA</Link>
      </DecoratedListItem>
    </div>
  </HeroContainer>
);

export default SupportingData;
