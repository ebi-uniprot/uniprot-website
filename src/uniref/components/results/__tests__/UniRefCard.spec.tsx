import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import UniRefCard from '../UniRefCard';

import { UniRefLiteAPIModel } from '../../../adapters/uniRefConverter';

import data from '../../../__mocks__/uniRefResultsData';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const row = data.results[0];
    const { asFragment } = customRender(
      <UniRefCard
        data={row as UniRefLiteAPIModel}
        handleEntrySelection={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card selection and navigation', () => {
    const handleClick = jest.fn();
    const row = data.results[0];
    const { history } = customRender(
      <UniRefCard
        data={row as UniRefLiteAPIModel}
        handleEntrySelection={handleClick}
      />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
    expect(history.location.pathname).not.toMatch(
      '/uniref/UniRef100_A0A0B7GQ86'
    );
    fireEvent.click(screen.getByTestId('background-link'));
    expect(history.location.pathname).toMatch('/uniref/UniRef100_A0A0B7GQ86');
  });
});
