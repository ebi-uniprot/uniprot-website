import { fireEvent, screen } from '@testing-library/react';

import { MapToDropdown, MapToDropdownBasic } from '../MapTo';

import customRender from '../../__test-helpers__/customRender';

describe('MapToDropdownBasic', () => {
  it('should render the basic component', () => {
    const { asFragment } = customRender(
      <MapToDropdownBasic
        config={[
          {
            key: 'uniparcCount',
            to: { pathname: '/path' },
            count: 10,
            label: 'UniParc',
          },
        ]}
      >
        Map to
      </MapToDropdownBasic>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('MapToDropdown', () => {
  it('should render the advanced component with basic config', () => {
    const { asFragment } = customRender(
      <MapToDropdown
        statistics={{
          reviewedProteinCount: 10,
          unreviewedProteinCount: 608,
        }}
        accession="ARBA00013665"
      />,
      {
        route: '/unirule/ARBA00013665',
      }
    );
    fireEvent.click(screen.getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
  });
});
