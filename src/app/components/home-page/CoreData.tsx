import { Tile, SwissProtIcon, TremblIcon } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import { Location, LocationToPath } from '../../config/urls';

import styles from './styles/non-critical.module.scss';

import UniProtKBIllustration from '../../../images/uniprotkb_illustration.svg';
import SpeciesIllustration from '../../../images/species_illustration.svg';
import ClusterIllustration from '../../../images/cluster_illustration.svg';
import ArchiveIllustration from '../../../images/archive_illustration.svg';

const getNamespaceTo = (location: Location) => ({
  pathname: LocationToPath[location],
  search: `query=*`,
});

const CoreData = () => (
  <section
    className={cn(
      'uniprot-grid',
      'uniprot-grid--centered',
      styles['home-page-section']
    )}
  >
    <h2 className="visually-hidden">UniProt core data</h2>
    <Tile
      title="Proteins"
      className="uniprot-grid-cell--span-3"
      subtitle="UniProt Knowledgebase"
      backgroundImage={<UniProtKBIllustration />}
      backgroundColor={colors.seaBlue}
      to={getNamespaceTo(Location.UniProtKBResults)}
      gradient
    >
      <span className={styles['core-data']}>
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `facets=reviewed:true&query=*`,
          }}
        >
          <SwissProtIcon width="2.5em" />
          <div className={styles['core-data__status']}>Reviewed</div>
          <small>Swiss-Prot</small>
        </Link>
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `facets=reviewed:false&query=*`,
          }}
        >
          <TremblIcon width="2.5em" />
          <div className={styles['core-data__status']}>Unreviewed</div>
          <small>TrEMBL</small>
        </Link>
      </span>
    </Tile>
    <Tile
      title="Species"
      className="uniprot-grid-cell--span-3"
      subtitle="Proteomes"
      backgroundImage={<SpeciesIllustration />}
      backgroundColor={colors.proteomes}
      to={getNamespaceTo(Location.ProteomesResults)}
      gradient
    >
      Protein sets for species with sequenced genomes from across the tree of
      life
    </Tile>
    <Tile
      title="Protein Clusters"
      className="uniprot-grid-cell--span-3"
      subtitle="UniRef"
      backgroundImage={<ClusterIllustration />}
      backgroundColor={colors.uniref}
      to={getNamespaceTo(Location.UniRefResults)}
      gradient
    >
      Clusters of protein sequences at 100%, 90% &amp; 50% identity
    </Tile>
    <Tile
      title="Sequence Archive"
      className="uniprot-grid-cell--span-3"
      subtitle="UniParc"
      backgroundImage={<ArchiveIllustration />}
      backgroundColor={colors.uniparc}
      to={getNamespaceTo(Location.UniParcResults)}
      gradient
    >
      Non-redundant archive of publicly available protein sequences seen across
      different databases
    </Tile>
  </section>
);

export default CoreData;
