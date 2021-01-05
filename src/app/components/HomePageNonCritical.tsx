import { Tile, HeroContainer, InfoListItem } from 'franklin-sites';

import colors from '../../../node_modules/franklin-sites/src/styles/colours.json';

// Namespaces
import UniProtKBIllustration from '../../svg/uniprotkb_illustration.svg';
import SpeciesIllustration from '../../svg/species_illustration.svg';
import ClusterIllustration from '../../svg/cluster_illustration.svg';
import ArchiveIllustration from '../../svg/archive_illustration.svg';

// Tools
import BlastIllustration from '../../svg/blast_illustration.svg';
import AlignIllustration from '../../svg/align_illustration.svg';
import UploadListIllustration from '../../svg/id-mapping_illustration.svg';
import PeptideSearchIllustration from '../../svg/peptide_search_illustration.svg';

// Technical corner
import FTPIllustration from '../../svg/ftp_illustration.svg';
import ProgrammaticIllustration from '../../svg/programmatic_illustration.svg';
import TechDocIllustration from '../../svg/tech_doc_illustration.svg';

import PlaceHolder from './PlaceHolder';

const HomePageNonCritical = () => (
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
      />
      <Tile
        title="Species"
        className="uniprot-grid-cell--span-3"
        subtitle="Proteomes"
        description="Protein sets for species with sequenced genomes from across the tree of life."
        backgroundImage={<SpeciesIllustration />}
        backgroundColor={colors.proteomes}
        gradient
      />
      <Tile
        title="Protein Clusters"
        className="uniprot-grid-cell--span-3"
        subtitle="UniRef"
        description="Clusters of protein sequences at 100%, 90% &amp; 50% identity."
        backgroundImage={<ClusterIllustration />}
        backgroundColor={colors.uniref}
        gradient
      />
      <Tile
        title="Sequence Archive"
        className="uniprot-grid-cell--span-3"
        subtitle="UniParc"
        description="Non-redundant archive of publicly available protein sequences seen across different databases."
        backgroundImage={<ArchiveIllustration />}
        backgroundColor={colors.uniparc}
        gradient
      />
    </section>

    <HeroContainer
      className="uniprot-grid uniprot-grid--centered uniprot-grid--with-bleed supporting-data-section"
      titleClassName="uniprot-grid-cell--span-12"
      noSidePadding
    >
      <div className="uniprot-grid-cell--span-3">
        <h3>Supporting Data</h3>
      </div>
      <div className="uniprot-grid-cell--span-3">
        <InfoListItem>
          <h5>Taxonomy</h5>
        </InfoListItem>
      </div>
      <div className="uniprot-grid-cell--span-3">
        <InfoListItem>
          <h5>Subcellular locations</h5>
        </InfoListItem>
      </div>
      <div className="uniprot-grid-cell--span-3">
        <InfoListItem>
          <h5>UniRule automatic annotation</h5>
        </InfoListItem>
      </div>
      <div
        className="uniprot-grid-cell--span-3"
        style={{ display: 'inline-flex' }}
      >
        <InfoListItem inline>
          <h5>Diseases</h5>
        </InfoListItem>
        <InfoListItem inline>
          <h5>Keywords</h5>
        </InfoListItem>
      </div>
      <div className="uniprot-grid-cell--span-3">
        <InfoListItem>
          <h5>Literature Citations</h5>
        </InfoListItem>
      </div>
      <div className="uniprot-grid-cell--span-3">
        <InfoListItem>
          <h5>Cross-referenced databases</h5>
        </InfoListItem>
      </div>
      <div className="uniprot-grid-cell--span-3">
        <InfoListItem>
          <h5>ARBA automatic annotation</h5>
        </InfoListItem>
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
        gradient
      />
      <Tile
        title="ALIGN"
        className="uniprot-grid-cell--span-3"
        description="Align two or more protein sequences with Clustal Omega to find conserved regions."
        backgroundImage={<AlignIllustration />}
        backgroundColor={colors.align}
        gradient
      />
      <Tile
        title="Search with Lists / Map IDs"
        className="uniprot-grid-cell--span-3"
        description="Find proteins with lists of UniProt IDs or convert from/to other database IDs."
        backgroundImage={<UploadListIllustration />}
        backgroundColor={colors.idMapping}
        gradient
      />
      <Tile
        title="Search Peptides"
        className="uniprot-grid-cell--span-3"
        description="Search with a peptide sequence to find all UniPro proteins that contain exact matches."
        backgroundImage={<PeptideSearchIllustration />}
        backgroundColor={colors.peptideSearch}
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
        gradient
      />
      <Tile
        title="Technical Documentation"
        className="uniprot-grid-cell--span-3"
        description="Manuals, schemas and ontology descriptions."
        backgroundImage={<TechDocIllustration />}
        backgroundColor={colors.independence}
        gradient
      />
      <Tile
        title="Programmatic access"
        className="uniprot-grid-cell--span-3"
        description="REST API, SPARQL API, JAVA API."
        backgroundImage={<ProgrammaticIllustration />}
        backgroundColor={colors.independence}
        gradient
      />
      <section className="uniprot-grid-cell--span-3">
        Join our Google group and learn more.
      </section>
    </HeroContainer>
  </>
);

export default HomePageNonCritical;
