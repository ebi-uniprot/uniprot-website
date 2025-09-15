import { memo } from 'react';

import AnalysisTools from './AnalysisTools';
import CoreData from './CoreData';
import LatestNews from './LatestNews';
import NeedHelp from './NeedHelp';
import SupportingData from './SupportingData';
import UniProtData from './UniProtData';

const HomePageNonCritical = () => (
  <>
    <CoreData />
    <SupportingData />
    <LatestNews />
    <AnalysisTools />
    {/* <NeedHelp /> */}
    <UniProtData />
  </>
);

export default memo(HomePageNonCritical);
