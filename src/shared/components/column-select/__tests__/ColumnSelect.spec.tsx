import { fireEvent, waitFor, screen } from '@testing-library/react';
import {
  makeDnd,
  DND_DRAGGABLE_DATA_ATTR,
  DND_DIRECTION_RIGHT,
} from 'react-beautiful-dnd-test-utils';

import customRender from '../../../__test-helpers__/customRender';

import ColumnSelect from '../ColumnSelect';

import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import { SearchResultsLocations } from '../../../../app/config/urls';

import '../../../../uniprotkb/components/__mocks__/mockApi';

describe('ColumnSelect component', () => {
  // testing implementation?
  let rendered: ReturnType<typeof customRender>;
  let onChange: jest.Mock;
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.organismName,
  ];
  const namespace = Namespace.uniprotkb;

  beforeEach(async () => {
    onChange = jest.fn();
    rendered = customRender(
      <ColumnSelect
        onChange={onChange}
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

  it('should call onChange when unselected item is clicked and do so with selected columns and new item', () => {
    // Open Names & Taxonomy to render contents
    fireEvent.click(screen.getByRole('button', { name: /Names & Taxonomy/ }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Gene Names' }));
    expect(onChange).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });

  it('should call onChange when already selected item is clicked and do so with selected columns without clicked item', () => {
    // Open Names & Taxonomy to render contents
    fireEvent.click(screen.getByRole('button', { name: /Names & Taxonomy/ }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Protein names' }));
    expect(onChange).toHaveBeenCalledWith(
      selectedColumns.filter((c) => c !== UniProtKBColumn.proteinName)
    );
  });

  it('should call onChange with the correct column order when "Protein names" is dragged to the right', async () => {
    const dragEl = screen
      .getAllByText('Protein names')[0]
      .closest(DND_DRAGGABLE_DATA_ATTR);
    await makeDnd({
      getByText: screen.getAllByText,
      getDragEl: () => dragEl,
      direction: DND_DIRECTION_RIGHT,
      positions: 2,
    });
    expect(onChange).toHaveBeenCalledWith([
      UniProtKBColumn.accession,
      UniProtKBColumn.organismName,
      UniProtKBColumn.proteinName,
    ]);
  });
});
