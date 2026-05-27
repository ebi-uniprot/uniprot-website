import { CodeBlock, Loader } from 'franklin-sites';
import { useMemo } from 'react';
import { type JsonObject } from 'type-fest';

import { fileFormatToContentType } from '../../config/resultsDownload';
import useDataApi from '../../hooks/useDataApi';
import useScrollIntoViewRef from '../../hooks/useScrollIntoView';
import { type FileFormat } from '../../types/resultsDownload';
import styles from './styles/download-preview.module.scss';

type Props = {
  previewUrl?: string;
  previewFileFormat?: FileFormat;
  acceptHeaderOverride?: string;
  // In-memory payload to render directly, bypassing the fetch. Used when the
  // preview content exists only in the browser (e.g. UniFire-transformed
  // UniParc sub-entry annotations, which have no API URL).
  previewData?: unknown;
};

const DownloadPreview = ({
  previewUrl,
  previewFileFormat,
  acceptHeaderOverride,
  previewData,
}: Props) => {
  const scrollRef = useScrollIntoViewRef<HTMLDivElement>();
  const options = useMemo(() => {
    if (!previewFileFormat) {
      return undefined;
    }
    const headers: Record<string, string> = {};
    if (acceptHeaderOverride) {
      headers.Accept = acceptHeaderOverride;
    } else {
      const accept = fileFormatToContentType[previewFileFormat];
      if (accept) {
        headers.Accept = accept;
      }
    }
    return { headers };
  }, [acceptHeaderOverride, previewFileFormat]);

  // `useDataApi(undefined)` is its idle state — no request fires, no spinner —
  // so passing `undefined` when `previewData` is provided short-circuits the
  // fetch without breaking the rules-of-hooks unconditional call.
  const hasPreviewData = previewData !== undefined;
  const { data, loading } = useDataApi<JsonObject | string>(
    hasPreviewData ? undefined : previewUrl,
    options
  );

  if (loading) {
    return <Loader />;
  }

  const previewContent = hasPreviewData ? previewData : data;

  return (
    <div className={styles.preview} ref={scrollRef}>
      <h4>Preview</h4>
      {previewContent ? (
        <CodeBlock lightMode data-testid="download-preview">
          {typeof previewContent === 'string'
            ? previewContent
            : JSON.stringify(previewContent, null, 2)}
        </CodeBlock>
      ) : (
        'No preview available for this format'
      )}
    </div>
  );
};

export default DownloadPreview;
