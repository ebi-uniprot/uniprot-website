import { screen, fireEvent } from '@testing-library/react';

import UniProtKBCard from '../UniProtKBCard';

import customRender from '../../../../shared/__test-helpers__/customRender';

import data from '../../../__mocks__/uniProtKBEntryModelData';

const handleEntrySelection = jest.fn();

let rendered;

describe('UniProtKBCard component', () => {
  beforeEach(() => {
    rendered = customRender(
      <UniProtKBCard data={data} handleEntrySelection={handleEntrySelection} />
    );
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should select a row', () => {
    const checkbox = screen.getByTestId('up-card-checkbox');
    fireEvent.click(checkbox);
    expect(handleEntrySelection).toHaveBeenCalled();
  });
});
