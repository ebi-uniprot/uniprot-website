import { Tile, HeroContainer } from 'franklin-sites';

import Block from './Block';
import PlaceHolder from './PlaceHolder';

const HomePageNonCritical = () => (
  <>
    <Block columns="4">
      <Tile title="UniProtKB" />
      <Tile
        title="Proteomes"
        description="Sets of proteins for reference and other species of interest."
      />
      <Tile
        title="UniRef"
        description="Clusters of protein sequences at 100%, 90% &amp; 50% similarity"
      />
      <Tile
        title="UniParc"
        description="Non-redundant archive of protein sequences publicly available (UniProt, RefSeq, Ensembl,...)"
      />
    </Block>
    <Block columns="4">
      <Tile title="Literature Citations" />
      <Tile title="Taxonomy" />
      <Tile title="Subcellular locations" />
      <Tile title="Cross-ref databases" />
    </Block>
    <Block columns="4">
      <Tile title="Diseases" />
      <Tile title="Keywords" />
      <Tile title="UniRule" />
      <Tile title="SAAS" />
    </Block>
    <HeroContainer title="News">
      <PlaceHolder />
    </HeroContainer>
    <Block columns="4">
      <Tile
        title="BLAST"
        description="The Basic Local Alignment Search Tool finds regions of local similarity between sequences."
      />
      <Tile
        title="ALIGN"
        description="Align two or more protein sequences with the Clust Omega program."
      />
      <Tile
        title="Retrieve/ID Mapping"
        description="Retrieve and/or convert non UniProt identifiers to download lists for use on this website."
      />
      <Tile
        title="Peptide Search"
        description="Find all UniProtKB sequences that exactly match a query peptide sequence."
      />
    </Block>
    <HeroContainer title="Need Help?">
      <PlaceHolder />
    </HeroContainer>
    <Block columns="3">
      <Tile
        title="Programmatic access"
        description="Query UniProt data using APIs providing REST, SPARQL and Java services."
      />
      <Tile title="FTP Download" description="Get the UniProt data directly." />
      <Tile
        title="Technical Documentation"
        description="Access extensive technical documents to help you use UniProt to its full potential."
      />
    </Block>
  </>
);

export default HomePageNonCritical;
