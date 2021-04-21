import { fireEvent, waitFor, screen } from '@testing-library/react';

import CustomiseTable from '../CustomiseTable';

import '../../../../uniprotkb/components/__mocks__/mockApi';

import customRender from '../../../__test-helpers__/customRender';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { SearchResultsLocations } from '../../../../app/config/urls';
import { Namespace } from '../../../types/namespaces';

const route = SearchResultsLocations[Namespace.uniprotkb];

describe('CustomiseTable component', () => {
  let rendered;
  const onSave = jest.fn();
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];

  beforeEach(async () => {
    window.localStorage.setItem(
      'table columns for uniprotkb',
      JSON.stringify(selectedColumns)
    );
    rendered = customRender(<CustomiseTable onSave={onSave} />, { route });
    await waitFor(() => screen.getAllByTestId('accordion-search-list-item'));
  });

  afterEach(() => {
    window.localStorage.clear();
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
    fireEvent.click(selectionChip.querySelector('[data-testid="remove-icon"]'));
    expect(
      screen.queryByRole('button', { name: 'Protein names', hidden: false })
    ).not.toBeInTheDocument();
    fireEvent.submit(screen.getByRole('form'));
    expect(onSave).toHaveBeenCalled();
  });
});
