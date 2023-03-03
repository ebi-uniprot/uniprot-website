import { DownloadUrlOptions } from '../../../shared/config/apiUrls';

export type FormParameters = DownloadUrlOptions & {
  download: false;
  compressed: false;
  accessions: undefined; // TODO: confirm
};
