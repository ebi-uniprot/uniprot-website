import { render } from '@testing-library/react';

import BuscoView from '../BuscoView';

import data from '../../__mocks__/proteomesEntryModelData';

describe('BuscoView', () => {
  it('should render', () => {
    const { asFragment } = render(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      <BuscoView report={data.proteomeCompletenessReport!.buscoReport!} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
