import { CodeBlock, Loader } from 'franklin-sites';
import { useMemo } from 'react';
import { JsonObject } from 'type-fest';

import useDataApi from '../../hooks/useDataApi';
import useScrollIntoViewRef from '../../hooks/useScrollIntoView';

import { fileFormatToContentType } from '../../config/resultsDownload';

import { FileFormat } from '../../types/resultsDownload';

import styles from './styles/download-preview.module.scss';

type Props = {
  previewUrl?: string;
  previewFileFormat?: FileFormat;
};

const DownloadPreview = ({ previewUrl, previewFileFormat }: Props) => {
  const scrollRef = useScrollIntoViewRef<HTMLDivElement>();
  const options = useMemo(() => {
    if (!previewFileFormat) {
      return undefined;
    }
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
    <div className={styles.preview} ref={scrollRef}>
      <h4>Preview</h4>
      {data ? (
        <CodeBlock lightMode data-testid="download-preview">
          {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
        </CodeBlock>
      ) : (
        'No preview available for this format'
      )}
    </div>
  );
};

export default DownloadPreview;
