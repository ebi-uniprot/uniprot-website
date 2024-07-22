import { Tab, Tabs } from 'franklin-sites';

import GoCamViz from '../protein-data-views/GoCamViz';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

const GoCam = () => {
  const isSmallScreen = useSmallScreen();

  return isSmallScreen ? null : (
    <Tabs>
      <Tab title="GO-CAM">
        <GoCamViz />
      </Tab>
    </Tabs>
  );
};

export default GoCam;
