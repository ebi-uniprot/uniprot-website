import { DownloadUrlOptions } from '../../../shared/types/results';

// These aren't server parameters but simply parameters used to eventually form the URL
export type FormParameters = Exclude<DownloadUrlOptions, 'accessions'> & {
  download: false;
  compressed: false;
};
