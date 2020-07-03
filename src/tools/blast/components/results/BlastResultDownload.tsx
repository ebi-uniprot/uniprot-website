import React, { memo, useState } from 'react';

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

type BlastResultDownloadProps = {
  id: string;
  onToggleDisplay: () => void;
  nHits: number;
  isTableResultsFiltered: boolean;
};

const BlastResultDownload = memo<BlastResultDownloadProps>(
  ({ id, onToggleDisplay, nHits, isTableResultsFiltered }) => {
    const [fileFormat, setFileFormat] = useState(options[0].format);

    const updateFileFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFileFormat(e.target.value as ResultFormat);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = blastUrls.resultUrl(id, fileFormat);
      link.target = '_blank';
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onToggleDisplay();
    };

    return (
      <>
        <h2>Download</h2>
        <h3>BLAST results · {nHits} hits</h3>
        {isTableResultsFiltered && (
          <p>
            <b>Note</b>: The results in the table view have user-selected
            filters applied while the file downloaded here will not have these
            filters applied and will contain all {nHits} hits of the BLAST job.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              Format
              <select
                id="file-format-select"
                data-testid="file-format-select"
                value={fileFormat}
                onChange={(e) => updateFileFormat(e)}
              >
                {options.map(({ format, description }) => (
                  <option value={format} key={format}>
                    {description}
                  </option>
                ))}
              </select>
            </legend>
            <section className="button-group side-panel__button-row">
              <button
                className="button secondary"
                type="button"
                onClick={() => onToggleDisplay()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button button-primary"
                data-testid="submit-blast"
              >
                Download
              </button>
            </section>
          </fieldset>
        </form>
      </>
    );
  }
);

export default BlastResultDownload;
