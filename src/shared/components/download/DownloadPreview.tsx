import { CodeBlock, Loader } from 'franklin-sites';
import { useEffect, useMemo } from 'react';
import { JsonObject } from 'type-fest';

import useDataApi from '../../hooks/useDataApi';

import { fileFormatToContentType } from '../../config/resultsDownload';

import { FileFormat } from '../../types/resultsDownload';

import styles from './styles/download-preview.module.scss';

const DownloadPreview = ({
  previewUrl,
  previewFileFormat,
  onMount,
}: {
  previewUrl: string;
  previewFileFormat: FileFormat;
  onMount: () => void;
}) => {
  useEffect(() => {
    onMount();
  }, [onMount]);

  const options = useMemo(() => {
    const headers: Record<string, string> = {};
    const accept = fileFormatToContentType[previewFileFormat];
    if (accept) {
      headers.Accept = accept;
    }
    return { headers };
  }, [previewFileFormat]);

  const { data, loading } = useDataApi<JsonObject | string>(
    previewUrl,
    options
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.preview}>
      <h4>Preview</h4>
      <CodeBlock lightMode data-testid="download-preview">
        {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
      </CodeBlock>
    </div>
  );
};

export default DownloadPreview;
