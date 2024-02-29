import { Tile, HeroContainer, ToolboxIcon } from 'franklin-sites';
import cn from 'classnames';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import BlastIllustration from '../../../images/blast_illustration.img.svg';
import AlignIllustration from '../../../images/align_illustration.img.svg';
import IDMappingIllustration from '../../../images/id-mapping_illustration.img.svg';
import PeptideSearchIllustration from '../../../images/peptide_search_illustration.img.svg';

import { jobTypeToPath } from '../../config/urls';

import { JobTypes } from '../../../tools/types/toolsJobTypes';

import styles from './styles/non-critical.module.scss';

const AnalysisTools = () => (
  <HeroContainer
    title={
      <>
        <ToolboxIcon width="1.4ch" /> Analysis Tools
      </>
    }
    className={cn(
      'uniprot-grid',
      'uniprot-grid--centered',
      'uniprot-grid--with-bleed',
      styles['home-page-section'],
      styles['no-small']
    )}
    titleClassName="uniprot-grid-cell--span-12"
    noSidePadding
  >
    <Tile
      headingLevel="h3"
      title="BLAST"
      translate="no"
      className="uniprot-grid-cell--span-3"
      backgroundImage={
        <img
          src={BlastIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.blast}
      to={jobTypeToPath(JobTypes.BLAST)}
      gradient
    >
      Search with a sequence to find homologs through pairwise sequence
      alignment
    </Tile>
    <Tile
      headingLevel="h3"
      title="Align"
      translate="no"
      className="uniprot-grid-cell--span-3"
      backgroundImage={
        <img
          src={AlignIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.align}
      to={jobTypeToPath(JobTypes.ALIGN)}
      gradient
    >
      Align two or more protein sequences with Clustal Omega to find conserved
      regions
    </Tile>
    <Tile
      headingLevel="h3"
      title="Search with Lists Map IDs"
      className="uniprot-grid-cell--span-3"
      backgroundImage={
        <img
          src={IDMappingIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.idMapping}
      to={jobTypeToPath(JobTypes.ID_MAPPING)}
      gradient
    >
      Find proteins with lists of UniProt IDs or convert from/to other database
      IDs
    </Tile>
    <Tile
      headingLevel="h3"
      title="Search Peptides"
      className="uniprot-grid-cell--span-3"
      backgroundImage={
        <img
          src={PeptideSearchIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.peptideSearch}
      to={jobTypeToPath(JobTypes.PEPTIDE_SEARCH)}
      gradient
    >
      Search with a peptide sequence to find all UniProt proteins that contain
      exact matches
    </Tile>
  </HeroContainer>
);

export default AnalysisTools;
