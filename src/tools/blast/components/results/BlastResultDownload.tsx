import React, { memo } from 'react';
import { Card, DownloadIcon } from 'franklin-sites';

import blastUrls, { ResultFormat } from '../../config/blastUrls';

type DownloadOptions = {
  format: ResultFormat;
  description: string;
  ext: string;
};

const options: DownloadOptions[] = [
  { format: 'out', description: 'Raw output from BLAST', ext: 'txt' },
  { format: 'xml', description: 'XML output', ext: 'xml' },
  { format: 'jdp?format=json', description: 'JSON output', ext: 'json' },
  { format: 'ids', description: 'List of matching identifiers', ext: 'txt' },
  { format: 'accs', description: 'List of matching accessions', ext: 'txt' },
  {
    format: 'parameters',
    description: 'List of input parameters in XML',
    ext: 'xml',
  },
  { format: 'sequence', description: 'Raw submitted sequence', ext: 'fasta' },
  { format: 'visual-svg', description: 'Visual SVG', ext: 'svg' },
  {
    format: 'complete-visual-svg',
    description: 'Complete visual SVG',
    ext: 'svg',
  },
  { format: 'visual-png', description: 'Visual PNG', ext: 'png' },
  {
    format: 'complete-visual-png',
    description: 'Complete visual PNG',
    ext: 'png',
  },
  { format: 'visual-jpg', description: 'Visual JPG', ext: 'jpg' },
  {
    format: 'complete-visual-jpg',
    description: 'Complete visual JPG',
    ext: 'jpg',
  },
  { format: 'ffdp-query-svg', description: 'FFDP query SVG', ext: 'svg' },
  { format: 'ffdp-query-png', description: 'FFDP query PNG', ext: 'png' },
  { format: 'ffdp-query-jpeg', description: 'FFDP query JPG', ext: 'jpg' },
  { format: 'ffdp-subject-svg', description: 'FFDP subject SVG', ext: 'svg' },
  { format: 'ffdp-subject-png', description: 'FFDP subject PNG', ext: 'png' },
  { format: 'ffdp-subject-jpeg', description: 'FFDP subject JPG', ext: 'jpg' },
];

const BlastResultDownload = memo<{ id: string }>(({ id }) => (
  <>
    {options.map(({ format, description, ext }) => {
      const filename = `${format}.${ext}`;
      return (
        <Card
          key={format}
          title={
            <a
              title={`Download the file ${filename}`}
              href={blastUrls.resultUrl(id, format)}
              download={filename}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon height="1em" /> <code>{filename}</code>
            </a>
          }
        >
          {description}
        </Card>
      );
    })}
  </>
));

export default BlastResultDownload;
