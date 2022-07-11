import { Tile, SwissProtIcon, TremblIcon, LongNumber } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import useDataApi from '../../../shared/hooks/useDataApi';

import { getAPIQueryUrl } from '../../../shared/config/apiUrls';

import { Location, LocationToPath } from '../../config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';

import styles from './styles/non-critical.module.scss';

import UniProtKBIllustration from '../../../images/uniprotkb_illustration.img.svg';
import SpeciesIllustration from '../../../images/species_illustration.img.svg';
import ClusterIllustration from '../../../images/cluster_illustration.img.svg';
import ArchiveIllustration from '../../../images/archive_illustration.img.svg';

const getNamespaceTo = (location: Location) => ({
  pathname: LocationToPath[location],
  search: 'query=*',
});

const UniProtKBLinks = () => {
  const { data } = useDataApi<SearchResults<never>>(
    getAPIQueryUrl({
      namespace: Namespace.uniprotkb,
      query: '*',
      size: 0,
      facets: ['reviewed'],
    })
  );

  let numberReviewed: undefined | number;
  let numberUnreviewed: undefined | number;

  if (data?.facets?.[0].values?.length) {
    numberReviewed = data?.facets?.[0].values.find(
      (value) => value.value === 'true'
    )?.count;
    numberUnreviewed = data?.facets?.[0].values.find(
      (value) => value.value === 'false'
    )?.count;
  }

  return (
    <>
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: 'query=reviewed:true',
        }}
      >
        <SwissProtIcon
          width="1.75em"
          className={styles['core-data__reviewed-icon']}
        />
        <div className={styles['core-data__status']}>Reviewed</div>
        <div>(Swiss-Prot)</div>
        <div>{numberReviewed && <LongNumber>{numberReviewed}</LongNumber>}</div>
      </Link>
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: 'query=reviewed:false',
        }}
      >
        <TremblIcon width="1.75em" />
        <div className={styles['core-data__status']}>Unreviewed</div>
        <div>(TrEMBL)</div>
        <div>
          {numberUnreviewed && <LongNumber>{numberUnreviewed}</LongNumber>}
        </div>
      </Link>
    </>
  );
};

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
      className={cn('uniprot-grid-cell--span-3', styles['core-data-tile'])}
      subtitle="UniProt Knowledgebase"
      backgroundImage={
        <img
          src={UniProtKBIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.seaBlue}
      to={getNamespaceTo(Location.UniProtKBResults)}
      gradient
    >
      <span className={styles['core-data']}>
        <UniProtKBLinks />
      </span>
    </Tile>
    <Tile
      title="Species"
      className="uniprot-grid-cell--span-3"
      subtitle="Proteomes"
      backgroundImage={
        <img
          src={SpeciesIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
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
      backgroundImage={
        <img
          src={ClusterIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
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
      backgroundImage={
        <img
          src={ArchiveIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
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
