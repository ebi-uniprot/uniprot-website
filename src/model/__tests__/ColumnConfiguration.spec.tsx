import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ColumnConfiguration from '../ColumnConfiguration';
import data from '../__mocks__/modelData.json';
import uniProtKbConverter from '../uniprotkb/UniProtkbConverter';

describe('ColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniProtKbConverter(data);
  });

  test('should render all columns', () => {
    ColumnConfiguration.forEach(column => {
      const { asFragment } = render(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
