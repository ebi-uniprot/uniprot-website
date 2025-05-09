import '../../../../uniprotkb/components/__mocks__/mockApi';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import { SearchResultsLocations } from '../../../../app/config/urls';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import customRender from '../../../__test-helpers__/customRender';
import { Namespace } from '../../../types/namespaces';
import ColumnSelect from '../ColumnSelect';

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
    // wait for the drag and drop library to have instantiated itself
    await waitFor(() => screen.getByRole('status'));
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
