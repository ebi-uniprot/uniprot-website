import joinUrl from 'url-join';

import { stringifyUrl } from '../../utils/url';

import { fileFormatToUrlParameter } from '../resultsDownload';

import { FileFormat } from '../../types/resultsDownload';

export const proteinsApiPrefix = 'https://www.ebi.ac.uk/proteins/api';

export const coordinates = (
  accession?: string | string[],
  format?: FileFormat
) => {
  const url = joinUrl(proteinsApiPrefix, 'coordinates');
  if (accession) {
    if (Array.isArray(accession)) {
      return stringifyUrl(url, { accession });
    }
    const accessionUrl = joinUrl(url, accession);
    return stringifyUrl(accessionUrl, {
      format: format ? fileFormatToUrlParameter[format] : undefined,
    });
  }
  return url;
};

export const variation = (accession: string, format?: FileFormat) => {
  const url = joinUrl(proteinsApiPrefix, 'variation', accession);
  return stringifyUrl(url, {
    format: format ? fileFormatToUrlParameter[format] : undefined,
  });
};

export const proteins = (accession: string) =>
  joinUrl(proteinsApiPrefix, 'proteins', accession);

export const proteomics = (accession: string, format?: FileFormat) => {
  const url = joinUrl(proteinsApiPrefix, 'proteomics', accession);
  return stringifyUrl(url, {
    format: format ? fileFormatToUrlParameter[format] : undefined,
  });
};

export const proteomicsPtm = (accession: string, format?: FileFormat) => {
  const url = joinUrl(proteinsApiPrefix, 'proteomics-ptm', accession);
  return stringifyUrl(url, {
    format: format ? fileFormatToUrlParameter[format] : undefined,
  });
};

export const mutagenesis = (accession: string, format?: FileFormat) => {
  const url = joinUrl(proteinsApiPrefix, 'mutagenesis', accession);
  return stringifyUrl(url, {
    format: format ? fileFormatToUrlParameter[format] : undefined,
  });
};

export const antigen = (accession: string, format?: FileFormat) => {
  const url = joinUrl(proteinsApiPrefix, 'antigen', accession);
  return stringifyUrl(url, {
    format: format ? fileFormatToUrlParameter[format] : undefined,
  });
};

export const hpp = (accession: string, format?: FileFormat) => {
  const url = joinUrl(proteinsApiPrefix, 'hpp', accession);
  return stringifyUrl(url, {
    format: format ? fileFormatToUrlParameter[format] : undefined,
  });
};

export const epitope = (accession: string, format?: FileFormat) => {
  const url = joinUrl(proteinsApiPrefix, 'epitope', accession);
  return stringifyUrl(url, {
    format: format ? fileFormatToUrlParameter[format] : undefined,
  });
};
