import { ReactNode } from 'react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import UniProtKBFeaturesView from '../UniProtKBFeaturesView';

import FeaturesUIData from './__mocks__/featuresUIData';

jest.mock('../../../../shared/components/views/FeaturesView', () => ({
  __esModule: true,
  default: ({ table }: { table: ReactNode }) => table,
}));

describe('FeaturesView component', () => {
  it('should render without crashing', () => {
    const { asFragment } = customRender(
      <UniProtKBFeaturesView
        primaryAccession="P05067"
        features={FeaturesUIData}
        sequence="ASDASDASASDASDASDSASD"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
