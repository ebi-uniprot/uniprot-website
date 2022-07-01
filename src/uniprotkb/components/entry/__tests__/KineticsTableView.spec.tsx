import customRender from '../../../../shared/__test-helpers__/customRender';

import KineticsTableView from '../KineticsTableView';

import mock from './__mocks__/kineticsData';

describe('Kinetics section', () => {
  test(`should render table for Kinetics section`, () => {
    const { asFragment } = customRender(
      <KineticsTableView data={mock.data1} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test(`should render table and notes section for exceptional cases`, () => {
    const { asFragment } = customRender(
      <KineticsTableView data={mock.data2} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test(`should render table for Kinetics data  where two kcat values are combined within a sentence`, () => {
    const { asFragment } = customRender(
      <KineticsTableView data={mock.data3} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
