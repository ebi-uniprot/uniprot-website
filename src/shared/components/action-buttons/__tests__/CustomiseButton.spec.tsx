import {
  fireEvent,
  waitFor,
  screen,
  getByTestId,
} from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import CustomiseButton from '../CustomiseButton';

import { localStorageCache } from '../../../hooks/useLocalStorage';

import { SearchResultsLocations } from '../../../../app/config/urls';
import { nsToDefaultColumns } from '../../../config/columns';

import { Namespace } from '../../../types/namespaces';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

import '../../../../uniprotkb/components/__mocks__/mockApi';

const namespace = Namespace.uniprotkb;
const route = SearchResultsLocations[namespace];
const storageKey = `table columns for ${namespace}` as const;

describe('CustomiseButton', () => {
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.organismName,
  ];
  beforeEach(async () => {
    const namespace = Namespace.uniprotkb;
    customRender(<CustomiseButton namespace={namespace} />, {
      route,
      initialLocalStorage: {
        [storageKey]: selectedColumns,
      },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => screen.getByRole('button', { name: /UniProt Data/ }));
  });

  afterEach(() => {
    window.localStorage.clear();
    localStorageCache.clear();
    jest.clearAllMocks();
  });

  it('should set and reset correctly', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Names & Taxonomy/ }));
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
    // We should now have the the default checkboxes checked but first need to open the
    // releavant accordions so that the checkboxes are rendered and so findable.
    fireEvent.click(screen.getByRole('button', { name: /Sequences/ }));
    fireEvent.click(screen.getByRole('button', { name: /Miscellaneous/ }));
    expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(
      // minus 1 to not count the accession
      defaultColumns.length - 1
    );

    // Ensure localStorage not updated yet
    expect(window.localStorage.getItem(storageKey)).toBe(
      JSON.stringify(selectedColumns)
    );

    // Click save to send to localStorage
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    // Give a chance to write to localStorage before having to do clean-up
    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toBe(
        // Final expected state
        JSON.stringify(defaultColumns)
      )
    );
  });

  it('should not commit to localStorage when clicking the close (x) button', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Names & Taxonomy/ }));
    const checkedCheckboxes = screen.getAllByRole('checkbox', {
      checked: true,
    });

    // Make a change to the current selection
    fireEvent.change(checkedCheckboxes[0], { target: { checked: true } });

    // Close panel with the close (x) button
    fireEvent.click(screen.getByTitle('Close panel'));

    // Give a chance to write to localStorage before having to do clean-up
    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toBe(
        // Final expected state
        JSON.stringify(selectedColumns)
      )
    );
  });

  it('should not commit to localStorage when clicking the Cancel button', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Names & Taxonomy/ }));
    const checkedCheckboxes = screen.getAllByRole('checkbox', {
      checked: true,
    });

    // Make a change to the current selection
    fireEvent.change(checkedCheckboxes[0], { target: { checked: true } });

    // Close panel with the close (x) button
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    // Give a chance to write to localStorage before having to do clean-up
    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toBe(
        // Final expected state
        JSON.stringify(selectedColumns)
      )
    );
  });

  it('should remove chip when remove icon clicked', async () => {
    const selectionChip = screen.getByRole('button', {
      name: 'Protein names',
      hidden: false,
    });
    fireEvent.click(getByTestId(selectionChip, 'remove-icon'));
    expect(
      screen.queryByRole('button', { name: 'Protein names' })
    ).not.toBeInTheDocument();
    fireEvent.submit(screen.getByRole('form'));
    // Give a chance to write to localStorage before having to do clean-up
    await waitFor(() =>
      expect(window.localStorage.getItem(storageKey)).toBe(
        // Final expected state
        JSON.stringify([
          UniProtKBColumn.accession,
          UniProtKBColumn.organismName,
        ])
      )
    );
  });
});
