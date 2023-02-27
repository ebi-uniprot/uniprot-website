import { memo } from 'react';

// Sections
import CoreData from './CoreData';
import ExtraLinks from './ExtraLinks';
import SupportingData from './SupportingData';
import LatestNews from './LatestNews';
import AnalysisTools from './AnalysisTools';
import NeedHelp from './NeedHelp';
import UniProtData from './UniProtData';

const HomePageNonCritical = () => (
  <>
    <CoreData />

    <ExtraLinks />

    <SupportingData />

    <LatestNews />

    <AnalysisTools />

    <NeedHelp />

    <UniProtData />
  </>
);

export default memo(HomePageNonCritical);
