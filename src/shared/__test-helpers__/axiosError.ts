import { AxiosError, AxiosHeaders } from 'axios';

/** The error axios raises for a response with this status and these headers */
const responseError = (status: number, headers: Record<string, string> = {}) =>
  new AxiosError(
    `Request failed with status code ${status}`,
    String(status),
    undefined,
    undefined,
    {
      status,
      statusText: '',
      data: undefined,
      headers: new AxiosHeaders(headers),
      config: { headers: new AxiosHeaders() },
    }
  );

export default responseError;
