import { render } from '@testing-library/react';

import BuscoView from '../BuscoView';

import data from '../../__mocks__/proteomesEntryModelData';

describe('BuscoView', () => {
  it('should render', () => {
    const { asFragment } = render(
      <BuscoView report={data.proteomeCompletenessReport!.buscoReport!} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
