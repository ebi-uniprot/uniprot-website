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
    titleClassName="uniprot-grid-cell--span-12"
    noSidePadding
  >
    <div className="uniprot-grid-cell--span-3">
      <h2 className={styles['supporting-data__header']}>Supporting Data</h2>
    </div>
    <div className="uniprot-grid-cell--span-3">
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.TaxonomyResults)}>Taxonomy</Link>
      </DecoratedListItem>
    </div>
    <div className="uniprot-grid-cell--span-3">
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.LocationsResults)}>
          Subcellular locations
        </Link>
      </DecoratedListItem>
    </div>
    <div className="uniprot-grid-cell--span-3">
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.UniRuleResults)}>
          UniRule automatic annotation
        </Link>
      </DecoratedListItem>
    </div>
    <div
      className="uniprot-grid-cell--span-3"
      style={{ display: 'inline-flex' }}
    >
      <DecoratedListItem compact altStyle inline>
        <Link to={getNamespaceTo(Location.DiseasesResults)}>Diseases</Link>
      </DecoratedListItem>
      <DecoratedListItem compact altStyle inline>
        <Link to={getNamespaceTo(Location.KeywordsResults)}>Keywords</Link>
      </DecoratedListItem>
    </div>
    <div className="uniprot-grid-cell--span-3">
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.CitationsResults)}>
          Literature Citations
        </Link>
      </DecoratedListItem>
    </div>
    <div className="uniprot-grid-cell--span-3">
      <DecoratedListItem compact altStyle>
        <Link to={getNamespaceTo(Location.DatabaseResults)}>
          Cross-referenced databases
        </Link>
      </DecoratedListItem>
    </div>
    <div className="uniprot-grid-cell--span-3">
      <DecoratedListItem compact altStyle>
        {/* TODO: update link */}
        <Link to={getNamespaceTo(Location.ARBAResults)}>
          ARBA automatic annotation
        </Link>
      </DecoratedListItem>
    </div>
  </HeroContainer>
);

export default SupportingData;
