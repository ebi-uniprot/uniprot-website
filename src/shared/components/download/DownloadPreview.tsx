import { CodeBlock, Loader } from 'franklin-sites';
import { useEffect, useState } from 'react';

import { fileFormatToContentType } from '../../config/resultsDownload';
import fetchData from '../../utils/fetchData';
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
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [preview, setPreview] = useState({
    url: '',
    contentType: '',
    data: '',
  });

  // TODO: this should useDataApi but this hook requires modification to
  // change the headers so whenever this is done replace fetchData with
  // useDataApi
  useEffect(() => {
    setLoadingPreview(true);
    const headers: Record<string, string> = {};
    const accept = fileFormatToContentType[previewFileFormat];
    if (accept) {
      headers.Accept = accept;
    }
    fetchData<string>(previewUrl, headers)
      .then((response) => {
        const contentType = response.headers?.['content-type'] as ContentType;
        setPreview({
          data:
            contentType === fileFormatToContentType[FileFormat.json]
              ? JSON.stringify(response.data, null, 2)
              : response.data,
          url: response.config.url ?? '',
          contentType,
        });
      })
      .finally(() => {
        setLoadingPreview(false);
      });
  }, [previewFileFormat, previewUrl]);

  const previewContent =
    urlsAreEqual(preview.url, previewUrl, ['compressed']) &&
    preview.data &&
    preview.contentType === fileFormatToContentType[previewFileFormat]
      ? preview.data
      : '';

  if (loadingPreview) {
    return <Loader />;
  }

  return (
    <div className={styles.preview}>
      <h4>Preview</h4>
      <CodeBlock lightMode data-testid="download-preview">
        {previewContent}
      </CodeBlock>
    </div>
  );
};

export default DownloadPreview;
