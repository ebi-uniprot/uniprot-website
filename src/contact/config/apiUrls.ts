import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';

const token = joinUrl(apiPrefix, 'contact', 'token');

const send = joinUrl(apiPrefix, 'contact', 'send');

export default { token, send };
