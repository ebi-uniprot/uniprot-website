import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import UniRuleCard from '../UniRuleCard';

import uniRuleData from '../../../__mocks__/uniRuleModelData';

describe('UniRuleCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(<UniRuleCard data={uniRuleData[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<UniRuleCard data={uniRuleData[0]} />);
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/unirule/UR000048432');
  });
});
