import { render } from '@testing-library/react';

import data from '../../__mocks__/proteomesEntryModelData';
import BuscoView from '../BuscoView';

describe('BuscoView', () => {
  it('should render', () => {
    const { asFragment } = render(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      <BuscoView report={data.proteomeCompletenessReport!.buscoReport!} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
