import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';
import useDataApi from '../../../hooks/useDataApi';
import { FileFormat } from '../../../types/resultsDownload';
import DownloadPreview from '../DownloadPreview';

jest.mock('../../../hooks/useDataApi');

const mockUseDataApi = useDataApi as jest.MockedFunction<typeof useDataApi>;

// jsdom doesn't implement scrollIntoView; the component triggers it via
// `useScrollIntoViewRef` on mount.
Element.prototype.scrollIntoView = jest.fn();

describe('DownloadPreview', () => {
  beforeEach(() => {
    mockUseDataApi.mockReset();
  });

  it('renders the in-memory previewData as pretty-printed JSON without fetching', () => {
    // Idle state — would also be the result of being called with `undefined`.
    mockUseDataApi.mockReturnValue({ loading: false });
    const data = { primaryAccession: 'UPI000002A2F6-9606', entryType: 'AA' };

    customRender(
      <DownloadPreview previewData={data} previewFileFormat={FileFormat.json} />
    );

    // `previewData` must short-circuit the fetch — `useDataApi` is called once
    // (rules of hooks) but with `undefined` URL so no request fires.
    expect(mockUseDataApi).toHaveBeenCalledTimes(1);
    expect(mockUseDataApi.mock.calls[0][0]).toBeUndefined();

    // textContent (not toHaveTextContent) — the latter normalises whitespace
    // and would mask whether `JSON.stringify(_, null, 2)` indentation survived.
    expect(screen.getByTestId('download-preview').textContent).toBe(
      JSON.stringify(data, null, 2)
    );
  });

  it('falls back to fetching when only previewUrl is given', () => {
    mockUseDataApi.mockReturnValue({
      loading: false,
      data: { fetched: true },
    });

    customRender(
      <DownloadPreview
        previewUrl="https://example.org/api/entry.json"
        previewFileFormat={FileFormat.json}
      />
    );

    expect(mockUseDataApi.mock.calls[0][0]).toBe(
      'https://example.org/api/entry.json'
    );
    expect(screen.getByTestId('download-preview')).toHaveTextContent(
      '"fetched": true'
    );
  });

  it('shows the empty-state message when no data is available', () => {
    mockUseDataApi.mockReturnValue({ loading: false });

    customRender(
      <DownloadPreview
        previewUrl="https://example.org/api/missing.json"
        previewFileFormat={FileFormat.json}
      />
    );

    expect(
      screen.getByText('No preview available for this format')
    ).toBeInTheDocument();
  });
});
