import { CodeBlock, Loader } from 'franklin-sites';
import { useMemo } from 'react';
import { JsonObject } from 'type-fest';

import useDataApi from '../../hooks/useDataApi';

import { fileFormatToContentType } from '../../config/resultsDownload';
import urlsAreEqual from '../../utils/url';

import { ContentType, FileFormat } from '../../types/resultsDownload';

import styles from './styles/download-preview.module.scss';

const DownloadPreview = ({
  previewUrl,
  previewFileFormat,
}: {
  previewUrl: string;
  previewFileFormat: FileFormat;
}) => {
  const options = useMemo(() => {
    const headers: Record<string, string> = {};
    const accept = fileFormatToContentType[previewFileFormat];
    if (accept) {
      headers.Accept = accept;
    }
    return { headers };
  }, [previewFileFormat]);

  const { data, headers, url, loading } = useDataApi<JsonObject | string>(
    previewUrl,
    options
  );

  const previewContent =
    urlsAreEqual(url || '', previewUrl, ['compressed']) &&
    data &&
    (headers?.['content-type'] as ContentType) ===
      fileFormatToContentType[previewFileFormat]
      ? data
      : '';

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.preview}>
      <h4>Preview</h4>
      <CodeBlock lightMode data-testid="download-preview">
        {typeof data === 'string'
          ? data
          : JSON.stringify(previewContent, null, 2)}
      </CodeBlock>
    </div>
  );
};

export default DownloadPreview;
