// @flow
import React from 'react';
import { Tile } from 'franklin-sites';

import Block from '../layout/Block';
import HomePageLayout from '../layout/HomePageLayout';

const HomePage = () => (
  <HomePageLayout>
    <Block columns="4">
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
  </HomePageLayout>
);

export default HomePage;
