import {
  fireEvent,
  waitFor,
  screen,
  getByTestId,
} from '@testing-library/react';

import CustomiseTable from '../CustomiseTable';

import '../../../../uniprotkb/components/__mocks__/mockApi';

import customRender from '../../../__test-helpers__/customRender';
import { nsToDefaultColumns } from '../../../config/columns';
import { localStorageCache } from '../../../hooks/useLocalStorage';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { SearchResultsLocations } from '../../../../app/config/urls';
import { Namespace } from '../../../types/namespaces';

const route = SearchResultsLocations[Namespace.uniprotkb];
const storageKey = `table columns for ${Namespace.uniprotkb}` as const;

describe('CustomiseTable component', () => {
  let rendered: ReturnType<typeof customRender>;
  const onClose = jest.fn();
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];

  beforeEach(async () => {
    rendered = customRender(
      <CustomiseTable onClose={onClose} namespace={Namespace.uniprotkb} />,
      {
        route,
        initialLocalStorage: {
          [storageKey]: selectedColumns,
        },
      }
    );
    await waitFor(() => screen.getAllByTestId('accordion-search-list-item'));
  });

  afterEach(() => {
    window.localStorage.clear();
    localStorageCache.clear();
    onClose.mockReset();
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
    const selectionChip = screen.getByRole('button', {
      name: 'Protein names',
      hidden: false,
    });
    expect(selectionChip).toBeInTheDocument();
  });

  it('should call onClose prop corresponding button is pressed', () => {
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should remove chip when clicked on', async () => {
    const selectionChip = screen.getByRole('button', {
      name: 'Protein names',
      hidden: false,
    });
    fireEvent.click(getByTestId(selectionChip, 'remove-icon'));
    expect(
      screen.queryByRole('button', { name: 'Protein names', hidden: false })
    ).not.toBeInTheDocument();
    fireEvent.submit(screen.getByRole('form'));
    expect(onClose).toHaveBeenCalled();

    // Give a chance to write to localStorage before having to do clean-up
    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toBe(
        // Final expected state
        JSON.stringify([
          UniProtKBColumn.accession,
          UniProtKBColumn.proteinExistence,
        ])
      )
    );
  });

  it('should set and reset correctly', async () => {
    // checkboxes checked initially
    const initiallyCheckedCheckboxes = screen.getAllByRole('checkbox', {
      checked: true,
    });

    // Expect all from the initial test state minus the accession
    expect(initiallyCheckedCheckboxes).toHaveLength(selectedColumns.length - 1);

    const uncheckedCheckboxes = screen.getAllByRole('checkbox', {
      checked: false,
    });

    // Check 2 of the unchecked checkboxes
    fireEvent.change(uncheckedCheckboxes[0], { target: { checked: true } });
    fireEvent.change(uncheckedCheckboxes[1], { target: { checked: true } });

    // We should have now 2 more checked checkboxes
    expect(
      screen.getAllByRole('checkbox', {
        checked: true,
      })
    ).toHaveLength(initiallyCheckedCheckboxes.length + 2);
    expect(screen.getAllByRole('checkbox', { checked: true }).length).toBe(
      initiallyCheckedCheckboxes.length + 2
    );

    // Reset form to default
    fireEvent.reset(screen.getByRole('form'));

    const defaultColumns = nsToDefaultColumns(Namespace.uniprotkb);
    // We should now have the the default checkboxes checked
    expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(
      // minus 1 to not count the accession
      defaultColumns.length - 1
    );

    // Give a chance to write to localStorage before having to do clean-up
    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toBe(
        // Final expected state
        JSON.stringify(defaultColumns)
      )
    );
  });
});
