import { fireEvent, waitFor, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import ColumnSelect from '../ColumnSelect';

import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import { SearchResultsLocations } from '../../../../app/config/urls';

import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('ColumnSelect component', () => {
  // testing implementation?
  let rendered: ReturnType<typeof customRender>;
  let onColumnChange: jest.Mock;
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.organismName,
  ];
  const namespace = Namespace.uniprotkb;

  beforeEach(async () => {
    onColumnChange = jest.fn();
    rendered = customRender(
      <ColumnSelect
        onColumnChange={onColumnChange}
        selectedColumns={selectedColumns}
        namespace={namespace}
      />,
      {
        route: SearchResultsLocations[namespace],
      }
    );
    await waitFor(() => screen.getAllByRole('button'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onColumnChange when unselected item is clicked and do so with selected columns and new item', () => {
    // Open Names & Taxonomy to render contents
    fireEvent.click(screen.getByRole('button', { name: /Names & Taxonomy/ }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Gene Names' }));
    expect(onColumnChange).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });

  it('should call onColumnChange when already selected item is clicked and do so with selected columns without clicked item', () => {
    // Open Names & Taxonomy to render contents
    fireEvent.click(screen.getByRole('button', { name: /Names & Taxonomy/ }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Protein names' }));
    expect(onColumnChange).toHaveBeenCalledWith(
      selectedColumns.filter((c) => c !== UniProtKBColumn.proteinName)
    );
  });
});
