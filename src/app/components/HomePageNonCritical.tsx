import { memo } from 'react';
import {
  Tile,
  HeroContainer,
  DecoratedListItem,
  SwissProtIcon,
  TremblIcon,
} from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import colors from '../../../node_modules/franklin-sites/src/styles/colours.json';

// Namespaces
import UniProtKBIllustration from '../../images/uniprotkb_illustration.svg';
import SpeciesIllustration from '../../images/species_illustration.svg';
import ClusterIllustration from '../../images/cluster_illustration.svg';
import ArchiveIllustration from '../../images/archive_illustration.svg';

// Tools
import BlastIllustration from '../../images/blast_illustration.svg';
import AlignIllustration from '../../images/align_illustration.svg';
import UploadListIllustration from '../../images/id-mapping_illustration.svg';
import PeptideSearchIllustration from '../../images/peptide_search_illustration.svg';

// Technical corner
import FTPIllustration from '../../images/ftp_illustration.svg';
import ProgrammaticIllustration from '../../images/programmatic_illustration.svg';
import TechDocIllustration from '../../images/tech_doc_illustration.svg';
import SubmitDataIllustration from '../../images/submit-data_illustration.svg';

import PlaceHolder from './PlaceHolder';

import { jobTypeToPath, Location, LocationToPath } from '../config/urls';

import { JobTypes } from '../../tools/types/toolsJobTypes';

import styles from './styles/home-page-non-critical.module.scss';

const getNamespaceTo = (location: Location) => ({
  pathname: LocationToPath[location],
  search: `query=*`,
});

const HomePageNonCritical = () => (
  <>
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
        <span className={styles['proteins-section']}>
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `facets=reviewed:true&query=*`,
            }}
          >
            <SwissProtIcon width="2.5em" />
            <div className={styles['proteins-section__status']}>Reviewed</div>
            <small>Swiss-Prot</small>
          </Link>
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `facets=reviewed:false&query=*`,
            }}
          >
            <TremblIcon width="2.5em" />
            <div className={styles['proteins-section__status']}>Unreviewed</div>
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
        Non-redundant archive of publicly available protein sequences seen
        across different databases
      </Tile>
    </section>

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
        <h3 className={styles['supporting-data-section__header']}>
          Supporting Data
        </h3>
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
          {/* TODO: update link */}
          <a href="//www.uniprot.org/unirule">UniRule automatic annotation</a>
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
          <a href="//www.uniprot.org/arba">ARBA automatic annotation</a>
        </DecoratedListItem>
      </div>
    </HeroContainer>

    <HeroContainer
      title="News"
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        'uniprot-grid--with-bleed',
        styles['home-page-section']
      )}
      titleClassName="uniprot-grid-cell--span-12"
      noSidePadding
    >
      <PlaceHolder />
    </HeroContainer>

    <HeroContainer
      title="Analysis Tools"
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        'uniprot-grid--with-bleed',
        styles['home-page-section']
      )}
      titleClassName="uniprot-grid-cell--span-12"
      noSidePadding
    >
      <Tile
        title="BLAST"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<BlastIllustration />}
        backgroundColor={colors.blast}
        to={jobTypeToPath(JobTypes.BLAST)}
        gradient
      >
        Search with a sequence to find homologs through pairwise sequence
        alignment
      </Tile>
      <Tile
        title="ALIGN"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<AlignIllustration />}
        backgroundColor={colors.align}
        to={jobTypeToPath(JobTypes.ALIGN)}
        gradient
      >
        Align two or more protein sequences with Clustal Omega to find conserved
        regions
      </Tile>
      <Tile
        title="Search with Lists Map IDs"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<UploadListIllustration />}
        backgroundColor={colors.idMapping}
        to={jobTypeToPath(JobTypes.ID_MAPPING)}
        gradient
      >
        Find proteins with lists of UniProt IDs or convert from/to other
        database IDs
      </Tile>
      <Tile
        title="Search Peptides"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<PeptideSearchIllustration />}
        backgroundColor={colors.peptideSearch}
        to={jobTypeToPath(JobTypes.PEPTIDE_SEARCH)}
        gradient
      >
        Search with a peptide sequence to find all UniProt proteins that contain
        exact matches
      </Tile>
    </HeroContainer>
    <HeroContainer
      title="Need Help?"
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        'uniprot-grid--with-bleed',
        styles['home-page-section']
      )}
      titleClassName="uniprot-grid-cell--span-12"
      noSidePadding
    >
      <PlaceHolder />
    </HeroContainer>
    <HeroContainer
      title="UniProt data"
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        'uniprot-grid--with-bleed',
        styles['home-page-section']
      )}
      titleClassName="uniprot-grid-cell--span-12"
      noSidePadding
    >
      <Tile
        title="FTP Download"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<FTPIllustration />}
        backgroundColor={colors.independence}
        url="https://ftp.uniprot.org/pub/databases/uniprot/"
        gradient
      >
        Download UniProt release data
      </Tile>
      <Tile
        title="Technical documentation"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<TechDocIllustration />}
        backgroundColor={colors.independence}
        // TODO: update link
        url="https://www.uniprot.org/help/technical"
        gradient
      >
        Manuals, schemas and ontology descriptions
      </Tile>
      <Tile
        title="Programmatic access"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<ProgrammaticIllustration />}
        backgroundColor={colors.independence}
        // TODO: update link
        url="https://www.uniprot.org/help/programmatic_access"
        gradient
      >
        Query UniProt data using APIs providing REST, SPARQL and Java services
      </Tile>
      <Tile
        title="Submit data"
        className="uniprot-grid-cell--span-3"
        backgroundImage={<SubmitDataIllustration />}
        backgroundColor={colors.independence}
        // TODO: update link
        url="https://www.uniprot.org/help/submissions"
        gradient
      >
        Submit your sequences, publications and annotation updates
      </Tile>
    </HeroContainer>
  </>
);

export default memo(HomePageNonCritical);
