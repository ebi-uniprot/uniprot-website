import React from 'react';
import { render } from '@testing-library/react';
import EntryProteinNames from '../ProteinNamesView';
import ProteinNamesUIData from './__mockData__/ProteinNamesUIData.json';

describe('ProteinNames', () => {
  test('should render protein_name', () => {
    const { asFragment } = render(
      <EntryProteinNames {...ProteinNamesUIData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
