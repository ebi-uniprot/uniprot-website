import { DownloadUrlOptions } from '../../../shared/config/apiUrls';

export type FormParameters = Exclude<DownloadUrlOptions, 'accessions'> & {
  download: false;
  compressed: false;
};
