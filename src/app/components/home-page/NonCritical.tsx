import { memo } from 'react';

// Sections
import CoreData from './CoreData';
import SupportingData from './SupportingData';
import LatestNews from './LatestNews';
import AnalysisTools from './AnalysisTools';
import NeedHelp from './NeedHelp';
import UniProtData from './UniProtData';

const HomePageNonCritical = () => (
  <>
    <CoreData />

    <SupportingData />

    <LatestNews />

    <AnalysisTools />

    <NeedHelp />

    <UniProtData />
  </>
);

export default memo(HomePageNonCritical);
