import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import CustomiseTable from '../CustomiseTable';
import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { Namespace } from '../../../types/namespaces';

describe('CustomiseTable', () => {
  const onSave = jest.fn();
  const namespace = Namespace.uniprotkb;
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];
  const defaultProps = { onSave, namespace, selectedColumns };

  const helper = async (props = {}) => {
    const rendered = renderWithRedux(
      <CustomiseTable {...defaultProps} {...props} />
    );
    await waitFor(() => rendered.getAllByTestId('accordion-search-list-item'));
    return rendered;
  };

  // beforeEach(async () => {
  //   rendered = renderWithRedux(
  //     <CustomiseTable
  //       namespace={namespace}
  //       onSave={onSave}
  //       selectedColumns={selectedColumns}
  //     />
  //   );
  // });

  test('should render', async () => {
    const { asFragment } = await helper();
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onSave prop with initial selected columns when cancel button is pressed', async () => {
    const { getByText } = await helper();
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onSave).toHaveBeenCalledWith(selectedColumns);
  });

  test('should go back and call updateTableColumns action when customise table form is submitted', async () => {
    const { getByTestId, getByText } = await helper();
    const item = getByText('Gene Names');
    fireEvent.click(item);
    const form = getByTestId('customise-table-form');
    fireEvent.submit(form);
    expect(onSave).toHaveBeenCalledWith([
      ...selectedColumns,
      UniProtKBColumn.geneNames,
    ]);
  });

  test('should handle uniref namespace', async () => {
    const { getByTestId, getByText } = await helper({
      namespace: Namespace.uniref,
    });
  });
});

// describe('CustomiseTable component with UniRef namespace', () => {
//   test('should deal well with no selectedColumns', async () => {
//       const rendered = renderWithRedux(
//         <CustomiseTable
//           namespace={Namespace.uniref}
//           onSave={onSave}
//           selectedColumns={}
//         />
//       );
//       await waitFor(() =>
//         rendered.getAllByTestId('accordion-search-list-item')
//       );
//     });
//   });
