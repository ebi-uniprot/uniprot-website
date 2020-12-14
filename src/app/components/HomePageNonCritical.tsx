import { Tile, HeroContainer } from 'franklin-sites';

import colors from '../../../node_modules/franklin-sites/src/styles/colours.json';

// Namespaces
import UniProtKBIllustration from '../../svg/uniprotkb_illustration.svg';
import SpeciesIllustration from '../../svg/species_illustration.svg';
import ClusterIllustration from '../../svg/cluster_illustration.svg';
import ArchiveIllustration from '../../svg/archive_illustration.svg';

// Tools
import BlastIllustration from '../../svg/blast_illustration.svg';
import IDMappingIllustration from '../../svg/id-mapping_illustration.svg';
import PeptideSearchIllustration from '../../svg/peptide_search_illustration.svg';

// Technical corner
import FTPIllustration from '../../svg/ftp_illustration.svg';
import ProgrammaticIllustration from '../../svg/programmatic_illustration.svg';
import TechDocIllustration from '../../svg/tech_doc_illustration.svg';

import Block from './Block';
import PlaceHolder from './PlaceHolder';

const HomePageNonCritical = () => (
  <>
    <Block columns="4">
      <Tile
        title="UniProtKB"
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
        subtitle="Proteomes"
        description="Protein sets for species with sequenced genomes from across the tree of life."
        backgroundImage={<SpeciesIllustration />}
        backgroundColor={colors.proteomes}
        gradient
      />
      <Tile
        title="Protein Clusters"
        subtitle="UniRef"
        description="Clusters of protein sequences at 100%, 90% &amp; 50% identity."
        backgroundImage={<ClusterIllustration />}
        backgroundColor={colors.uniref}
        gradient
      />
      <Tile
        title="Sequence Archive"
        subtitle="UniParc"
        description="Non-redundant archive of publicly available protein sequences seen across different databases."
        backgroundImage={<ArchiveIllustration />}
        backgroundColor={colors.uniparc}
        gradient
      />
    </Block>

    <HeroContainer title="Supporting Data">
      <h5>Literature Citations</h5>
      <h5>Taxonomy</h5>
      <h5>Subcellular locations</h5>
      <h5>Cross-ref databases</h5>
      <h5>Diseases</h5>
      <h5>Keywords</h5>
      <h5>UniRule</h5>
      <h5>SAAS</h5>
    </HeroContainer>
    <HeroContainer title="News">
      <PlaceHolder />
    </HeroContainer>
    <HeroContainer title="Analysis Tools">
      <Block columns="4">
        <Tile
          title="BLAST"
          description="Search with a sequence to find homologs through pairwise sequence alignment."
          backgroundImage={<BlastIllustration />}
          backgroundColor={colors.blast}
          gradient
        />
        <Tile
          title="ALIGN"
          description="Align two or more protein sequences with Clustal Omega to find conserved regions."
          backgroundColor={colors.align}
          gradient
        />
        <Tile
          title="Search with Lists / Map IDs"
          description="Find proteins with lists of UniProt IDs or convert from/to other database IDs."
          backgroundImage={<IDMappingIllustration />}
          backgroundColor={colors.idMapping}
          gradient
        />
        <Tile
          title="Search Peptides"
          description="Search with a peptide sequence to find all UniPro proteins that contain exact matches."
          backgroundImage={<PeptideSearchIllustration />}
          backgroundColor={colors.peptideSearch}
          gradient
        />
      </Block>
    </HeroContainer>
    <HeroContainer title="Need Help?">
      <PlaceHolder />
    </HeroContainer>
    <HeroContainer title="Download and APIs">
      <Block columns="4">
        <Tile
          title="FTP Download"
          description="Get UniProt data for the latest release."
          backgroundImage={<FTPIllustration />}
          backgroundColor={colors.independence}
          gradient
        />
        <Tile
          title="Technical Documentation"
          description="Manuals, schemas and ontology descriptions."
          backgroundImage={<TechDocIllustration />}
          backgroundColor={colors.independence}
          gradient
        />
        <Tile
          title="Programmatic access"
          description="REST API, SPARQL API, JAVA API."
          backgroundImage={<ProgrammaticIllustration />}
          backgroundColor={colors.independence}
          gradient
        />
        <section>Join our Google group and learn more.</section>
      </Block>
    </HeroContainer>
  </>
);

export default HomePageNonCritical;
