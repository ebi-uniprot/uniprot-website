export type Sequence = {
  value: string;
  length: number;
  molWeight: number;
  /**
   * @deprecated Should use MD5 instead
   */
  crc64: string;
  md5: string;
};
