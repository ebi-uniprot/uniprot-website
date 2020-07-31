import React, { memo, useState } from 'react';

import toolsURLs, { ResultFormat } from '../config/urls';

import { JobTypes } from '../types/toolsJobTypes';

type DownloadOptions<T extends JobTypes> = {
  format: ResultFormat[T];
  description: string;
  ext: string;
};

const options: Record<JobTypes, DownloadOptions<JobTypes>[]> = {
  [JobTypes.ALIGN]: [
    {
      format: 'aln-clustal_num',
      description: 'Resulting alignment',
      ext: 'txt',
    },
    { format: 'out', description: 'Raw output from Align', ext: 'txt' },
    { format: 'sequence', description: 'Raw submitted sequence', ext: 'fasta' },
    {
      format: 'phylotree',
      description: 'Phylogenetic tree in Newick notation',
      ext: 'txt',
    },
    { format: 'pim', description: 'Percent identity matrix', ext: 'txt' },
    {
      format: 'submission',
      description: 'List of input parameters in XML',
      ext: 'txt',
    },
  ] as DownloadOptions<JobTypes.ALIGN>[],
  [JobTypes.BLAST]: [
    { format: 'out', description: 'Raw output from BLAST', ext: 'txt' },
    { format: 'xml', description: 'XML output', ext: 'xml' },
    { format: 'json', description: 'JSON output', ext: 'json' },
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
    {
      format: 'ffdp-subject-jpeg',
      description: 'FFDP subject JPG',
      ext: 'jpg',
    },
  ] as DownloadOptions<JobTypes.BLAST>[],
  [JobTypes.IDMAP]: [],
  [JobTypes.PEPTIDE_SEARCH]: [],
};

const defaultFormat: Record<JobTypes, ResultFormat[JobTypes]> = {
  [JobTypes.ALIGN]: 'aln-clustal_num',
  [JobTypes.BLAST]: 'out',
  [JobTypes.IDMAP]: 'out', // TODO: check after implementing
  [JobTypes.PEPTIDE_SEARCH]: 'out', // TODO: check after implementing
};

type ResultDownloadProps = {
  jobType: JobTypes;
  id: string;
  onToggleDisplay: () => void;
  nHits?: number;
  isTableResultsFiltered?: boolean;
  isTableRowSelected: boolean;
};

const ResultDownload = memo<ResultDownloadProps>(
  ({
    jobType,
    id,
    onToggleDisplay,
    nHits,
    isTableResultsFiltered,
    isTableRowSelected,
  }) => {
    const [fileFormat, setFileFormat] = useState(defaultFormat[jobType]);

    const updateFileFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFileFormat(e.target.value as ResultFormat[JobTypes.BLAST]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = toolsURLs(jobType).resultUrl(id, fileFormat);
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
        {(isTableResultsFiltered || isTableRowSelected) && (
          <p>
            <b>Note</b>: The download file will contain all {nHits} results of
            this BLAST job. Any selections or filters applied on the results
            page will not affect the download set.
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
                {options[jobType].map(({ format, description }) => (
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

export default ResultDownload;
