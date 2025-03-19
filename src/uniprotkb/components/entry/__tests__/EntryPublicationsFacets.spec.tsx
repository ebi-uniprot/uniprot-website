import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import useDataApi from '../../../../shared/hooks/useDataApi';
import EntryPublicationsFacets from '../EntryPublicationsFacets';
import data from './__mocks__/entryPublicationsData';

jest.mock('../../../../shared/hooks/useDataApi');

describe('EntryPublication facets tests', () => {
  it('should render', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, data });
    const { asFragment } = customRender(
      <EntryPublicationsFacets accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle errors', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, error: {} });
    const { asFragment } = customRender(
      <EntryPublicationsFacets accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });
    const { asFragment } = customRender(
      <EntryPublicationsFacets accession="P05067" />
    );
    expect(useDataApi).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add facet', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, data });
    const { history } = customRender(
      <EntryPublicationsFacets accession="P05067" />
    );
    fireEvent.click(screen.getByRole('link', { name: /Small/ }));
    expect(history.location.search).toMatch(/facets=is_large_scale%3Afalse/);
  });

  it('should remove facet', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, data });
    const { history } = customRender(
      <EntryPublicationsFacets accession="P05067" />,
      {
        route: '?facets=study_type:small_scale',
      }
    );
    fireEvent.click(screen.getByRole('link', { name: /Small/ }));
    expect(history.location.search).toMatch('');
  });
});
