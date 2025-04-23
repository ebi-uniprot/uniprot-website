import '../../../../uniprotkb/components/__mocks__/mockApi';

jest.mock('../../../hooks/useSupportsJobs', () => ({
  __esModule: true,
  default: () => false,
}));

import { fireEvent, screen, waitFor } from '@testing-library/react';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import customRender from '../../../__test-helpers__/customRender';
import { DOWNLOAD_SIZE_LIMIT } from '../../../config/limits';
import { Namespace } from '../../../types/namespaces';
import { FileFormat } from '../../../types/resultsDownload';
import Download from '../Download';

const initialColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.geneNames,
];

describe('Download with file generation job without Jobs support', () => {
  it('should show Jobs not supported message and not show submit button', async () => {
    Element.prototype.scrollIntoView = jest.fn();
    const onCloseMock = jest.fn();

    customRender(
      <Download
        totalNumberResults={DOWNLOAD_SIZE_LIMIT + 1}
        onClose={onCloseMock}
        namespace={Namespace.uniprotkb}
      />,
      {
        route: '/uniprotkb?query=*',
        initialLocalStorage: {
          'table columns for uniprotkb': initialColumns,
        },
      }
    );
    fireEvent.change(screen.getByTestId('file-format-select'), {
      target: { value: FileFormat.tsv },
    });
    fireEvent.click(
      screen.getByTitle<HTMLAnchorElement>(
        'Download with a File Generation job'
      )
    );
    expect(
      await screen.findByText(
        /Job submission and results not available on this device/
      )
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });
  });
});
