import React from 'react';
import { render } from '@testing-library/react';
import GeneNamesView from '../GeneNamesView';
import GeneNamesUIDataJson from '../__mocks__/GeneNamesUIData.json';

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const { asFragment } = render(<GeneNamesView {...GeneNamesUIDataJson} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
