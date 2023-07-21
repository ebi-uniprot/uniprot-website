/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render } from '@testing-library/react';

import customRender from '../../../../../../shared/__test-helpers__/customRender';

import Overlapping from '../Overlapping';

import useDataApi from '../../../../../../shared/hooks/useDataApi';

import O00560 from './__mocks__/O00560';

jest.mock('../../../../../../shared/hooks/useDataApi');

describe('VariationViewer component', () => {
  it('renders on loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    const { asFragment } = render(
      <Overlapping
        taxID={O00560.taxid!}
        chromosome={O00560.gnCoordinate![0].genomicLocation.chromosome}
        start={O00560.gnCoordinate![0].genomicLocation.start!}
        end={O00560.gnCoordinate![0].genomicLocation.end!}
        currentEntry="O00560"
      />
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
      <Overlapping
        taxID={O00560.taxid!}
        chromosome={O00560.gnCoordinate![0].genomicLocation.chromosome}
        start={O00560.gnCoordinate![0].genomicLocation.start!}
        end={O00560.gnCoordinate![0].genomicLocation.end!}
        currentEntry="O00560"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on no data', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      status: 404,
    });
    const { asFragment } = render(
      <Overlapping
        taxID={O00560.taxid!}
        chromosome={O00560.gnCoordinate![0].genomicLocation.chromosome}
        start={O00560.gnCoordinate![0].genomicLocation.start!}
        end={O00560.gnCoordinate![0].genomicLocation.end!}
        currentEntry="O00560"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on data, no other entry at the same position', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: [O00560],
      status: 200,
    });
    const { asFragment } = customRender(
      <Overlapping
        taxID={O00560.taxid!}
        chromosome={O00560.gnCoordinate![0].genomicLocation.chromosome}
        start={O00560.gnCoordinate![0].genomicLocation.start!}
        end={O00560.gnCoordinate![0].genomicLocation.end!}
        currentEntry="O00560"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders on data, other than current entry', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: [O00560],
      status: 200,
    });
    const { asFragment } = customRender(
      <Overlapping
        taxID={O00560.taxid!}
        chromosome={O00560.gnCoordinate![0].genomicLocation.chromosome}
        start={O00560.gnCoordinate![0].genomicLocation.start!}
        end={O00560.gnCoordinate![0].genomicLocation.end!}
        currentEntry="PXXXXX"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
