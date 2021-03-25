import {
  Tile,
  HeroContainer,
  DecoratedListItem,
  ExternalLink,
} from 'franklin-sites';
import { Link, useHistory } from 'react-router-dom';
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

import PlaceHolder from './PlaceHolder';
import { Location, LocationToPath } from '../config/urls';

import styles from './styles/home-page-non-critical.module.scss';

const HomePageNonCritical = () => {
  const history = useHistory();

  const getNamespaceTo = (location: Location) => ({
    pathname: LocationToPath[location],
    search: `query=*`,
  });

  return (
    <>
      <section className="uniprot-grid uniprot-grid--centered">
        <Tile
          title="Proteins"
          className="uniprot-grid-cell--span-3"
          subtitle="UniProt Knowledgebase"
          description={
            <section>
              <span>
                <h6>Reviewed</h6>SwissProt
              </span>
              <span>
                <h6>Unreviewed</h6>TrEMBL
              </span>
            </section>
          }
          backgroundImage={<UniProtKBIllustration />}
          backgroundColor={colors.seaBlue}
          gradient
          onClick={() =>
            history.push(getNamespaceTo(Location.UniProtKBResults))
          }
        />
        <Tile
          title="Species"
          className="uniprot-grid-cell--span-3"
          subtitle="Proteomes"
          description="Protein sets for species with sequenced genomes from across the tree of life."
          backgroundImage={<SpeciesIllustration />}
          backgroundColor={colors.proteomes}
          onClick={() =>
            history.push(getNamespaceTo(Location.ProteomesResults))
          }
          gradient
        />
        <Tile
          title="Protein Clusters"
          className="uniprot-grid-cell--span-3"
          subtitle="UniRef"
          description="Clusters of protein sequences at 100%, 90% &amp; 50% identity."
          backgroundImage={<ClusterIllustration />}
          backgroundColor={colors.uniref}
          onClick={() => history.push(getNamespaceTo(Location.UniRefResults))}
          gradient
        />
        <Tile
          title="Sequence Archive"
          className="uniprot-grid-cell--span-3"
          subtitle="UniParc"
          description="Non-redundant archive of publicly available protein sequences seen across different databases."
          backgroundImage={<ArchiveIllustration />}
          backgroundColor={colors.uniparc}
          onClick={() => history.push(getNamespaceTo(Location.UniParcResults))}
          gradient
        />
      </section>

      <HeroContainer
        className={cn(
          'uniprot-grid',
          'uniprot-grid--centered',
          'uniprot-grid--with-bleed'
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
        className="uniprot-grid uniprot-grid--centered uniprot-grid--with-bleed"
        titleClassName="uniprot-grid-cell--span-12"
      >
        <section className="uniprot-grid-cell--span-12">
          <PlaceHolder />
        </section>
      </HeroContainer>

      <HeroContainer
        title="Analysis Tools"
        className="uniprot-grid uniprot-grid--centered uniprot-grid--with-bleed"
        titleClassName="uniprot-grid-cell--span-12"
      >
        <Tile
          title="BLAST"
          className="uniprot-grid-cell--span-3"
          description="Search with a sequence to find homologs through pairwise sequence alignment."
          backgroundImage={<BlastIllustration />}
          backgroundColor={colors.blast}
          onClick={() => history.push({ pathname: Location.Blast })}
          gradient
        />
        <Tile
          title="ALIGN"
          className="uniprot-grid-cell--span-3"
          description="Align two or more protein sequences with Clustal Omega to find conserved regions."
          backgroundImage={<AlignIllustration />}
          backgroundColor={colors.align}
          onClick={() => history.push({ pathname: Location.Align })}
          gradient
        />
        <Tile
          title="Search with Lists Map IDs"
          className="uniprot-grid-cell--span-3"
          description="Find proteins with lists of UniProt IDs or convert from/to other database IDs."
          backgroundImage={<UploadListIllustration />}
          backgroundColor={colors.idMapping}
          onClick={() => history.push({ pathname: Location.IDMapping })}
          gradient
        />
        <Tile
          title="Search Peptides"
          className="uniprot-grid-cell--span-3"
          description="Search with a peptide sequence to find all UniProt proteins that contain exact matches."
          backgroundImage={<PeptideSearchIllustration />}
          backgroundColor={colors.peptideSearch}
          onClick={() => history.push({ pathname: Location.PeptideSearch })}
          gradient
        />
      </HeroContainer>
      <HeroContainer
        title="Need Help?"
        className="uniprot-grid uniprot-grid--centered uniprot-grid--with-bleed"
        titleClassName="uniprot-grid-cell--span-12"
      >
        <PlaceHolder />
      </HeroContainer>
      <HeroContainer
        title="Download and APIs"
        className="uniprot-grid uniprot-grid--centered uniprot-grid--with-bleed"
        titleClassName="uniprot-grid-cell--span-12"
      >
        <Tile
          title="FTP Download"
          className="uniprot-grid-cell--span-3"
          description="Get UniProt data for the latest release."
          backgroundImage={<FTPIllustration />}
          backgroundColor={colors.independence}
          // eslint-disable-next-line no-return-assign
          onClick={() =>
            (window.location.href =
              'https://ftp.uniprot.org/pub/databases/uniprot/')
          }
          gradient
        />
        <Tile
          title="Technical Documentation"
          className="uniprot-grid-cell--span-3"
          description="Manuals, schemas and ontology descriptions."
          backgroundImage={<TechDocIllustration />}
          backgroundColor={colors.independence}
          // TODO: update link
          // eslint-disable-next-line no-return-assign
          onClick={() =>
            (window.location.href = 'https://www.uniprot.org/help/technical')
          }
          gradient
        />
        <Tile
          title="Programmatic access"
          className="uniprot-grid-cell--span-3"
          description="REST API, SPARQL API, JAVA API."
          backgroundImage={<ProgrammaticIllustration />}
          backgroundColor={colors.independence}
          // TODO: update link
          // eslint-disable-next-line no-return-assign
          onClick={() =>
            (window.location.href =
              'https://www.uniprot.org/help/programmatic_access')
          }
          gradient
        />
        <section className="uniprot-grid-cell--span-3">
          <ExternalLink url="https://groups.google.com/u/1/g/ebi-proteins-api">
            Join our Google group{' '}
          </ExternalLink>
          and learn more.
        </section>
      </HeroContainer>
    </>
  );
};

export default HomePageNonCritical;
