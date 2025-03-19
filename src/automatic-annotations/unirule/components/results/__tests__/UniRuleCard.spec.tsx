import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import uniRuleData from '../../../__mocks__/uniRuleModelData';
import UniRuleCard from '../UniRuleCard';

describe('UniRuleCard tests', () => {
  it('should render the card component', () => {
    const { asFragment } = customRender(<UniRuleCard data={uniRuleData[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<UniRuleCard data={uniRuleData[0]} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/unirule/UR000048432');
  });
});
