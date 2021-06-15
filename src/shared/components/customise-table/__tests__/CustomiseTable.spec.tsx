import {
  fireEvent,
  waitFor,
  screen,
  getByTestId,
} from '@testing-library/react';

import CustomiseTable from '../CustomiseTable';

import '../../../../uniprotkb/components/__mocks__/mockApi';

import customRender from '../../../__test-helpers__/customRender';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { SearchResultsLocations } from '../../../../app/config/urls';
import { Namespace } from '../../../types/namespaces';

const route = SearchResultsLocations[Namespace.uniprotkb];

describe('CustomiseTable component', () => {
  let rendered: ReturnType<typeof customRender>;
  const onSave = jest.fn();
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];

  beforeEach(async () => {
    rendered = customRender(<CustomiseTable onSave={onSave} />, {
      route,
      initialLocalStorage: {
        'table columns for uniprotkb': selectedColumns,
      },
    });
    await waitFor(() => screen.getAllByTestId('accordion-search-list-item'));
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
    // get the 2nd one because the drag and drop library also wraps in a button
    const selectionChip = screen.getAllByRole('button', {
      name: 'Protein names',
      hidden: false,
    })[1];
    expect(selectionChip).toBeInTheDocument();
  });

  test('should call onSave prop corresponding button is pressed', () => {
    fireEvent.click(screen.getByText('Close'));
    expect(onSave).toHaveBeenCalled();
  });

  test('should remove chip when clicked on', () => {
    // get the 2nd one because the drag and drop library also wraps in a button
    const selectionChip = screen.getAllByRole('button', {
      name: 'Protein names',
      hidden: false,
    })[1];
    fireEvent.click(getByTestId(selectionChip, 'remove-icon'));
    expect(
      screen.queryByRole('button', { name: 'Protein names', hidden: false })
    ).not.toBeInTheDocument();
    fireEvent.submit(screen.getByRole('form'));
    expect(onSave).toHaveBeenCalled();
  });
});
