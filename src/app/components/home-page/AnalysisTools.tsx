import { Tile, HeroContainer } from 'franklin-sites';
import cn from 'classnames';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import BlastIllustration from '../../../images/blast_illustration.svg';
import AlignIllustration from '../../../images/align_illustration.svg';
import UploadListIllustration from '../../../images/id-mapping_illustration.svg';
import PeptideSearchIllustration from '../../../images/peptide_search_illustration.svg';

import { jobTypeToPath } from '../../config/urls';

import { JobTypes } from '../../../tools/types/toolsJobTypes';

import styles from './styles/non-critical.module.scss';

const AnalysisTools = () => (
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
      title="Align"
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
      Find proteins with lists of UniProt IDs or convert from/to other database
      IDs
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
);

export default AnalysisTools;
