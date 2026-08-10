import cn from 'classnames';
import { memo } from 'react';

import AnalysisTools from './AnalysisTools';
import CoreData from './CoreData';
import LatestNews from './LatestNews';
import NeedHelp from './NeedHelp';
import Protnlm2Banner from './Protnlm2Banner';
import styles from './styles/non-critical.module.scss';
import SupportingData from './SupportingData';
import UniProtData from './UniProtData';

const HomePageNonCritical = () => (
  <>
    <div
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        styles['home-page-section']
      )}
    >
      <Protnlm2Banner />
    </div>
    <CoreData />
    <SupportingData />
    <LatestNews />
    <AnalysisTools />
    <NeedHelp />
    <UniProtData />
  </>
);

export default memo(HomePageNonCritical);
