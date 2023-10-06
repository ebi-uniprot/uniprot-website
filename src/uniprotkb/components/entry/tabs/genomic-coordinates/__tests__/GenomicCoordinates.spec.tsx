import { render } from '@testing-library/react';

import customRender from '../../../../../../shared/__test-helpers__/customRender';

import GenomicCoordinates from '../GenomicCoordinates';

import useDataApi from '../../../../../../shared/hooks/useDataApi';

import O00560 from './__mocks__/O00560';

jest.mock('../../../../../../shared/hooks/useDataApi');

describe('GenomicCoordinates component', () => {
  it('renders on loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    const { asFragment } = render(
      <GenomicCoordinates primaryAccession="O00560" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on error', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('some error'),
      status: 500,
    });
    const { asFragment } = render(
      <GenomicCoordinates primaryAccession="O00560" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on no data', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      status: 404,
    });
    const { asFragment } = render(
      <GenomicCoordinates primaryAccession="O00560" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on data', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: O00560,
      status: 200,
    });
    const { asFragment } = customRender(
      <GenomicCoordinates primaryAccession="O00560" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
