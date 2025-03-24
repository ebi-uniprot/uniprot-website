import cn from 'classnames';
import { HeroContainer, Tile, ToolboxIcon } from 'franklin-sites';
import { Link } from 'react-router-dom';

import AlignIllustration from '../../../images/align_illustration.img.svg';
import BlastIllustration from '../../../images/blast_illustration.img.svg';
import IDMappingIllustration from '../../../images/id-mapping_illustration.img.svg';
import PeptideSearchIllustration from '../../../images/peptide_search_illustration.img.svg';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { jobTypeToPath, Location, LocationToPath } from '../../config/urls';
import styles from './styles/non-critical.module.scss';

const AnalysisTools = () => (
  <HeroContainer
    headingContent={
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
    headingClassName="uniprot-grid-cell--span-9"
    noSidePadding
  >
    <Link
      to={LocationToPath[Location.Dashboard]}
      className={cn('uniprot-grid-cell--span-3', styles['align-end'])}
    >
      <small>View dashboard</small>
    </Link>
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
      backgroundColor="var(--fr--color-blast)"
      link={<Link to={jobTypeToPath(JobTypes.BLAST)} />}
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
      backgroundColor="--fr--color-align"
      link={<Link to={jobTypeToPath(JobTypes.ALIGN)} />}
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
      backgroundColor="var(--fr--color-id-mapping)"
      link={<Link to={jobTypeToPath(JobTypes.ID_MAPPING)} />}
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
      backgroundColor="var(--fr--color-peptide-search)"
      link={<Link to={jobTypeToPath(JobTypes.PEPTIDE_SEARCH)} />}
      gradient
    >
      Search with a peptide sequence to find all UniProt proteins that contain
      exact matches
    </Tile>
  </HeroContainer>
);

export default AnalysisTools;
