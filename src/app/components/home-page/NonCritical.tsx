import { memo } from 'react';
import { HeroContainer } from 'franklin-sites';
import cn from 'classnames';

// Sections
import CoreData from './CoreData';
import SupportingData from './SupportingData';
import LatestNews from './LatestNews';
import AnalysisTools from './AnalysisTools';
import UniProtData from './UniProtData';

import PlaceHolder from '../PlaceHolder';

import styles from './styles/non-critical.module.scss';

const HomePageNonCritical = () => (
  <>
    <CoreData />

    <SupportingData />

    <LatestNews />

    <AnalysisTools />

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

    <UniProtData />
  </>
);

export default memo(HomePageNonCritical);
