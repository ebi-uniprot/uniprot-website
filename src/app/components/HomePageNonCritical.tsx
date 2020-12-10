import React from 'react';
import { Tile, HeroContainer } from 'franklin-sites';

import Block from './Block';
import PlaceHolder from './PlaceHolder';

const HomePageNonCritical = () => (
  <section className="content-section">
    <Block>
      <Tile title="UniProtKB" />
      <Tile
        title="Proteomes"
        namespace="proteomes"
        description="Sets of proteins for reference and other species of interest."
      />
      <Tile
        title="UniRef"
        namespace="uniref"
        description="Clusters of protein sequences at 100%, 90% &amp; 50% similarity"
      />
      <Tile
        title="UniParc"
        namespace="uniparc"
        description="Non-redundant archive of protein sequences publicly available (UniProt, RefSeq, Ensembl,...)"
      />
    </Block>
    <Block>
      <Tile title="Literature Citations" small />
      <Tile title="Taxonomy" small />
      <Tile title="Subcellular locations" small />
      <Tile title="Cross-ref databases" small />
    </Block>
    <Block>
      <Tile title="Diseases" small />
      <Tile title="Keywords" small />
      <Tile title="UniRule" small />
      <Tile title="SAAS" small />
    </Block>
    <HeroContainer title="News" className="uniprot-grid">
      <PlaceHolder />
    </HeroContainer>
    <Block>
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
    <HeroContainer title="Need Help?" className="uniprot-grid">
      <PlaceHolder />
    </HeroContainer>
    <Block>
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
  </section>
);

export default HomePageNonCritical;
